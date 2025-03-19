// Backend file: server/controllers/webhookController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Course } = require("../models/Course");
const { User } = require("../models/User");
const { Purchase } = require("../models/Purchase");
const { sendEmail } = require("../utils/emailService");

// Webhook signing secret from Stripe Dashboard
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Handle Stripe webhook events
 */
exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      await handlePaymentIntentSucceeded(event.data.object);
      break;
    case "payment_intent.payment_failed":
      await handlePaymentIntentFailed(event.data.object);
      break;
    case "charge.refunded":
      await handleChargeRefunded(event.data.object);
      break;
    case "charge.dispute.created":
      await handleDisputeCreated(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};

/**
 * Handle successful payment
 */
async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    console.log("Payment Intent Succeeded:", paymentIntent.id);

    // Find the purchase record by payment intent ID
    const purchase = await Purchase.findOne({
      paymentIntentId: paymentIntent.id,
    });

    if (!purchase) {
      // This might be a webhook received before the frontend saved the purchase
      // Create a pending purchase record from metadata
      if (paymentIntent.metadata.courseId && paymentIntent.metadata.userId) {
        await createPurchaseFromMetadata(paymentIntent);
      }
      return;
    }

    // Update purchase status if needed
    if (purchase.status !== "succeeded") {
      purchase.status = "succeeded";
      await purchase.save();

      // Grant access to the course
      await grantCourseAccess(purchase.userId, purchase.courseId);

      // Send confirmation email
      await sendPurchaseConfirmation(purchase);
    }
  } catch (error) {
    console.error("Error handling payment_intent.succeeded:", error);
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentIntentFailed(paymentIntent) {
  try {
    console.log("Payment Intent Failed:", paymentIntent.id);

    // Update purchase record if it exists
    const purchase = await Purchase.findOne({
      paymentIntentId: paymentIntent.id,
    });

    if (purchase) {
      purchase.status = "failed";
      await purchase.save();

      // Notify user about failed payment
      const user = await User.findById(purchase.userId);
      if (user) {
        await sendEmail({
          to: user.email,
          subject: "Payment Failed",
          text: `Your payment for the course was not successful. Please try again or contact support.`,
          html: `<p>Your payment for the course was not successful. Please try again or contact support.</p>`,
        });
      }
    }
  } catch (error) {
    console.error("Error handling payment_intent.payment_failed:", error);
  }
}

/**
 * Handle refunded charge
 */
async function handleChargeRefunded(charge) {
  try {
    console.log("Charge Refunded:", charge.payment_intent);

    // Find the purchase by payment intent ID
    const purchase = await Purchase.findOne({
      paymentIntentId: charge.payment_intent,
    });

    if (purchase) {
      purchase.status = "refunded";
      await purchase.save();

      // Revoke access to the course
      await revokeCourseAccess(purchase.userId, purchase.courseId);

      // Notify user about refund
      const user = await User.findById(purchase.userId);
      const course = await Course.findById(purchase.courseId);

      if (user && course) {
        await sendEmail({
          to: user.email,
          subject: "Refund Processed",
          text: `Your refund for ${course.title} has been processed.`,
          html: `<p>Your refund for <strong>${course.title}</strong> has been processed.</p>`,
        });
      }
    }
  } catch (error) {
    console.error("Error handling charge.refunded:", error);
  }
}

/**
 * Handle dispute created
 */
async function handleDisputeCreated(dispute) {
  try {
    console.log("Dispute Created:", dispute.payment_intent);

    // Find the purchase by payment intent ID
    const purchase = await Purchase.findOne({
      paymentIntentId: dispute.payment_intent,
    });

    if (purchase) {
      purchase.status = "disputed";
      await purchase.save();

      // Notify admin about dispute
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "Payment Dispute Created",
        text: `A dispute has been created for purchase ID: ${purchase._id}`,
        html: `<p>A dispute has been created for purchase ID: <strong>${purchase._id}</strong></p>`,
      });
    }
  } catch (error) {
    console.error("Error handling charge.dispute.created:", error);
  }
}

/**
 * Create purchase record from payment intent metadata
 */
async function createPurchaseFromMetadata(paymentIntent) {
  try {
    const { courseId, userId } = paymentIntent.metadata;

    // Check if this is a duplicate (might have been created by frontend)
    const existingPurchase = await Purchase.findOne({
      paymentIntentId: paymentIntent.id,
    });

    if (!existingPurchase) {
      const course = await Course.findById(courseId);

      if (course && userId) {
        // Create purchase record
        const purchase = new Purchase({
          userId,
          courseId,
          mentorId: course.mentor,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
          purchaseDate: new Date(),
        });

        await purchase.save();

        // Grant course access
        await grantCourseAccess(userId, courseId);

        // Send confirmation email
        await sendPurchaseConfirmation(purchase);
      }
    }
  } catch (error) {
    console.error("Error creating purchase from metadata:", error);
  }
}

/**
 * Grant course access to user
 */
async function grantCourseAccess(userId, courseId) {
  try {
    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId },
    });

    // Update course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrollmentsCount: 1 },
    });
  } catch (error) {
    console.error("Error granting course access:", error);
  }
}

/**
 * Revoke course access from user
 */
async function revokeCourseAccess(userId, courseId) {
  try {
    // Remove course from user's enrolled courses
    await User.findByIdAndUpdate(userId, {
      $pull: { enrolledCourses: courseId },
    });

    // Update course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrollmentsCount: -1 },
    });
  } catch (error) {
    console.error("Error revoking course access:", error);
  }
}

/**
 * Send purchase confirmation email
 */
async function sendPurchaseConfirmation(purchase) {
  try {
    const user = await User.findById(purchase.userId);
    const course = await Course.findById(purchase.courseId);

    if (user && course) {
      await sendEmail({
        to: user.email,
        subject: `You now have access to ${course.title}`,
        text: `Thank you for purchasing ${course.title}. You can now access the course content in your dashboard.`,
        html: `
          <h2>Thank you for your purchase!</h2>
          <p>You now have full access to <strong>${course.title}</strong>.</p>
          <p>You can access your course at any time from your dashboard.</p>
          <p><a href="${process.env.FRONTEND_URL}/learner/courses/${course._id}">Go to course</a></p>
        `,
      });
    }
  } catch (error) {
    console.error("Error sending purchase confirmation:", error);
  }
}
