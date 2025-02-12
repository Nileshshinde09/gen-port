import { init } from "./graphql/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { limiter } from "./middlewares/index.js";
import requestIp from "request-ip";
import "./jobs/cleanupGuestUsers.js"; 
const app = express();

// Middleware
app.use(
  cors({
    // origin:
    //   process.env.CORS_ORIGIN === "*"
    //     ? "*"
    //     : process.env.CORS_ORIGIN?.split(","),
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials: true,
  })
);
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173","http://localhost:5174");
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

// Apollo Server Setup
//-------------------------------------------------------------
// Apply Apollo Server middleware to Express

init(app)
  .then(() => {
    console.log("Apollo Server initialized successfully");
  })
  .catch((err) => {
    console.error("Error initializing Apollo Server:", err.message);
  });

//-------------------------------------------------------------

export { app };
