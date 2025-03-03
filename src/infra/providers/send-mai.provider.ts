import nodemailer from "nodemailer";

import { ISendMailProvider } from "../../app/providers/send-mail.provider";
import { SignupRole } from "../../domain/dtos/role.dtos";
import { UserEntity } from "../../domain/entities/user.entity";
import { mailConfig } from "../../presentation/http/configs/mail.configs";
import { config } from "../../presentation/http/configs/env.config";

export class SendMailProvider implements ISendMailProvider {
  async sendOtpMail(email: string, otp: string): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport(mailConfig);

      const mailOptions = {
        from: config.EMAIL_USER,
        to: email,
        subject: "Your OTP Code for Verification",
        html: `
              <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;">
                <h2 style="color: #000; text-align: center;">Your OTP Code</h2>
                <p>Hello,</p>
                <p>You have requested a One-Time Password (OTP) to verify your account.</p>
                <div style="text-align: center; font-size: 22px; font-weight: bold; background-color: #f4f4f4; padding: 15px; border-radius: 5px; letter-spacing: 2px; width: fit-content; margin: auto;">
                  ${otp}
                </div>
                <p style="text-align: center; color: #d9534f;"><strong>This OTP will expire in 5 minutes.</strong></p>
                <p>If you did not request this code, please ignore this email and ensure your account is secure.</p>
                <p>Thank you,</p>
                <p><strong>Your Support Team</strong></p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="font-size: 12px; color: #888; text-align: center;">
                  Need help? Contact us at <a href="mailto:support@yourwebsite.com" style="color: #007bff;">support@yourwebsite.com</a>
                </p>
              </div>
            `,
      };

      // Send the email and wait for the result
      await transporter.sendMail(mailOptions);
      return true; // Successfully sent the email
    } catch (error) {
      console.error("Error sending OTP email:", error);
      return false; // Error sending the email
    }
  }

  async sendForgotPasswordMail(
    role: SignupRole,
    user: UserEntity,
    resetURL: string
  ): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport(mailConfig);

      const mailOptions = {
        from: config.EMAIL_USER,
        to: user.email.address,
        subject: "Reset Your Password - Action Required",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;">
              <h2 style="color: #000; text-align: center;">Forgot Your Password?</h2>
              <p>Hello <strong>${user.firstName}</strong>,</p>
              <p>You recently requested to reset your password for your account. No worries, we've got you covered!</p>
              <p style="text-align: center;">
                <a href="${config.FRONTEND_HOST}/${role}/auth/${resetURL}/change-password" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                  Reset My Password
                </a>
              </p>
              <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
              <p style="word-break: break-all; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${config.FRONTEND_HOST}/${role}/auth/${resetURL}/change-password</p>
              <p>If you didn’t request a password reset, please ignore this email. Your account is safe with us.</p>
              <p>Best regards,</p>
              <p><strong>Your Support Team</strong></p>
              <hr style="border: none; border-top: 1px solid #ddd;">
              <p style="font-size: 12px; color: #888; text-align: center;">
                Need help? Contact us at <a href="mailto:support@yourwebsite.com" style="color: #007bff;">support@yourwebsite.com</a>
              </p>
            </div>
          `,
      };
      // Send the email and wait for the result
      await transporter.sendMail(mailOptions);
      return true; // Successfully sent the email
    } catch (error) {
      console.error("Error sending OTP email:", error);
      return false; // Error sending the email
    }
  }
}
