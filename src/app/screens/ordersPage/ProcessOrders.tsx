import { Box, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import { retrieveProcessOrders } from "./selector";
import { Messages } from "../../../lib/config";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderCard from "./OrderCard";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks";

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const processOrders = useAppSelector(retrieveProcessOrders);

  /** HANDLERS */
  const history = useHistory();
  const finishOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      // PAYMENT PROCESS

      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const comfirmation = window.confirm("Have u received your order?");
      if (comfirmation) {
        const order = new OrderService();
        await order.updateOrder(input);

        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"}>
      <div className="customer-orders-panel">
        {processOrders.map((order: Order) => <OrderCard key={order._id} order={order}><Button className="order-action order-action-primary" onClick={() => finishOrderHandler(order._id)}>Confirm received</Button></OrderCard>)}
        {processOrders.length === 0 && <Box className="orders-empty"><strong>No preparing orders yet</strong><span>Orders being prepared will appear here.</span><button type="button" onClick={() => history.push("/products")}>Browse menu</button></Box>}
      </div>
    </TabPanel>
  );
}
