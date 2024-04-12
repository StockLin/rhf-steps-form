import { z } from "zod";
import { amendedStockSchema, commonSchema, referenceSchema } from "./schema";

export interface INameBatchSrc {
  id: string;
  batchId: string | null;
  status: string;
  name: string;
  code: string;
  specification: string;
  unit: string;
  batchEnabled: boolean;
  batchStatus: boolean | null;
  batchNumber: string;
  price: number | null;
}

export interface ITicketSrc extends INameBatchSrc {
  serialNumber: string; // 異動單號
  date: string; // 異動日期
  remainingQuantity: number; // 可退數量
}

export type commonSchemaType = z.infer<typeof commonSchema>;

export type ReferenceType = z.infer<typeof referenceSchema>

export type AmendedStockType = z.infer<typeof amendedStockSchema>;
