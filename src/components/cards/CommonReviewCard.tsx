import { AmendedStockType, commonSchemaType } from "../../types";
import AmendedOperationCard from "./AmendedOperationCard";
import { Card } from "antd";
import AmendedStockCard from "./AmendedStockCard";

interface CommonReviewCardProps {
  amendedOperation: Pick<
    commonSchemaType,
    "date" | "categoryLabel" | "actionLabel"
  >;
  amenedStocks?: AmendedStockType[];

  // customers data
  // children
}

function CommonReviewCard({
  amendedOperation,
  amenedStocks = [],
}: CommonReviewCardProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      {/* TODO: 問題 when action=sale 需塞入表單欄位 */}

      <AmendedOperationCard
        date={amendedOperation.date}
        categoryLabel={amendedOperation.categoryLabel}
        actionLabel={amendedOperation.actionLabel}
      />

      {/* TODO: 問題 when action=sales 需塞入客戶資料卡片 children */}

      {/* amendedStock list */}
      <Card title="品號確認">
        <div className="flex flex-col gap-6">
          {amenedStocks.map((stock, index) => (
            <AmendedStockCard
              key={stock.id}
              title={`品號資料-${index}`}
              data={stock}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default CommonReviewCard;
