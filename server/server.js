import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDb from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderContoller.js";

const app = express();
const port = process.env.PORT || 4000;

let connectPromise = null;

async function ensureConnection(req, res, next) {
  try {
    if (!connectPromise) {
      connectPromise = (async () => {
        await connectDb();
        await connectCloudinary();
      })();
    }
    await connectPromise;
    next();
  } catch (error) {
    connectPromise = null;
    res.status(503).json({ success: false, message: "Database connection failed" });
  }
}

// Middlewere configration
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.use(express.json());
app.use(cookieParser());

// Allow requests from the configured client origin(s).
// CLIENT_URL may contain a comma-separated list, e.g.
// "http://localhost:5173,http://192.168.1.10:5173"
const clientUrls = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(requestOrigin, callback) {
      // Allow non-browser clients (Postman, cURL) and same-origin requests.
      if (!requestOrigin) {
        return callback(null, true);
      }
      if (clientUrls.indexOf(requestOrigin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(ensureConnection);

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("home route");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`server runining on http://localhost:${port}`);
  });
}

export default app;
