import { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface IFormStep {
  title: string;
  fields: string[];
}

function useFormSteps<T extends FieldValues>(
  form: UseFormReturn<T>,
  formSteps: IFormStep[],
  onSubmit: () => Promise<void>
) {
  const navigate = useNavigate();

  const { trigger } = form;
  const [currentStep, setCurrentStep] = useState(0);

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    } else {
      navigate(-1);
    }
  };

  const nextStep = async () => {
    const fields = formSteps[currentStep].fields;
    const isValid = await trigger(fields as Path<T>[], { shouldFocus: true });

    if (!isValid) return;

    if (currentStep === formSteps.length - 1) {
      await onSubmit();
      return;
    }

    setCurrentStep((step) => step + 1);
  };

  return {
    currentStep,
    prevStep,
    nextStep,
  };
}

export default useFormSteps;
