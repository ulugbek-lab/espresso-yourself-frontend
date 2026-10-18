import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import "../../../css/order.css";
import { useAppDispatch } from "../../hooks";

const baseOrderInquiry: OrderInquiry = {
  page: 1,
  limit: 5,
  orderStatus: OrderStatus.PAUSE,
};

export default function OrdersPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { orderBuilder, authMember } = useGlobals();
  const [value, setValue] = useState("1");
  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...baseOrderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => dispatch(setPausedOrders(data)))
      .catch((err) => console.log(err));
    order
      .getMyOrders({ ...baseOrderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => {
        dispatch(setProcessOrders(data));
      })
      .catch((err) => console.log(err));
    order
      .getMyOrders({ ...baseOrderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => dispatch(setFinishedOrders(data)))
      .catch((err) => console.log(err));
  }, [dispatch, orderBuilder]);

  /** HANDLERS */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  if (!authMember) history.push("/");

  return (
    <div className={"order-page"}>
      <Container className="orders-history-container">
        <header className="orders-history-header">
          <span>YOUR ORDERS</span>
          <h1>Order history</h1>
          <p>Track current orders and review your previous purchases.</p>
        </header>
        <Stack className={"orders-history-content"}>
          <TabContext value={value}>
            <Box className={"orders-status-nav"}>
              <Tabs value={value} onChange={handleChange} aria-label="Order status" variant="scrollable" scrollButtons={false}>
                <Tab label="Pending" value={"1"} />
                <Tab label="Preparing" value={"2"} />
                <Tab label="Completed" value={"3"} />
              </Tabs>
            </Box>
            <Stack className={"orders-history-list"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
