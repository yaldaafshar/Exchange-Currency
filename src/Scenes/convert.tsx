import { useState } from "react";
import axios from "axios";
import { DropDown } from "../ui/drop-down";
import { IConvertMoney } from "../types";
import "./convert.css";
interface IEarnedMoney {
  convertedMoney: number;
}

interface IConvertData {
  value: string[];
}

const Convert = (props: IConvertData) => {
  const [earnedMoney, setEarnedMoney] = useState<IEarnedMoney>();
  const [budget, setBudget] = useState<number>();
  const [convertMoney, setConvertMoney] = useState<IConvertMoney>({
    currencyFrom: "CAD",
    currencyTo: "USD",
  });

  const getConvertedExchange = async () => {
    try {
      // Construct the query parameters
      const queryParams = new URLSearchParams({
        budget: JSON.stringify({ budget }),
        currencyFrom: convertMoney.currencyFrom!,
        currencyTo: convertMoney.currencyTo!,
      });

      // Make the fetch request
      const response = await fetch(`/convert?${queryParams.toString()}`, {
        method: "GET",
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      setEarnedMoney({ convertedMoney: data });
    } catch (error) {
      console.error("Error fetching converted exchange:", error);
    }
  };

  const changeCurrency = (props: IConvertMoney) => {
    if (!props.currencyFrom && !props.currencyTo) {
      return;
    }
    if (props.currencyFrom) {
      setConvertMoney({ ...convertMoney, currencyFrom: props.currencyFrom });
    }
    if (props.currencyTo) {
      setConvertMoney({ ...convertMoney, currencyTo: props.currencyTo });
    }
  };

  const enterBudget = (budget: string) => {
    const budgetNUmber = parseInt(budget);
    setBudget(budgetNUmber);
  };

  return (
    <div
      style={{
        backgroundColor: "#4682B4",
        width: "vw",
        padding: 16,
      }}
    >
      <div className="convert-parent">
        <div className="convert">
          <input
            className="amount-input"
            placeholder="Amount"
            onChange={(e) => enterBudget(e.target.value)}
            type="number"
          />
          <DropDown
            changeCurrency={changeCurrency}
            defaultCurrency={convertMoney.currencyFrom!}
            value={props.value}
            label="From"
          />
          <DropDown
            changeCurrency={changeCurrency}
            defaultCurrency={convertMoney.currencyTo!}
            value={props.value}
            label="To"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {earnedMoney ? (
            <div>
              <p className="pConvert">{`${budget} ${convertMoney.currencyFrom} Dollar = `}</p>
              <p>{`${earnedMoney.convertedMoney} ${convertMoney.currencyTo}`}</p>
            </div>
          ) : null}
          <button
            className="convertButton"
            onClick={() => getConvertedExchange()}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Convert;
