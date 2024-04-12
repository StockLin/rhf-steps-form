import { Card } from "antd";
import DatePickerField from "./DateField";
import { Control, FieldValues } from "react-hook-form";

interface AmendedDateFieldProps {
  control: Control<FieldValues>;
}

function AmendedDateField({ control }: AmendedDateFieldProps): JSX.Element {
  return (
    <Card title="異動日期">
      <DatePickerField label="異動日期" name="date" control={control} />
    </Card>
  );
}

export default AmendedDateField;
