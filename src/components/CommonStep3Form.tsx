import { useFormContext } from "react-hook-form";
import InputField from "./fields/InputField";
import { Card } from "antd";

function CommonStep3Form() {
  const { control } = useFormContext();
  return (
    <Card title="其他項目">
      <InputField label="備註" name="note" control={control} />
    </Card>
  );
}

export default CommonStep3Form;
