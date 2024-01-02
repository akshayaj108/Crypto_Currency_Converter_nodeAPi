import axios from "axios";
// import { historyModel } from "../../model/exchangeHistory.js";
class Operation {
  static async get(req, res) {
    //
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "inr",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );
      const topCryptos = response.data.map((crypto) => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        current_price: crypto.current_price,
      }));
      res.status(200).json(topCryptos);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        CustomMessage: "Error from API",
        error: "Internal Server Error",
      });
    }
  }

  static async getConversionPrice(req, res) {
    const { fromCurrency, toCurrency, amount } = req.body;
    console.log(" check input -", fromCurrency, " ", toCurrency, " ", amount);
    if (!fromCurrency || !toCurrency || !amount) {
      return res.status(400).send({ message: "All fields are required" });
    }
    if (isNaN(amount)) {
      return res.status(400).json({ message: "Enter Valid Amount" });
    }
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: fromCurrency,
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      }
    );
    let data = response.data.map((cryp, i) => ({
      id: cryp.id,
      name: cryp.name,
      price: cryp.current_price,
      symbol: cryp.symbol,
    }));

    const coins = data.find((coin) => coin.symbol === toCurrency);
    console.log(coins);

    const convertedAmount = (amount / coins.price).toFixed(2);
    console.log(convertedAmount);
    // const doc = new historyModel({
    //   regularCurrency: fromCurrency,
    //   CryptoCurrency: toCurrency,
    //   amount,
    //   result: convertedAmount,
    // });
    // await doc.save();
    return res.status(200).json({
      AmountTargetCurrency: `${amount}-${fromCurrency}`,
      CoinRealTimePrice: `${coins.price}-${fromCurrency}`,
      result: `${convertedAmount}-${coins.name}`,
    });
  }
}

export default Operation;
