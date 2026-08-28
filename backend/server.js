const express = require("express");
const app = express();

// packages
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// connection to DB and cloudinary
const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payments");
const courseRoutes = require("./routes/course");
const reachRoutes = require("./routes/reach");
const logsRoutes = require("./routes/logs");

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://study-orbit.vercel.app",
      // BUGFIX: allow overriding/extending allowed origins via env instead of
      // only ever supporting two hardcoded URLs (was causing CORS-driven
      // "connection reset" style failures whenever the app was deployed to
      // any other frontend origin, e.g. a preview deploy or custom domain).
      ...(process.env.CORS_EXTRA_ORIGINS
        ? process.env.CORS_EXTRA_ORIGINS.split(",").map((o) => o.trim())
        : []),
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// BUGFIX (Logging & Monitoring): there was no request logging at all, making
// it impossible to see which endpoints were slow/erroring in real time.
// Lightweight logger (no new dependency) that reports method, path, status
// and response time for every request.
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    const line = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`;
    if (res.statusCode >= 500) console.error(line);
    else if (ms > 1000) console.warn(`${line} [SLOW]`);
    else console.log(line);
  });
  next();
});

const PORT = process.env.PORT || 5000;

// BUGFIX: the server previously called app.listen() BEFORE connectDB() /
// cloudinaryConnect() resolved. That meant requests could be accepted and
// routed to controllers while Mongoose was still connecting (or before
// Cloudinary was configured), producing intermittent timeouts / connection
// resets right after a deploy or restart. Now we connect first, then start
// accepting traffic.
async function startServer() {
  try {
    await connectDB();
    cloudinaryConnect();

    // mount routes (only once dependencies are ready)
    app.use("/api/v1/auth", userRoutes);
    app.use("/api/v1/profile", profileRoutes);
    app.use("/api/v1/payment", paymentRoutes);
    app.use("/api/v1/course", courseRoutes);
    app.use("/api/v1/reach", reachRoutes);
    app.use("/api/v1/logs", logsRoutes);

    // default route
    app.get("/", (req, res) => {
      res.send(`
        <div>
          This is Default Route  
          <p>Everything is OK</p>
        </div>
      `);
    });

    // BUGFIX: no 404 handler existed, so unmatched routes returned an
    // unhelpful default Express HTML error page instead of JSON.
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
      });
    });

    // BUGFIX (Logging & Monitoring / stability): no centralized error
    // handler existed. Any error passed to next(err), or thrown in a
    // non-async route, would either crash the process or fall through to
    // Express's default HTML error page instead of a clean JSON response.
    app.use((err, req, res, next) => {
      console.error(`[unhandled error] ${req.method} ${req.originalUrl}`, err);
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
      });
    });

    app.listen(PORT, () => {
      console.log(`Server Started on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Fatal error while starting the server:", error);
    process.exit(1);
  }
}

startServer();

// BUGFIX: previously unhandled promise rejections (e.g. a stray async error
// somewhere) would silently kill the Node process with no log line, which
// looks exactly like the random "connection reset" behavior being reported.
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});
