import { Card } from "antd";
import { commonSchemaType } from "../../types";
import InfoItem from "../InfoItem";

interface AmendedOperationCardProps
  extends Pick<commonSchemaType, "date" | "categoryLabel" | "actionLabel"> {}

// 異動項目顯示
function AmendedOperationCard({
  date,
  categoryLabel,
  actionLabel,
}: AmendedOperationCardProps): JSX.Element {
  return (
    <Card title="異動作業確認">
      <div className="flex gap-4">
        <div className="flex-1">
          <InfoItem label="類別" value={categoryLabel} />
        </div>

        <div className="flex-1">
          <InfoItem label="操作" value={actionLabel} />
        </div>

        <div className="flex-1">
          <InfoItem label="異動日期" value={date} />
        </div>
      </div>
    </Card>
  );
}

export default AmendedOperationCard;
