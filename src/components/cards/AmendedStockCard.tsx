import { AmendedStockType } from "../../types";
import InfoItem from "../InfoItem";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { getStockTypeLabel } from "../../utils";
import { StockUnitTypeEnum } from "../../const";

interface AmendedStockCardProps {
  title?: string;
  onEdit?: () => void;
  data?: AmendedStockType;
}

function AmendedStockCard({
  title = "品號資料",
  onEdit,
  data,
}: AmendedStockCardProps): JSX.Element {
  const {
    reference,
    quantity,
    stockType,
    stockUnitType,
    stockUnitLabel,
    stockCategoryLabel,
  } = data || {};

  const stockTypeLabel = getStockTypeLabel(stockType);

  const stockUnitTitle = `${stockTypeLabel}${
    stockUnitType === StockUnitTypeEnum.GROUP ? "部門" : "門市"
  }`;

  const stockCategoryTitle = `${stockTypeLabel}庫別`;

  return (
    <div className="flex flex-col gap-4 pb-8 border-b-[0.5px] border-gray-300">
      {/* title */}
      <div className="flex items-center gap-4">
        <h3 className="text-xl text-gray-500">{title}</h3>
        <Button
          className="bg-gray-100 text-gray-400 hover:bg-gray-200"
          size="small"
          type="text"
          icon={<EditOutlined />}
          onClick={onEdit}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6">
        {reference?.serialNumber && (
          <InfoItem label="異動編號" value={reference?.serialNumber} />
        )}
        <InfoItem label="品號" value={reference?.code} />
        <InfoItem label="批號" value={reference?.name} />
        <InfoItem label="品名" value={reference?.name} />
        <InfoItem label="規格" value={reference?.specification} />
        <InfoItem label="單位" value={reference?.unit} />
      </div>

      <div className="flex flex-col gap-4 px-6">
        <InfoItem label="數量" value={quantity} />

        <div className="grid grid-cols-2 gap-4">
          <InfoItem label={stockUnitTitle} value={stockUnitLabel} />
          <InfoItem label={stockCategoryTitle} value={stockCategoryLabel} />

          {/* TODO: 問題 when action=transfer 會需要多顯示一組 入庫部門or門市資訊 */}
        </div>
      </div>
    </div>
  );
}

export default AmendedStockCard;
