import { z } from "zod";
import { inboundSchema } from "../schema";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";

import { DevTool } from "@hookform/devtools";
import CommonStep3Form from "./CommonStep3Form";
import InboundStep2OnlyForm from "./InboundStep2OnlyForm";
import NameBatchSrcModal from "./modals/NameBatchSrcModal";
import { ReferenceType } from "../types";
import {
  StockTypeEnum,
  TransactionalActionEnum,
  TransactionalCategoryEnum,
} from "../const";
import CommonReviewCard from "./cards/CommonReviewCard";
import AmendedSteps from "./AmendedSteps";
import StepFormButtons from "./StepFormButtons";
import useModal from "../hooks/useModal";
import useFormSteps, { IFormStep } from "../hooks/useFormSteps";
import { getFormSteps } from "../utils";
import MainLayout from "../layouts/MainLayout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import queryString from "query-string";
import useRefsToAmendedStocks from "../hooks/useRefsToAmendedStocks";

const steps: IFormStep[] = getFormSteps();

type InboundStepsFormType = z.infer<typeof inboundSchema>;

function InboundStepsForm() {
  const location = useLocation();

  const { open, toggle } = useModal();

  const methods = useForm<InboundStepsFormType>({
    mode: "all",
    resolver: zodResolver(inboundSchema),
  });

  const { handleSubmit, setValue, control } = methods;

  // TODO: 問題 透過useParams取到category, action後, 如何將其設定到form的defaultValues
  // 目前還是用useEffect適合？
  useEffect(() => {
    const { category, action, categoryLabel, actionLabel } =
      queryString.parse(location.search) || {};

    // TODO: if empty then redirect

    if (category) {
      setValue("category", category as TransactionalCategoryEnum);
    }

    if (action) {
      setValue("action", action as TransactionalActionEnum);
    }

    if (categoryLabel) {
      setValue("categoryLabel", categoryLabel as string);
    }

    if (actionLabel) {
      setValue("actionLabel", actionLabel as string);
    }
  }, [setValue, location]);

  const { processRefsToAmendedStocks } = useRefsToAmendedStocks(
    StockTypeEnum.INBOUND
  );

  const onSubmit: SubmitHandler<InboundStepsFormType> = async (data) => {
    console.log("final data...", data);
  };

  const { currentStep, prevStep, nextStep } =
    useFormSteps<InboundStepsFormType>(
      methods,
      steps.slice(1),
      handleSubmit(onSubmit)
    );

  const amendedOperation = useWatch({
    name: ["date", "categoryLabel", "actionLabel"],
    control,
  });

  const amendedStocks = useWatch({ name: "amendedStocks", control }) || [];
  const references = amendedStocks?.map((stock) => stock?.reference) || [];

  const onOk = (data: ReferenceType[]) => {
    const updatedStocks = processRefsToAmendedStocks(data, amendedStocks);
    setValue("amendedStocks", updatedStocks);
  };

  return (
    <MainLayout>
      <AmendedSteps
        steps={steps?.map((step) => step.title)}
        currentStep={currentStep + 1}
      />

      <FormProvider {...methods}>
        <form className="flex flex-col gap-4 w-full">
          {currentStep === 0 && (
            <InboundStep2OnlyForm>
              <Button
                className="w-full"
                type="primary"
                onClick={() => toggle(true)}
              >
                選擇品號資料
              </Button>
            </InboundStep2OnlyForm>
          )}

          {currentStep === 1 && <CommonStep3Form />}

          {currentStep === 2 && (
            <CommonReviewCard
              amendedOperation={{
                date: amendedOperation[0],
                categoryLabel: amendedOperation[1],
                actionLabel: amendedOperation[2],
              }}
              amenedStocks={amendedStocks}
            />
          )}

          {/* prev / next button */}
          <StepFormButtons prev={prevStep} next={nextStep} />
        </form>
      </FormProvider>

      <NameBatchSrcModal
        open={open}
        toggle={toggle}
        onOk={onOk}
        selectedRows={references}
      />

      <DevTool control={methods.control} />
    </MainLayout>
  );
}

export default InboundStepsForm;
