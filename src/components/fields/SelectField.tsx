import { IBaseFieldProps } from "./types";
import { IOption } from "../../const";
import { Controller } from "react-hook-form";
import { Select } from "antd";

interface SelectFieldProps extends IBaseFieldProps {
  options: IOption[];
}

function SelectField({
  label,
  name,
  control,
  options = [],
  onChange,
}: SelectFieldProps): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="flex flex-col gap-2 justify-start mb-4 max-w-[360px]">
            <span className=" text-gray-500">
              <span className="text-red-500">*</span>
              {label}
            </span>
            <Select
              className="min-w-[200px]"
              {...field}
              allowClear
              status={error ? "error" : undefined}
              options={options}
              placeholder="請選擇"
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
            />
            {error && <div className="text-red-500">{error.message}</div>}
          </div>
        );
      }}
    />
  );
}

export default SelectField;
