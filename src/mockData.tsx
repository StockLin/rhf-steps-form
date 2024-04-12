import { INameBatchSrc, ITicketSrc } from "./types";

export const nameBatchMockData: INameBatchSrc[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: String(i),
    batchId: i % 2 === 0 ? String(`B-${i}`) : null,
    status: "status",
    name: `name-${i}`,
    code: `code-${i}`,
    specification: `specification-${i}`,
    unit: "unit",
    batchEnabled: i % 2 === 0 ? true : false,
    batchStatus: i % 2 === 0 ? true : false,
    batchNumber: i % 2 === 0 ? `batchNumber-${i}` : "",
    price: Math.floor(Math.random() * 1000) + 1,
  })
);

export const ticketSrcMockData: ITicketSrc[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: i.toString(),
    serialNumber: `serialNumber-${i}`,
    date: "2024-01-01",
    batchId: i % 2 === 0 ? String(`B-${i}`) : null,
    status: "status",
    name: `name-${i}`,
    code: `code-${i}`,
    specification: `specification-${i}`,
    unit: `unit-${i}`,
    batchEnabled: i % 2 === 0 ? true : false,
    batchStatus: i % 2 === 0 ? true : false,
    batchNumber: i % 2 === 0 ? `batchNumber-${i}` : "",
    price: Math.floor(Math.random() * 1000) + 1,
    remainingQuantity: Math.floor(Math.random() * 100) + 1,
  })
);
