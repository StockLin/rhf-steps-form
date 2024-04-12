import { Button } from "antd";

interface StepFormButtonsProps {
  prevLabel?: string;
  nextLabel?: string;
  prev: () => void;
  next: () => void;
}

function StepFormButtons({
  prevLabel = "PREV",
  nextLabel = "NEXT",
  prev,
  next,
}: StepFormButtonsProps): JSX.Element {
  return (
    <div className="flex justify-center items-center gap-4">
      <Button className="w-[210px]" onClick={prev}>
        {prevLabel}
      </Button>
      <Button className="w-[210px]" type="primary" onClick={next}>
        {nextLabel}
      </Button>
    </div>
  );
}

export default StepFormButtons;
