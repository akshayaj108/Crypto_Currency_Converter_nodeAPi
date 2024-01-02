import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    regularCurrency: String,
    CryptoCurrency: String,
    amount: Number,
    result: String,
  },
  { timestamps: true }
);

export const historyModel = mongoose.model("exchangHistory", historySchema);
