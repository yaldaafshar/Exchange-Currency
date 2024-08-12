import { IConvertMoney } from "../types";
import "./dropdown.css";
interface IDropDown {
  changeCurrency: (currency: IConvertMoney) => void;
  defaultCurrency: string;
  value: string[];
  label: "From" | "To";
}

export const DropDown = (props: IDropDown) => {
  const { changeCurrency, defaultCurrency, value, label } = props;
  const changeValue = (currency: string) => {
    label == "From"
      ? changeCurrency({ currencyFrom: currency })
      : changeCurrency({ currencyTo: currency });
  };
  return (
    <div className="dropdown-parent">
      <select
        defaultValue={defaultCurrency}
        className="dropdown"
        onChange={(e) => changeValue(e.target.value)}
      >
        {value.map((each, index) => {
          return (
            <option value={each} key={index}>
              {each}
            </option>
          );
        })}
      </select>
    </div>
  );
};
