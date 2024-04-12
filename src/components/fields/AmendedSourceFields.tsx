import { Card } from "antd";
import { AmendedStockType } from "../../types";
import AmendedStockField from "./AmendedStockField";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";

interface AmendedSourceFields {
  amendedStocks?: AmendedStockType[];
  children?: React.ReactNode;
}

function AmendedSourceFields({
  amendedStocks,
  children,
}: AmendedSourceFields): JSX.Element {
  const { getValues, setValue } = useFormContext();

  const onDeleteClick = (id: string) => {
    const amendedStocks = getValues("amendedStocks");

    const updatedAmendedStocks = amendedStocks.filter(
      (stock: AmendedStockType) => stock.id !== id
    );

    setValue("amendedStocks", updatedAmendedStocks);
  };

  return (
    <Card title="選擇品號">
      {amendedStocks?.map((stock, index) => (
        <AmendedStockField
          key={stock?.id}
          title={`品號 ${index + 1}`}
          amendedStock={stock}
          namePrefix={`amendedStocks.${index}`}
          extras={[
            <Button
              size="small"
              danger
              type="text"
              className="bg-red-50 text-red-300"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteClick(stock.id)}
            />,
          ]}
        />
      ))}

      {children}
    </Card>
  );
}

export default AmendedSourceFields;
