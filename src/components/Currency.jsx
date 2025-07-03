import React, { useState } from "react";
import "../css/currency.css";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import axios from "axios";

//ilk denem api https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_UO6NmTo2DCDEx150GHFCGodxOJeDVadnhHBjmKa1&base_currency=TRY

//curl https://api.fastforex.io/fetch-all?api_key=YOUR_API_KEY

//ikinci projede https://console.fastforex.io/api-keys/listing# *fetch-all kullanılan api https://api.fastforex.io/fetch-all?api_key=5b9cc31382-7893923590-sytp1q&from=AZN

const BASE_URL = "https://api.fastforex.io/fetch-all?";

const API_KEY = "5b9cc31382-7893923590-sytp1q"; // api key'i

let EXCHANGE_APİ = `${BASE_URL}`;

function Currency() {
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("USD"); //default degerlerın sectık
  const [toCurrency, setToCurrency] = useState("TRY"); //default degerlerın sectık
  const [result, setResult] = useState(0);

  const exchange = async () => {
    // console.log(amount);
    // console.log(fromCurrency);
    // console.log(toCurrency);
    try {
      const response = await axios.get(
        `${BASE_URL}api_key=${API_KEY}&from=${fromCurrency}`
      );
      const rate = response.data.results[toCurrency]; // örn. TRY
      const result = (rate * amount).toFixed(2);
      setResult(result);
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  //orn ınputdakı ıkıncı tl ıle json datadakı try nı maplayıb ılk ınputda cevırmek ıstedıgım para bırımı ıle carpıcam
  return (
    <div className="currencyDiv">
      <div className="texth2">
        <h2>Foreign Currency APP</h2>
      </div>
      <div style={{ marginTop: "15px" }}>
        <input
          type="number"
          className="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          onChange={(e) => setFromCurrency(e.target.value)}
          name=""
          id=""
          className="from-currency-option"
        >
          <option value="USD">USD</option>
          <option value="AZN">AZN</option>
          <option value="EUR">EUR</option>
          <option value="TRY">TRY</option>
          <option value="GBP">GBP</option>
        </select>
        <FaRegArrowAltCircleRight
          style={{ fontSize: "25px", marginRight: "10px",color:"aquamarine" }}
        />
        <select
          onChange={(e) => setToCurrency(e.target.value)}
          name=""
          id=""
          className="to-currency-option"
        >
          <option value="TRY">TRY</option>//value tanımladık degelerı almak ıcın
          <option value="AZN">AZN</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">EUR</option>
        </select>
        <input
          value={result}
          onChange={(e) => setResult(e.target.value)}
          type="text"
          className="result"
        />
      </div>
      <div>
        <button onClick={exchange} className="exchange-button">
          Çevir
        </button>
      </div>
    </div>
  );
}

export default Currency;
