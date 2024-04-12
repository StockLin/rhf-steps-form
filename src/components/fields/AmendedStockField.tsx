import { useFormContext } from "react-hook-form";
import { AmendedStockType } from "../../types";
import InputField from "./InputField";
import RadioField from "./RadioField";
import {
  StockUnitTypeEnum,
  groupOptions,
  stockOptions,
  stockUnitTypeOptions,
  storeOptions,
} from "../../const";
import StockSelectField from "./StockSelectField";
import GroupSelectField from "./GroupSelectField";
import StoreSelectField from "./StoreSelectField";
import InfoItem from "../InfoItem";
import { getStockTypeLabel } from "../../utils";

interface AmendedStockFieldProps {
  title: string;
  amendedStock: AmendedStockType;
  namePrefix: string;
  extras?: React.ReactNode[];
}

function AmendedStockField({
  title,
  amendedStock,
  namePrefix,
  extras,
}: AmendedStockFieldProps): JSX.Element {
  const { control, setValue } = useFormContext();
  const stockUnitIdName = `${namePrefix}.stockUnitId`;

  const { reference, stockType, stockUnitType } = amendedStock;
  const stockTypeLabel = getStockTypeLabel(stockType);

  const onStockUnitChange = (value: string) => {
    const targetOptions =
      stockUnitType === StockUnitTypeEnum.GROUP ? groupOptions : storeOptions;

    const unitLabel = targetOptions.find(
      (group) => group.value === value
    )?.label;

    if (unitLabel) {
      setValue(`${namePrefix}.stockUnitLabel`, unitLabel);
    }
  };

  const onStockCategoryChange = (value: string) => {
    const categoryLabel = stockOptions.find(
      (stock) => stock.value === value
    )?.label;

    if (categoryLabel) {
      setValue(`${namePrefix}.stockCategoryLabel`, categoryLabel);
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex justify-between gap-4 items-center">
        <h3 className=" text-xl text-gray-500">{title}</h3>
        {extras}
      </div>
      {/* name information */}
      <div className="grid grid-cols-5 gap-4">
        {/* 當source=ticket時，會有單號資料 */}
        {reference.serialNumber && (
          <InfoItem label="序號" value={reference.serialNumber} />
        )}

        <InfoItem label="品名" value={reference.name} />
        <InfoItem label="品號" value={reference.code} />
        <InfoItem label="規格" value={reference.specification} />
        <InfoItem label="單位" value={reference.unit} />

        {reference.batchNumber && (
          <InfoItem label="批號" value={reference.batchNumber} />
        )}
      </div>

      {/* rest form inputs */}
      <div>
        <InputField
          label="數量"
          name={`${namePrefix}.quantity`}
          control={control}
        />
        <RadioField
          label="單位"
          name={`${namePrefix}.stockUnitType`}
          control={control}
          options={stockUnitTypeOptions}
          onChange={() => {
            setValue(stockUnitIdName, null);
          }}
        />

        <div className="flex gap-4">
          {stockUnitType === StockUnitTypeEnum.GROUP && (
            <GroupSelectField
              label={`${stockTypeLabel}部門`}
              name={stockUnitIdName}
              control={control}
              onChange={onStockUnitChange}
            />
          )}

          {stockUnitType === StockUnitTypeEnum.STORE && (
            <StoreSelectField
              label={`${stockTypeLabel}門市`}
              name={stockUnitIdName}
              control={control}
              onChange={onStockUnitChange}
            />
          )}

          <StockSelectField
            label={`${stockTypeLabel}庫別`}
            name={`${namePrefix}.stockCategoryId`}
            control={control}
            onChange={onStockCategoryChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AmendedStockField;
