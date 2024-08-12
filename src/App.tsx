import "./App.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Show from "./Scenes/show";
import Convert from "./Scenes/convert";
import Rate from "./Scenes/rate";
import Cookies from "universal-cookie";
import LoginLogout from "./Scenes/login-logout";
import { IExchange, IUser } from "./types";
import { useSessionUser, userContext } from "./Services/userContext";
import TableHeader from "./ui/table-header";

function App() {
  const [exchangeData, setExchangeData] = useState<IExchange[]>([]);
  const cookies = new Cookies(null, { path: "/" });
  const context = useSessionUser();

  async function getExchangeData(): Promise<void> {
    const prefferedCurrency = cookies.get("Currency");

    try {
      const myPromise = await axios.get<IExchange[]>("/exchange");
      const newExchangeData = myPromise.data;
      const updatedExchangeData: IExchange[] = newExchangeData.map(
        (data: IExchange) =>
          data.currencyFrom == prefferedCurrency
            ? { ...data, isChecked: true }
            : data
      );
      if (!prefferedCurrency) {
        setExchangeData(newExchangeData);
      }
      setExchangeData(updatedExchangeData);
    } catch (error) {
      console.error("Error fetching exchange data:", error);
    }
  }

  useEffect(() => {
    console.log("running useeefect");
    getExchangeData();
  }, []);
  // console.log(context.username);
  const toggleCheckBox = (currency: string) => {
    const index = exchangeData.findIndex(
      (data) => data.currencyFrom == currency
    );
    if (index >= 0) {
      const updatedExchangeData: IExchange[] = exchangeData.map(
        (data: IExchange) =>
          data.currencyFrom == currency
            ? { ...data, isChecked: !data.isChecked }
            : data
      );
      cookies.set("Currency", currency);
      setExchangeData(updatedExchangeData);
    }
  };
  const currencies = exchangeData?.map(
    (a: IExchange, index) => a["currencyFrom"]
  );
  return (
    <div style={{ width: "vw" }}>
      <LoginLogout />
      <Convert value={currencies} />
      <div
        style={{
          display: "flex",
          width: "vw",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 120,
        }}
      >
        <div
          className="grid-width"
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 8,
            backgroundColor: "#FFF5EE",
            boxShadow: "0 4px 8px gray",
          }}
        >
          <TableHeader />
          <div style={{ marginTop: 8 }}>
            {exchangeData.map((each, index) => {
              return (
                <Show
                  key={index}
                  getExchangeData={getExchangeData}
                  exchangeData={each}
                  toggleCheckBox={toggleCheckBox}
                />
              );
            })}
          </div>
        </div>
      </div>

      {context.role == "admin" ? (
        <Rate getExchangeData={getExchangeData} value={currencies} />
      ) : null}
    </div>
  );
}

export default App;
