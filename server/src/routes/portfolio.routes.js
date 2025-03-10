import { Router } from "express";
import {
  createPortfolio,
  getPortfolio,
  getPublicPortfolio,
  giveMyAllPortfolios,
  updatePortfolio,
  deletePortfolio,
  getPortfolioPriview
} from "../controllers/portfolio.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { updateUserMetrics } from "../middlewares/userMetrics.middleware.js";
import checkIfBlocked from "../middlewares/block.middleware.js";

const router = Router();

// Create new portfolio (protected route)
router.route("/").post(verifyJWT, checkIfBlocked, updateUserMetrics, createPortfolio);

// Get all portfolios for authenticated user
router.route("/my-portfolios").get(verifyJWT, checkIfBlocked, giveMyAllPortfolios);

// Get public portfolio using ID and access token
router.route("/public/:portfolioId/:portfolioAccessToken").get(getPublicPortfolio);

router.route("/preview/:_id").get(getPortfolioPriview);
// Get, update and delete portfolio by ID (protected routes)
router.route("/:portfolioId")
  .get(verifyJWT, checkIfBlocked, getPortfolio)
  .patch(verifyJWT, checkIfBlocked, updateUserMetrics, updatePortfolio)
  .delete(verifyJWT, checkIfBlocked, updateUserMetrics, deletePortfolio);

export default router;
