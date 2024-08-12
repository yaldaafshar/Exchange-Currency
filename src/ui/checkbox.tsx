interface ICheckbox {
  isCheckedCurrency: boolean;
  toggleCheckBox: (currency: string) => void;
  currency: string;
}
const Checkbox = (props: ICheckbox) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="checkbox"
        checked={props.isCheckedCurrency}
        onChange={() => props.toggleCheckBox(props.currency)}
        style={{ marginRight: 8 }}
      />
      <label style={{ minWidth: 40 }}>{props.currency}</label>
    </div>
  );
};
export default Checkbox;
