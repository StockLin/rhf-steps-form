import { groupOptions } from "../../const";
import SelectField from "./SelectField";
import { IBaseFieldProps } from "./types";

interface GroupSelectFieldProps extends IBaseFieldProps {}

function GroupSelectField(props: GroupSelectFieldProps): JSX.Element {
  return <SelectField {...props} options={groupOptions} />;
}

export default GroupSelectField;
