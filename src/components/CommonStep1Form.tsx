/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import {
  TransactionalCategoryEnum,
  transactionalActionMap,
  transactionalActionOptionMap,
  transactionalCategoryMap,
  transactionalCategoryOptions,
} from "../const";
import { Card } from "antd";
import RadioField from "./fields/RadioField";
import { commonForm1Schema } from "../schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AmendedSteps from "./AmendedSteps";
import { getFormSteps } from "../utils";
import StepFormButtons from "./StepFormButtons";

export type CommonStep1FormType = z.infer<typeof commonForm1Schema>;

const steps = getFormSteps();

interface CommonStep1FormProps {
  onSubmit: (formData: CommonStep1FormType) => void;
}

function CommonStep1Form({ onSubmit }: CommonStep1FormProps) {
  const { control, watch, setValue, handleSubmit, trigger } =
    useForm<CommonStep1FormType>({
      mode: "all",
      resolver: zodResolver(commonForm1Schema),
    });

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

  const onPrev = () => {};

  const onNext = async () => {
    const isValid = await trigger();

    if (!isValid) return;

    await handleSubmit(onSubmit)();
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center py-16">
      <AmendedSteps steps={steps?.map((step) => step.title)} currentStep={0} />

      <Card className="!w-full" title="異動項目">
        <form className="flex flex-col gap-4">
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
        </form>
      </Card>

      <StepFormButtons prev={onPrev} next={onNext} />
    </div>
  );
}

export default CommonStep1Form;
