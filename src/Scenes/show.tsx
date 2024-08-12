import { useEffect } from "react";
import "./show";
import { Ishow } from "../types";
import Checkbox from "../ui/checkbox";
import "./show.css";

const Show = (props: Ishow) => {
  const { getExchangeData, exchangeData, toggleCheckBox } = props;
  const { buyRate } = exchangeData;

  useEffect(() => {
    getExchangeData();
  }, [buyRate]);

  return (
    <>
      <div
        className="grid-width"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          justifyItems: "center",
          borderBottom: 1,
          borderBottomColor: "gray",
          borderBottomStyle: "solid",
        }}
      >
        <Checkbox
          toggleCheckBox={() => toggleCheckBox(exchangeData.currencyFrom)}
          isCheckedCurrency={exchangeData.isChecked}
          currency={exchangeData.currencyFrom}
        />
        <div className="Buy-sell-items">{exchangeData.currencyFrom}</div>
        <div className="Buy-sell-items">{exchangeData?.buyRate}</div>
        <div className="Buy-sell-items">{exchangeData?.SellRate}</div>
        <div className="Buy-sell-items">{exchangeData?.currencyTo}</div>
      </div>
    </>
  );
};

export default Show;
