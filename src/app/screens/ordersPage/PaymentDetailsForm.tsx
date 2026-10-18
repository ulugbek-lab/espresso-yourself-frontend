import React from "react";
import { Button } from "@mui/material";

interface PaymentDetailsFormProps {
  onPay: () => void;
}

export default function PaymentDetailsForm({ onPay }: PaymentDetailsFormProps) {
  return (
    <section className="payment-details-panel payment-details-panel--embedded" aria-labelledby="payment-details-heading">
      <div className="payment-details-heading">
        <span>PAYMENT DETAILS</span>
        <h2 id="payment-details-heading">Payment details</h2>
      </div>
      <div className="payment-details-fields">
        <label>
          Cardholder name
          <input type="text" name="cardCreator" autoComplete="off" placeholder="Name on card" />
        </label>
        <label>
          Card number
          <input type="text" name="cardNumber" inputMode="numeric" autoComplete="off" placeholder="0000 0000 0000 0000" />
        </label>
        <div className="payment-details-split">
          <label>
            Expiry date
            <input type="text" name="cardPeriod" inputMode="numeric" autoComplete="off" placeholder="MM / YY" />
          </label>
          <label>
            CVV
            <input type="password" name="cardCVV" inputMode="numeric" autoComplete="off" placeholder="•••" />
          </label>
        </div>
      </div>
      <div className="payment-details-footer">
        <div className="payment-details-cards" aria-label="Accepted card types">
          <img src="/icons/western-card.svg" alt="" />
          <img src="/icons/master-card.svg" alt="" />
          <img src="/icons/paypal-card.svg" alt="" />
          <img src="/icons/visa-card.svg" alt="" />
        </div>
        <div className="payment-details-action"><p>Demo payment form — payment processing is not connected yet.</p><Button className="order-action order-action-primary" onClick={onPay}>Pay now</Button></div>
      </div>
    </section>
  );
}
