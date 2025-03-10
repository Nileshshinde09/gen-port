import { Router } from "express";
import {
  storeFeedback,
  getFeedbackTestimonials,
  raiseSupportTicket,
  getMyTickets,
  changeTicketState,
  getAllTickets,
  getAllFeedbacks,
} from "../controllers/index.js";
import {
  isAdminMiddleware,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import checkIfBlocked from "../middlewares/block.middleware.js";

const router = Router();

router
  .route("/f/get-user-testimonials")
  .get(verifyJWT, checkIfBlocked, getFeedbackTestimonials);
router
  .route("/f/store-user-feedback")
  .post(verifyJWT, checkIfBlocked, storeFeedback);
router
  .route("/s/raise-support-ticket")
  .post(verifyJWT, checkIfBlocked, raiseSupportTicket);
router
  .route("/s/get-my-support-tickets")
  .get(verifyJWT, checkIfBlocked, getMyTickets);

//-------------------------------admin routes----------------------------------
router
  .route("/a/get-all-support-tickets")
  .get(verifyJWT, isAdminMiddleware, getAllTickets);
router
  .route("/a/change-ticket-state/:ticketId")
  .put(verifyJWT, isAdminMiddleware, changeTicketState);

router
  .route("/a/get-all-feedbacks")
  .get(verifyJWT, isAdminMiddleware, getAllFeedbacks);
export default router;
