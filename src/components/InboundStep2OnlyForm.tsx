import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import AmendedSourceFields from "./fields/AmendedSourceFields";
import AmendedDateField from "./fields/AmendedDateField";

interface InboundStep2OnlyFormProps {
  children?: React.ReactNode;
}

function InboundStep2OnlyForm({
  children,
}: InboundStep2OnlyFormProps): JSX.Element {
  const { control } = useFormContext();

  const amendedStocks = useWatch({ name: "amendedStocks", control }) || [];

  return (
    <div className="flex flex-col gap-4">
      <AmendedDateField control={control} />

      <AmendedSourceFields amendedStocks={amendedStocks}>
        {children}
      </AmendedSourceFields>
    </div>
  );
}

export default InboundStep2OnlyForm;
