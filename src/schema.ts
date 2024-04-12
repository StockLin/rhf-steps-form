import { z } from "zod";
import {
  StockTypeEnum,
  StockUnitTypeEnum,
  TransactionalActionEnum,
  TransactionalCategoryEnum,
} from "./const";

const commonForm1SchemaObject = {
  category: z.nativeEnum(TransactionalCategoryEnum, {
    invalid_type_error: "請選擇類別",
    required_error: "必填",
  }),
  action: z.union([z.nativeEnum(TransactionalActionEnum), z.null()]),
  categoryLabel: z.string().optional(),
  actionLabel: z.string().optional(),
};

export const commonForm1Schema = z
  .object(commonForm1SchemaObject)
  .refine((value) => !!value?.action, {
    path: ["action"],
    message: "必填",
  });

const commonSchemaObject = {
  ...commonForm1SchemaObject,
  date: z.string({ required_error: "必填" }).min(1, "必填"),
  note: z.string().optional(),
};

export const commonSchema = z
  .object(commonSchemaObject)
  .refine((value) => !!value?.action, {
    path: ["action"],
    message: "必填",
  });

export const referenceSchema = z.object({
  id: z.coerce.string(),
  batchId: z.coerce.string(),

  code: z.coerce.string().optional(),
  batchNumber: z.coerce.string().optional(),
  name: z.coerce.string().optional(),
  specification: z.coerce.string().optional(),
  unit: z.coerce.string().optional(),
  price: z.coerce.number().nullable().optional(),

  date: z.coerce.string().optional(),
  serialNumber: z.coerce.string().nullable().optional(),
  remainingQuantity: z.coerce.number().nullable().optional(),
});

const amendedStockSchemaObject = {
  id: z.string().min(1, "必填"),
  targetId: z.string().min(1, "必填"),

  stockType: z.nativeEnum(StockTypeEnum), // 庫存類型 出庫/入庫/調整
  stockUnitType: z.nativeEnum(StockUnitTypeEnum), // 庫存單位類型 部門/門市
  stockUnitId: z.union([z.string().min(1, "必填"), z.null()]),
  stockCategoryId: z.union([z.string().min(1, "必填"), z.null()]), // 庫別
  quantity: z.union([z.coerce.number().min(1, "必填"), z.null()]),
  reference: referenceSchema,

  // for review step display
  stockUnitLabel: z.coerce.string(), // 部門/門市 顯示名稱
  stockCategoryLabel: z.coerce.string(), // 庫別 顯示名稱
};

export const amendedStockSchema = z
  .object(amendedStockSchemaObject)
  .refine((value) => !!value?.stockUnitId, {
    path: ["stockUnitId"],
    message: "必填",
  })
  .refine((value) => !!value?.stockCategoryId, {
    path: ["stockCategoryId"],
    message: "必填",
  })
  .refine((value) => !!value?.quantity, {
    path: ["quantity"],
    message: "必填",
  });

export const inboundSchema = z.object({
  ...commonSchemaObject,

  // step2 form fields for inbound
  amendedStocks: z.array(amendedStockSchema).min(1, "必填"),
});

// const amendedStockSchemaOnlyActionTransfer = z.object({
//   ...amendedStockSchemaObject,

//   // TODO: when action = transfer, 要多一組欄位
//   secondaryStockType: z.nativeEnum(StockTypeEnum), // only 入庫
//   secondaryStockUnitType: z.nativeEnum(StockUnitTypeEnum),
//   secondaryStockUnitId: z.coerce.string().min(1, "必填"),

//   // for review step display
//   stockUnit: z.string(),
// })
