import React from "react";
import { Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import { retrieveFinishedOrders } from "./selector";
import { Order } from "../../../lib/types/order";
import OrderCard from "./OrderCard";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks";

export default function FinishedOrders() {
  const finishedOrders = useAppSelector(retrieveFinishedOrders);
  const history = useHistory();
  return (
    <TabPanel value={"3"}>
      <div className="customer-orders-panel">
        {finishedOrders.map((order: Order) => <OrderCard key={order._id} order={order} />)}
        {finishedOrders.length === 0 && <Box className="orders-empty"><strong>No completed orders yet</strong><span>Your completed purchases will appear here.</span><button type="button" onClick={() => history.push("/products")}>Browse menu</button></Box>}
      </div>
    </TabPanel>
  );
}
