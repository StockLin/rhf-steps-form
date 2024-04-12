
export interface IOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export enum StockTypeEnum {
  OUTBOUND = "outbound",
  INBOUND = "inbound",
  ADJUSTED = "adjusted",
}

export enum StockUnitTypeEnum {
  GROUP = "group",
  STORE = "store",
}

// transactional category
export enum TransactionalCategoryEnum {
  INBOUND = "inbound", // 入庫
  SALES = "sales", // 銷售
  // WITHDRAW = "withdraw", // 領用
  TRANSFER = "transfer", // 轉撥
  // ADJUSTMENT = "adjustment", // 調整
}

export const transactionalCategoryMap: { [key: string]: IOption } = {
  [TransactionalCategoryEnum.INBOUND]: {
    label: "入庫",
    value: TransactionalCategoryEnum.INBOUND,
    disabled: false,
  },
  [TransactionalCategoryEnum.SALES]: {
    label: "銷售",
    value: TransactionalCategoryEnum.SALES,
    disabled: false,
  },
  // [TransactionalCategoryEnum.WITHDRAW]: {
  //   label: "領用",
  //   value: TransactionalCategoryEnum.WITHDRAW,
  //   disabled: false,
  // },
  [TransactionalCategoryEnum.TRANSFER]: {
    label: "轉撥",
    value: TransactionalCategoryEnum.TRANSFER,
    disabled: false,
  },
  // [TransactionalCategoryEnum.ADJUSTMENT]: {
  //   label: "調整",
  //   value: TransactionalCategoryEnum.ADJUSTMENT,
  //   disabled: false,
  // },
};

export const transactionalCategoryOptions: IOption[] = Object.values(transactionalCategoryMap);

// transactional actions
export enum TransactionalActionEnum {
  // category: inbound
  INBOUND = "inbound", // 進貨
  INBOUND_RETURN = "inbound_return", // 退貨

  // category: sales
  SALES = "sales", // 銷貨
  SALES_RETURN = "sales_return", // 銷退

  // category: withdraw
  // WITHDRAW = "withdraw", // 領用
  // WITHDRAW_RETURN = "withdraw_return", // 領用歸還
  // WITHDRAW_LEND = "withdraw_lend", // 借出
  // WITHDRAW_LEND_RETURN = "withdraw_lend_return", // 借出歸還
  // WITHDRAW_BORROW = "withdraw_borrow", // 借入
  // WITHDRAW_BORROW_RETURN = "withdraw_borrow_return", // 借入歸還

  // category: transfer
  TRANSFER = "transfer", // 轉撥

  // category: adjustment
  // ADJUSTMENT_INVENTORY_CHECK = "adjustment_inventory_check", // 盤點
  // ADJUSTMENT_SCRAP = "adjustment_scrap", // 報廢
  // ADJUSTMENT_OTHERS = "adjustment_others" // 其他調整
}

export const transactionalActionMap: { [key: string]: IOption } = {
  // category: inbound
  [TransactionalActionEnum.INBOUND]: {
    label: "進貨",
    value: TransactionalActionEnum.INBOUND,
    disabled: false,
  },
  [TransactionalActionEnum.INBOUND_RETURN]: {
    label: "退貨",
    value: TransactionalActionEnum.INBOUND_RETURN,
    disabled: false,
  },

  // category: sales
  [TransactionalActionEnum.SALES]: {
    label: "銷貨",
    value: TransactionalActionEnum.SALES,
    disabled: false,
  },
  [TransactionalActionEnum.SALES_RETURN]: {
    label: "銷退",
    value: TransactionalActionEnum.SALES_RETURN,
    disabled: false,
  },

  // category: withdraw
  // [TransactionalActionEnum.WITHDRAW]: {
  //   label: "領用",
  //   value: TransactionalActionEnum.WITHDRAW,
  //   disabled: false,
  // },
  // [TransactionalActionEnum.WITHDRAW_RETURN]: {
  //   label: "領用歸還",
  //   value: TransactionalActionEnum.WITHDRAW_RETURN,
  //   disabled: false,
  // },
  // [TransactionalActionEnum.WITHDRAW_LEND]: {
  //   label: "借出",
  //   value: TransactionalActionEnum.WITHDRAW_LEND,
  //   disabled: false,
  // },
  // [TransactionalActionEnum.WITHDRAW_LEND_RETURN]: {
  //   label: "借出歸還",
  //   value: TransactionalActionEnum.WITHDRAW_LEND_RETURN,
  //   disabled: false,
  // },
  // [TransactionalActionEnum.WITHDRAW_BORROW]: {
  //   label: "借入",
  //   value: TransactionalActionEnum.WITHDRAW_BORROW,
  //   disabled: false,
  // },
  // [TransactionalActionEnum.WITHDRAW_BORROW_RETURN]: {
  //   label: "借入歸還",
  //   value: TransactionalActionEnum.WITHDRAW_BORROW_RETURN,
  //   disabled: false,
  // },

  // category: transfer
  [TransactionalActionEnum.TRANSFER]: {
    label: "轉撥",
    value: TransactionalActionEnum.TRANSFER,
    disabled: false,
  },

  // category: adjustment
  // [TransactionalActionEnum.ADJUSTMENT_INVENTORY_CHECK]: {
  //   label: "盤點",
  //   value: TransactionalActionEnum.ADJUSTMENT_INVENTORY_CHECK,
  //   disabled: false,
  // },
  // [TransactionalActionEnum.ADJUSTMENT_SCRAP]: {
  //   label: "報廢",
  //   value: TransactionalActionEnum.ADJUSTMENT_SCRAP,
  //   disabled: false,
  // },
  // [TransactionalActionEnum.ADJUSTMENT_OTHERS]: {
  //   label: "其他調整",
  //   value: TransactionalActionEnum.ADJUSTMENT_OTHERS,
  //   disabled: false,
  // },
}

// list all action options
export const transactionalActionOptions: IOption[] = Object.values(transactionalActionMap);

// action options by category
export const transactionalActionOptionMap: Record<TransactionalCategoryEnum, IOption[]> = {
  [TransactionalCategoryEnum.INBOUND]: [
    transactionalActionMap[TransactionalActionEnum.INBOUND],
    transactionalActionMap[TransactionalActionEnum.INBOUND_RETURN],
  ],
  [TransactionalCategoryEnum.SALES]: [
    transactionalActionMap[TransactionalActionEnum.SALES],
    transactionalActionMap[TransactionalActionEnum.SALES_RETURN],
  ],
  // [TransactionalCategoryEnum.WITHDRAW]: [
  //   transactionalActionMap[TransactionalActionEnum.WITHDRAW],
  //   transactionalActionMap[TransactionalActionEnum.WITHDRAW_RETURN],
  //   transactionalActionMap[TransactionalActionEnum.WITHDRAW_LEND],
  //   transactionalActionMap[TransactionalActionEnum.WITHDRAW_LEND_RETURN],
  //   transactionalActionMap[TransactionalActionEnum.WITHDRAW_BORROW],
  //   transactionalActionMap[TransactionalActionEnum.WITHDRAW_BORROW_RETURN],
  // ],
  [TransactionalCategoryEnum.TRANSFER]: [
    transactionalActionMap[TransactionalActionEnum.TRANSFER],
  ],
  // [TransactionalCategoryEnum.ADJUSTMENT]: [
  //   transactionalActionMap[TransactionalActionEnum.ADJUSTMENT_INVENTORY_CHECK],
  //   transactionalActionMap[TransactionalActionEnum.ADJUSTMENT_SCRAP],
  //   transactionalActionMap[TransactionalActionEnum.ADJUSTMENT_OTHERS],
  // ]
}


export const stockUnitTypeOptions: IOption[] = [
  { label: "部門", value: "group" },
  { label: "門市", value: "store" },
]

export const groupOptions: IOption[] = [
  { label: "財會部", value: "1" },
  { label: "行銷部", value: "2" },
  { label: "營運部", value: "3" },
];

export const storeOptions: IOption[] = [
  { label: "台北門市", value: "1" },
  { label: "新竹門市", value: "2" },
  { label: "台中門市", value: "3" },
];


export const stockOptions: IOption[] = [
  { label: "良品倉", value: "1" },
  { label: "不良品倉", value: "2" },
];