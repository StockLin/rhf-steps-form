import { storeOptions } from "../../const";
import SelectField from "./SelectField";
import { IBaseFieldProps } from "./types";

interface StoreSelectFieldProps extends IBaseFieldProps {}

function StoreSelectField(props: StoreSelectFieldProps): JSX.Element {
  return <SelectField {...props} options={storeOptions} />;
}

export default StoreSelectField;
