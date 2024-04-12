import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import AmendedSourceFields from "./fields/AmendedSourceFields";
import AmendedDateField from "./fields/AmendedDateField";

interface InboundReturnStep2OnlyFormProps {
  children?: React.ReactNode;
}

function InboundReturnStep2OnlyForm({
  children,
}: InboundReturnStep2OnlyFormProps): JSX.Element {
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

export default InboundReturnStep2OnlyForm;
