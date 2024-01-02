import express from "express";
import router from "./routes/route.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/fetch", router);
app.get("/", (req, res) => {
  res.send("<h1>Hello Server is Running</h1>");
});

export default app;
