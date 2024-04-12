import { z } from "zod";
import useFormSteps, { IFormStep } from "../hooks/useFormSteps";
import MainLayout from "../layouts/MainLayout";
import { getFormSteps } from "../utils";
import { inboundSchema } from "../schema";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TicketSrcModal from "./modals/TicketSrcModal";
import AmendedSteps from "./AmendedSteps";
import useModal from "../hooks/useModal";
import {
  StockTypeEnum,
  TransactionalActionEnum,
  TransactionalCategoryEnum,
} from "../const";
import useRefsToAmendedStocks from "../hooks/useRefsToAmendedStocks";
import { ReferenceType } from "../types";
import StepFormButtons from "./StepFormButtons";
import CommonStep3Form from "./CommonStep3Form";
import CommonReviewCard from "./cards/CommonReviewCard";
import { Button } from "antd";
import InboundReturnStep2Form from "./InboundReturnStep2OnlyForm";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const steps: IFormStep[] = getFormSteps();

type InboundReturnStepsFormType = z.infer<typeof inboundSchema>; // TODO: 同inboundSchema只是內部amenededStocks中的serialNumber、remainingQuantity有值

function InboundReturnStepsForm() {
  const location = useLocation();
  const { open, toggle } = useModal();

  const methods = useForm<InboundReturnStepsFormType>({
    mode: "all",
    resolver: zodResolver(inboundSchema),
  });

  const { handleSubmit, setValue, control } = methods;

  const { processRefsToAmendedStocks } = useRefsToAmendedStocks(
    StockTypeEnum.OUTBOUND
  );

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

  const onSubmit: SubmitHandler<InboundReturnStepsFormType> = async (data) => {
    console.log("final data...", data);
  };

  const { currentStep, prevStep, nextStep } =
    useFormSteps<InboundReturnStepsFormType>(
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
    <MainLayout control={control}>
      {/* step header */}
      <AmendedSteps
        steps={steps?.map((step) => step.title)}
        currentStep={currentStep + 1}
      />

      {/* form */}
      <FormProvider {...methods}>
        <form className="flex flex-col gap-4 w-full">
          {currentStep === 0 && (
            <InboundReturnStep2Form>
              <Button
                className="w-full"
                type="primary"
                onClick={() => toggle(true)}
              >
                選擇異動單資料
              </Button>
            </InboundReturnStep2Form>
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

      <TicketSrcModal
        open={open}
        toggle={toggle}
        onOk={onOk}
        selectedRows={references}
      />
    </MainLayout>
  );
}

export default InboundReturnStepsForm;
