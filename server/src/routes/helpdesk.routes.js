import { Router } from "express";
import {
  storeFeedback,
  getFeedbackTestimonials,
  raiseSupportTicket,
  getMyTickets,
} from "../controllers/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
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
  .post(verifyJWT, checkIfBlocked, getMyTickets);

export default router;
