import express from "express";

import { authRouter } from "./auth.routes";
import { refreshRouter } from "./refresh.routes";
import { userRouter } from "./user.routes";
import { materialRouter } from "./material.routes";
import { uploadRouter } from "./upload.routes";
import { categoryRouter } from "./category.routes";
import { courseRouter } from "./course.routes";
import { lessonRouter } from "./lesson.routes";
import { notificationRouter } from "./notification.routes";
import { noAuthRouter } from "./no-auth.routes";
import { paymentRouter } from "./payment.routes";

export const apiRouter = express.Router();

//redirect all lesson routes to corresponding subroutes
apiRouter.use("/auth", authRouter);
apiRouter.use("/refresh", refreshRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/materials", materialRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/lessons", lessonRouter);
apiRouter.use("/courses", courseRouter);
// apiRouter.use("/mentors", mentorRouter);
// apiRouter.use("/learners", learnerRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/notify", notificationRouter);
apiRouter.use("/no-auth", noAuthRouter);
apiRouter.use("/payment", paymentRouter);
// apiRouter.use("/profile", profileRouter);
// apiRouter.use("/purchase-history", purchaseHistoryRouter);
// apiRouter.use("/subscription-history", subscriptionHistoryRouter);
// apiRouter.use("/progress", progressRouter);
// apiRouter.use("/analysis", analysisRouter);
// apiRouter.use("/chats", chatRouter);
// apiRouter.use("/meets", meetRouter);
