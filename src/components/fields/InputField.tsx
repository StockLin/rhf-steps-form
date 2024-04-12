import { Input } from "antd";

import { Controller } from "react-hook-form";
import { IBaseFieldProps } from "./types";

interface InputFieldProps extends IBaseFieldProps {}

function InputField({ label, name, control }: InputFieldProps): JSX.Element {
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
          <Input
            className="min-w-[200px]"
            {...field}
            allowClear
            status={error ? "error" : undefined}
            placeholder="請輸入"
          />
          {error && <div className="text-red-500">{error.message}</div>}
        </div>

        // <div>
        //   <ProFormText
        //     required
        //     label={label}
        //     fieldProps={{
        //       onChange: onChange,
        //       onBlur: onBlur,
        //     }}
        //     help={error?.message}
        //   />
        // </div>
      )}
    />
  );
}

export default InputField;
