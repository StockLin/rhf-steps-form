import { stockOptions } from "../../const";
import SelectField from "./SelectField";
import { IBaseFieldProps } from "./types";

interface StockSelectFieldProps extends IBaseFieldProps {}

function StockSelectField(props: StockSelectFieldProps): JSX.Element {
  return <SelectField {...props} options={stockOptions} />;
}

export default StockSelectField;
