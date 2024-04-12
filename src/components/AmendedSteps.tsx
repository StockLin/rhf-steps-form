import { Steps } from "antd";

interface AmendedStepsProps {
  steps: string[];
  currentStep: number;
}

function AmendedSteps({ steps, currentStep }: AmendedStepsProps): JSX.Element {
  return (
    <Steps
      current={currentStep}
      items={steps.map((step) => ({ title: step }))}
    />
  );
}

export default AmendedSteps;
