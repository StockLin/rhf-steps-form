import { useEffect, useState } from "react";
import CommonStep1Form, {
  CommonStep1FormType,
} from "../components/CommonStep1Form";
import { useNavigate } from "react-router-dom";
import { TransactionalActionEnum } from "../const";
import MainLayout from "../layouts/MainLayout";

function TicketCreatePage() {
  const navigate = useNavigate();

  const [commonForm1Data, setCommonForm1Data] =
    useState<CommonStep1FormType | null>(null);

  useEffect(() => {
    // TODO: 依照action redirect 到對應的form page
    const { category, action, categoryLabel, actionLabel } =
      commonForm1Data || {};

    const query = `category=${category}&action=${action}&categoryLabel=${categoryLabel}&actionLabel=${actionLabel}`;

    if (action && action === TransactionalActionEnum.INBOUND) {
      navigate(`/transactions/new/ticket-inbound?${query}`);
    }

    if (action && action === TransactionalActionEnum.INBOUND_RETURN) {
      navigate(`/transactions/new/ticket-inbound-return?${query}`);
    }

    if (action && action === TransactionalActionEnum.SALES) {
      navigate(`/transactions/new/ticket-sales?${query}`);
    }

    if (action && action === TransactionalActionEnum.TRANSFER) {
      navigate(`/transactions/new/ticket-transfer?${query}`);
    }
  }, [commonForm1Data, navigate]);

  const onCommonForm1Submit = (formData: CommonStep1FormType) => {
    setCommonForm1Data(formData);
  };

  return (
    <MainLayout>
      <div className="w-full">
        <CommonStep1Form onSubmit={onCommonForm1Submit} />
      </div>
    </MainLayout>
  );
}

export default TicketCreatePage;
