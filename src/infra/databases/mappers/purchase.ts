import { IPurchase } from "../interfaces";
import { IPurchaseOutPopulatedDTO } from "../../../domain/dtos";

export const mapDocumentToPurchase = (
  purchase: IPurchase
): IPurchaseOutPopulatedDTO => {
  const { title, _id: courseId } = purchase.courseId as unknown as {
    title: string;
    _id: string;
  };

  return {
    id: purchase._id.toString(),
    learnerId: purchase.learnerId.toString(),
    course: {
      id: courseId,
      title,
    },
    purchaseId: purchase.purchaseId,
    paymentIntentId: purchase.paymentIntentId,
    status: purchase.status,
    amount: purchase.amount,
    purchaseDate: purchase.purchaseDate.getTime(),
  };
};
