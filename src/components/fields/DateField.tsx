import { DatePicker } from "antd";

import { Controller } from "react-hook-form";
import { IBaseFieldProps } from "./types";
import dayjs from "dayjs";

interface DatePickerFieldProps extends IBaseFieldProps {}

function DatePickerField({
  label,
  name,
  control,
}: DatePickerFieldProps): JSX.Element {
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
          <DatePicker
            className="min-w-[200px]"
            {...field}
            onChange={(date) => {
              field?.onChange(date?.format("YYYY-MM-DD") ?? "");
            }}
            allowClear
            status={error ? "error" : undefined}
            placeholder="請選擇日期"
            value={field.value ? dayjs(field.value) : null}
          />
          {error && <div className="text-red-500">{error.message}</div>}
        </div>
      )}
    />
  );
}

export default DatePickerField;
