import { AmendedStockType, ReferenceType } from "../types";
import { StockTypeEnum, StockUnitTypeEnum } from "../const";

function useRefsToAmendedStocks(stockType: StockTypeEnum) {
  // 將modal選擇的NameSource or TicketSource 轉換成AmendedStocks
  const processRefsToAmendedStocks = (
    data: ReferenceType[],
    previoustData: AmendedStockType[]
  ): AmendedStockType[] => {
    const updatedStocks: AmendedStockType[] = data?.map((current) => {
      const targetId = current.batchId || current.id;

      const existedStock = previoustData.find(
        (stock) => stock?.reference?.id === current.id
      );

      if (existedStock) return existedStock;

      return {
        id: current.id,
        targetId,
        stockType, // TODO: 依照不同的form, ex SaleStepsForm 則為出庫outbound
        stockUnitType: StockUnitTypeEnum.GROUP, // 預設值待部門
        stockUnitId: null,
        stockCategoryId: null,
        quantity: null,
        reference: current,

        stockUnitLabel: "",
        stockCategoryLabel: "",
      };
    });

    return updatedStocks;
  };

  return {
    processRefsToAmendedStocks,
  };
}

export default useRefsToAmendedStocks;
