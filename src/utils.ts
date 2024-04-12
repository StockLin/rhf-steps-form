import { StockTypeEnum } from "./const";
import { IFormStep } from "./hooks/useFormSteps";

export const getStockTypeLabel = (stockType?: StockTypeEnum): string => {
  switch (stockType) {
    case StockTypeEnum.INBOUND:
      return "入庫";
    case StockTypeEnum.OUTBOUND:
      return "出庫";
    case StockTypeEnum.ADJUSTED:
      return "調整";
    default:
      return "";
  }
};

export const getFormSteps = (
  alternativeSecondStep: IFormStep = {
    title: "異動作業",
    fields: ["date", "amendedStocks"],
  }
) => {
  const steps: IFormStep[] = [
    {
      title: "異動項目",
      fields: ["category", "action"],
    },
    alternativeSecondStep,
    {
      title: "其他資訊",
      fields: ["note"],
    },
    {
      title: "異動確認",
      fields: [],
    },
  ];

  return steps;
};

