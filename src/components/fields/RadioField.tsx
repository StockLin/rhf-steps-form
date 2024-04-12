import { Radio } from "antd";

import { Controller } from "react-hook-form";
import { IBaseFieldProps } from "./types";
import { IOption } from "../../const";

interface RadioFieldProps extends IBaseFieldProps {
  options: IOption[];
}

function RadioField({
  label,
  name,
  control,
  options,
  onChange,
}: RadioFieldProps): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2 justify-start mb-4 max-w-[360px]">
          <span className=" text-gray-500">
            <span className="text-red-500">*</span>
            {label}
          </span>
          <Radio.Group
            className="min-w-[200px]"
            {...field}
            onChange={(e) => {
              field?.onChange(e);
              onChange?.(e);
            }}
          >
            <div className={`grid grid-cols-2 gap-4`}>
              {options.map((option) => (
                <Radio
                  disabled={option.disabled}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </div>
          </Radio.Group>
          {error && <div className="text-red-500">{error.message}</div>}
        </div>
      )}
    />
  );
}

export default RadioField;
