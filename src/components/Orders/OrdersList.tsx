import { Stack, Box } from "@chakra-ui/react";
import type { OrderProps } from "../../hooks/types";
import Order from "./Order";

interface OrdersListProps {
  orders: OrderProps[];
}

const OrdersList = ({ orders }: OrdersListProps) => {
  if (!orders || orders.length === 0) {
    return <Box color="gray.500">No orders found.</Box>; // ✅ Box instead of Text
  }

  return (
    <Stack gap={6}>
      {orders.map((order) => (
        <Order key={order.id} {...order} />
      ))}
    </Stack>
  );
};

export default OrdersList;
