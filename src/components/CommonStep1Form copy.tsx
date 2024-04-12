/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import {
  TransactionalCategoryEnum,
  transactionalActionMap,
  transactionalActionOptionMap,
  transactionalCategoryMap,
  transactionalCategoryOptions,
} from "../const";
import { Card } from "antd";
import RadioField from "./fields/RadioField";

function CommonStep1Form() {
  const { control, watch, setValue } = useFormContext();
  const category = watch("category") as TransactionalCategoryEnum;
  const actionOptions = transactionalActionOptionMap[category] || null;

  const onCategoryChange = (e: any) => {
    const value = e.target.value;
    const label = transactionalCategoryMap[value]?.label;

    if (label) {
      setValue("categoryLabel", label);
    }

    setValue("action", null);
  };

  const onActionChange = (e: any) => {
    const value = e.target.value;
    const label = transactionalActionMap[value]?.label;

    if (label) {
      setValue("actionLabel", label);
    }
  };

  return (
    <Card title="異動項目">
      <RadioField
        name="category"
        label="類別"
        control={control}
        options={transactionalCategoryOptions}
        onChange={onCategoryChange}
      />

      {actionOptions && (
        <RadioField
          name="action"
          label="操作"
          control={control}
          options={actionOptions}
          onChange={onActionChange}
        />
      )}
    </Card>
  );
}

export default CommonStep1Form;
