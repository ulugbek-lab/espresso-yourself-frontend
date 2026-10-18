import React from "react";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { OrderStatus } from "../../../lib/enums/order.enum";

interface OrderCardProps {
  order: Order;
  children?: React.ReactNode;
  paymentDetails?: React.ReactNode;
}

const statusLabel: Record<OrderStatus, string> = {
  [OrderStatus.PAUSE]: "Pending",
  [OrderStatus.PROCESS]: "Preparing",
  [OrderStatus.FINISH]: "Completed",
  [OrderStatus.DELETE]: "Cancelled",
};

const formatPrice = (price: number) => `$${price.toLocaleString()}`;
const formatDate = (date: Date) => new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));

export default function OrderCard({ order, children, paymentDetails }: OrderCardProps) {
  const visibleId = order._id.slice(-6).toUpperCase();
  const itemCount = order.orderItems.reduce((total, item) => total + item.itemQuantity, 0);

  return (
    <article className="customer-order-card">
      <header className="customer-order-card-header">
        <div>
          <span className="customer-order-id">Order #{visibleId}</span>
          <span className="customer-order-date">Placed {formatDate(order.createdAt)}</span>
        </div>
        <span className={`customer-order-status customer-order-status--${order.orderStatus.toLowerCase()}`}>{statusLabel[order.orderStatus]}</span>
      </header>

      <div className="customer-order-items">
        {order.orderItems.map((item: OrderItem) => {
          const product = order.productData.find((entry: Product) => entry._id === item.productId);
          const productDetails = [product?.productSize, product?.productVolume].filter(Boolean).join(" · ");
          return (
            <div className="customer-order-item" key={item._id}>
              {product?.productImages?.[0] ? <img src={product.productImages[0]} alt={product.productName} /> : <div className="customer-order-item-placeholder" aria-hidden="true" />}
              <div className="customer-order-item-info">
                <span>{product?.productName ?? "Menu item"}</span>
                {productDetails && <small>{productDetails}</small>}
              </div>
              <div className="customer-order-item-price">
                <span>Qty {item.itemQuantity}</span>
                <strong>{formatPrice(item.itemQuantity * item.itemPrice)}</strong>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="customer-order-summary">
        <div className="customer-order-summary-copy"><span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>{order.orderDelivery > 0 && <small>Delivery {formatPrice(order.orderDelivery)}</small>}</div>
        <div className="customer-order-total"><span>Total</span><strong>{formatPrice(order.orderTotal)}</strong></div>
        {children && <div className="customer-order-actions">{children}</div>}
      </footer>
      {paymentDetails && <div className="customer-order-payment">{paymentDetails}</div>}
    </article>
  );
}
