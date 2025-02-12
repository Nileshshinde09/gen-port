import { Router } from "express";
import { healthcheck } from "../controllers/index.js";

const router = Router();

router.route("/").get((req, res, next) => {
  try {
    healthcheck(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
