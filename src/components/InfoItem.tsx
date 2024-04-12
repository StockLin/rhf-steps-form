/* eslint-disable @typescript-eslint/no-explicit-any */

interface InfoItemProps {
  label: string;
  value: any;
}

function InfoItem({ label, value }: InfoItemProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <span className=" text-gray-400">{label}</span>
      {value}
    </div>
  );
}

export default InfoItem;
