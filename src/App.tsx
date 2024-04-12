import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TicketCreatePage from "./pages/TicketCreatePage";
import InboundStepsForm from "./components/InboundStepsForm";
import InboundReturnStepsForm from "./components/InboundReturnStepsForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TicketCreatePage />,
  },
  {
    path: "/transactions/new/ticket-inbound",
    element: <InboundStepsForm />,
  },
  {
    path: "/transactions/new/ticket-inbound-return",
    element: <InboundReturnStepsForm />,
  },
  {
    path: "/transactions/new/ticket-sales",
    element: <div>ticket-sales</div>,
  },
  {
    path: "/transactions/new/ticket-transfer",
    element: <div>ticket-transfer</div>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
