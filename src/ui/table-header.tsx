const TableHeader = () => {
  return (
    <div
      className="grid-width"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        backgroundColor: "#4682B4",
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 8,
        justifyItems: "center",
      }}
    >
      <div className="Buy-sell-items">{"Preferrence"}</div>
      <div className="Buy-sell-items">{"currencyFrom"}</div>
      <div className="Buy-sell-items">{"Buy"}</div>
      <div className="Buy-sell-items">{"Sell"}</div>
      <div className="Buy-sell-items">{"currencyTo"}</div>
    </div>
  );
};
export default TableHeader;
