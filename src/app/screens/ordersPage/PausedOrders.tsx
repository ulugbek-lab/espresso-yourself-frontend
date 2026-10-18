import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import { retrievePausedOrders } from "./selector";
import { Messages } from "../../../lib/config";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import OrderCard from "./OrderCard";
import { useHistory } from "react-router-dom";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { ChevronDown } from "lucide-react";
import { useAppSelector } from "../../hooks";

interface PausedOrdersProps {
  setValue: (input: string) => void;
}
export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const pausedOrders = useAppSelector(retrievePausedOrders);
  const { authMember, setOrderBuilder } = useGlobals();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  /** HANDLERS */
  const history = useHistory();
  const deleteOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const comfirmation = window.confirm("Do you want to delete the order?");
      if (comfirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
        //ORDER REBUILD
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const processOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      // PAYMENT PROCESS

      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const comfirmation = window.confirm(
        "Do you want to process with payment?",
      );
      if (comfirmation) {
        const order = new OrderService();
        await order.updateOrder(input);

        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      {pausedOrders.length !== 0 ? (
        <div className="customer-orders-panel">
          {pausedOrders.map((order: Order) => {
            const isExpanded = expandedOrderId === order._id;
            return <OrderCard key={order._id} order={order} paymentDetails={isExpanded ? <PaymentDetailsForm onPay={() => processOrderHandler(order._id)} /> : undefined}><Button className="order-action order-action-secondary" onClick={() => deleteOrderHandler(order._id)}>Cancel order</Button><Button className="order-payment-toggle" onClick={() => setExpandedOrderId(isExpanded ? null : order._id)} aria-expanded={isExpanded}>Payment details <ChevronDown size={16} className={isExpanded ? "is-open" : ""} /></Button></OrderCard>;
          })}
        </div>
      ) : <Box className="orders-empty"><strong>No pending orders yet</strong><span>Your orders will appear here once you place them.</span><button type="button" onClick={() => history.push("/products")}>Browse menu</button></Box>}
    </TabPanel>
  );
}
