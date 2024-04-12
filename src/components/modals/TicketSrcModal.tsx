import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { ITicketSrc, ReferenceType } from "../../types";
import { ticketSrcMockData } from "../../mockData";

const columns: ProColumns<ITicketSrc>[] = [
  {
    dataIndex: "serialNumber",
    title: "異動單號",
    valueType: "text",
  },
  {
    dataIndex: "date",
    title: "異動日期",
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
    dataIndex: "batchNumber",
    title: "批號",
    valueType: "text",
  },
  {
    dataIndex: "remainingQuantity",
    title: "可退數量",
    valueType: "text",
  },
];

interface TicketSrcModalProps {
  open: boolean;
  toggle: (open: boolean) => void;
  selectedRows?: ReferenceType[];
  onOk: (selectedRowKeys: ReferenceType[]) => void;
}

function TicketSrcModal({
  open,
  toggle,
  selectedRows = [],
  onOk,
}: TicketSrcModalProps): JSX.Element {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

        const newSrc: ITicketSrc = ticketSrcMockData.find(
          (row) => row.id === key
        ) as ITicketSrc;

        return {
          id: newSrc.id,
          batchId: "",
          batchNumber: newSrc.batchNumber,
          code: newSrc.code,
          name: newSrc.name,
          specification: newSrc.specification,
          unit: newSrc.unit,
          price: newSrc.price,
          date: newSrc.date,
          serialNumber: newSrc.serialNumber,
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
        dataSource={ticketSrcMockData}
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

export default TicketSrcModal;
