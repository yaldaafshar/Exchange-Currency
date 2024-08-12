import axios from "axios";
import { useState } from "react";
import { IConvertMoney } from "../types";
import Cookies from "universal-cookie";
import { DropDown } from "../ui/drop-down";

interface IRate {
  getExchangeData: () => void;
  value: string[];
}
const Rate = (props: IRate) => {
  const cookie = new Cookies();
  const defaultCurrency: string = cookie.get("Currency");
  const [newRate, setNewRate] = useState<number>();
  const [convertMoney, setConvertMoney] = useState<IConvertMoney>({
    currencyFrom: defaultCurrency ? defaultCurrency : "CAD",
    currencyTo: "USD",
  });
  const changeRate = (value: string) => {
    const number = parseFloat(value);
    setNewRate(number);
  };
  const changeCurrency = (props: IConvertMoney) => {
    if (!props.currencyFrom && !props.currencyTo) {
      return;
    }
    if (props.currencyFrom) {
      console.log("change currency from");
      setConvertMoney({ ...convertMoney, currencyFrom: props.currencyFrom });
    }
    if (props.currencyTo) {
      console.log("change currency to");

      setConvertMoney({ ...convertMoney, currencyTo: props.currencyTo });
    }
  };
  const changeBuyRate = (buyRate?: number) => {
    axios
      .put("/exchange", {
        buyRate: buyRate,
        currency: convertMoney.currencyFrom,
      })
      .then((res) => res.data == "Successful" && props.getExchangeData())
      .catch((e) => console.log("error--->", e));
  };
  return (
    <div
      style={{
        marginTop: 24,
        width: "vw",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFF5EE",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 4px 8px gray",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: 240,
          }}
        >
          <input
            type="number"
            placeholder="Enter the new rate"
            onChange={(e) => changeRate(e.target.value)}
            style={{
              marginRight: 8,
              paddingRight: 60,
              paddingLeft: 60,
              paddingBottom: 12,
              paddingTop: 12,
              borderRadius: 8,
              // minWidth: 140,
            }}
          />
          <DropDown
            changeCurrency={changeCurrency}
            defaultCurrency={convertMoney.currencyFrom!}
            value={props.value}
            label="From"
          />
        </div>
        <button
          style={{
            marginTop: 8,
            borderRadius: 4,
            padding: 8,
            backgroundColor: "#4682B4",
          }}
          onClick={() => changeBuyRate(newRate)}
        >
          set to new Rate
        </button>
      </div>
    </div>
  );
};

export default Rate;
