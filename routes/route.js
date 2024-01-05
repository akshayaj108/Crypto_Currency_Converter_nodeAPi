import express from "express";
import Operation from "../controller/operations.js";
const router = express.Router();

router.get("/", Operation.get);
router.post("/convert", Operation.getConversionPrice);

export default router;
