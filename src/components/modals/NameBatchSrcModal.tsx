import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { INameBatchSrc, ReferenceType } from "../../types";
import { nameBatchMockData } from "../../mockData";

const columns: ProColumns<INameBatchSrc>[] = [
  {
    dataIndex: "status",
    title: "狀態",
    valueType: "text",
  },
  {
    dataIndex: "name",
    title: "品名",
    valueType: "text",
  },
  {
    dataIndex: "code",
    title: "品號",
    valueType: "text",
  },
  {
    dataIndex: "specification",
    title: "規格",
    valueType: "text",
  },
  {
    dataIndex: "unit",
    title: "單位",
    valueType: "text",
  },
  {
    dataIndex: "batchEnabled",
    title: "是否啟用批號",
    valueType: "text",
    render: (_, row) =>
      row.batchEnabled ? <span className="text-green-500">是</span> : "否",
  },
  {
    dataIndex: "batchStatus",
    title: "批號狀態",
    valueType: "text",
    render: (_, row) =>
      row.batchStatus ? (
        <span className="text-green-500">已啟用</span>
      ) : (
        "未啟用"
      ),
  },
  {
    dataIndex: "batchNumber",
    title: "批號",
    valueType: "text",
  },
  {
    dataIndex: "price",
    title: "價格",
    valueType: "text",
  },
];

interface NameBatchSrcModalProps {
  open: boolean;
  toggle: (open: boolean) => void;
  selectedRows?: ReferenceType[];
  onOk: (selectedRowKeys: ReferenceType[]) => void;
}

function NameBatchSrcModal({
  open,
  toggle,
  selectedRows = [],
  onOk,
}: NameBatchSrcModalProps): JSX.Element {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // TODO: 問題 selectRows發生變化時，直接assign line 76 沒有update
  useEffect(() => {
    setSelectedRowKeys(selectedRows?.map((row) => row.id) || []);
  }, [selectedRows]);

  const onModalOk = () => {
    const updatedRows: ReferenceType[] = Object.keys(selectedRowKeys).map(
      (key) => {
        const selectedRow = selectedRows?.find((row) => row.id === key);
        if (selectedRow) {
          return selectedRow;
        }

        const newSrc: INameBatchSrc = nameBatchMockData.find(
          (row) => row.id === key
        ) as INameBatchSrc;

        return {
          id: newSrc.id,
          batchId: newSrc.batchId || "",
          batchNumber: newSrc.batchNumber,
          code: newSrc.code,
          name: newSrc.name,
          specification: newSrc.specification,
          unit: newSrc.unit,
          price: newSrc.price,
          serialNumber: "",
          remainingQuantity: null,
        };
      }
    );

    onOk(updatedRows);
    toggle(false);
  };

  return (
    <Modal
      className="!w-[1000px]"
      open={open}
      onCancel={() => toggle(false)}
      onOk={onModalOk}
    >
      <ProTable
        rowKey="id"
        columns={columns}
        dataSource={nameBatchMockData}
        search={false}
        pagination={{
          pageSize: 5,
        }}
        rowSelection={{
          selectedRowKeys,
          onChange(selectedRowKeys) {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
      />
      {/* ubtton */}
    </Modal>
  );
}

export default NameBatchSrcModal;
