import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { limiter } from "./middlewares/index.js";
import requestIp from "request-ip";
import "./jobs/cleanupGuestUsers.js"; 
const app = express();

// Create a CORS middleware with your settings
const corsMiddleware = cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
});

// Apply CORS to all routes except portfolio
app.use((req, res, next) => {
  if (req.path.startsWith('/api/v1/portfolio')) {
    return next();
  }
  return corsMiddleware(req, res, next);
});

// Your custom headers middleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api/v1/portfolio')) {
    return next();
  }
  res.header("Access-Control-Allow-Origin", "http://localhost:5173", "http://localhost:5174");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(requestIp.mw());
app.use(limiter);
app.use(express.json({ limit: "2000kb" }));
app.use(express.urlencoded({ extended: true, limit: "2000kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// HealthCheck route
import healthcheck from "./routes/healthcheck.routes.js";
app.use("/api/v1/healthcheck", healthcheck);

// User route
import user from "./routes/user.routes.js";
app.use("/api/v1/user", user);

// Helpdesk route
import helpdesk from "./routes/helpdesk.routes.js";
app.use("/api/v1/helpdesk", helpdesk);

// portfolio route
import portfolio from "./routes/portfolio.routes.js";
app.use("/api/v1/portfolio", portfolio);



export { app };
