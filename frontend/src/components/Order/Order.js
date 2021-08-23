import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../common/Spinner/Spinner";
import Message from "../common/Message/Message";

import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../../constants/order";
import { getOrderDetails } from "../../actions/order";

import "./order.css";

const Order = ({ match, history }) => {
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(getOrderDetails(orderId));
  }, []);

  return loading ? (
    <Spinner />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <div className="order">
      <div className="order-place">
        <div className="order-brand-logo">Greenlife</div>
        <div className="order-confirm">Your order is confirmed!</div>
        <div className="order-greeting">Hello, {order.user.name}</div>
        <div className="order-confirm-shipping">
          Your order has been confirmed and will be delivered in two days.
        </div>
        <div className="order-information">
          <div className="order-date">
            <div className="order-date-title">Order date</div>
            <div className="order-date-content">
              {order.createdAt.substring(0, 10)}
            </div>
          </div>
          <div className="order-id">
            <div className="order-id-title">Order Id</div>
            <div className="order-id-content">{order._id}</div>
          </div>
          <div className="order-payment">
            <div className="order-payment-title">Payment Method</div>
            <div className="order-payment-content">
              {order.paymentMethod}{" "}
              <img
                alt="PayPal-Logo"
                className="paypal-image"
                src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..1602794215.png"
              />
            </div>
          </div>
          <div className="order-delivery-address">
            <div className="order-delivery-address-title">
              Delivery address:{" "}
            </div>
            <div className="order-delivery-address-content">
              {order.deliveryAddress.address}, {order.deliveryAddress.city},{" "}
              {order.deliveryAddress.postalCode},{" "}
              {order.deliveryAddress.country}
            </div>
          </div>
        </div>
        <div className="order-items">
          {order.orderItems.map((item) => (
            <div className="order-item">
              <img className="order-image" src={`${item.image}`} />
              <div className="order-item-content">
                <div className="order-item-name">{item.name}</div>
                <div className="order-item-price">${item.price}</div>
                <div className="order-item-quantity">
                  Qty: {item.quantity} pcs
                </div>
              </div>
              <div className="order-item-total-price">
                ${item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="order-receipt">
          <div className="order-items-price">
            <div className="order-items-price-title">
              {order.orderItems.reduce(
                (acc, item) => acc + item.quantity,
                0
              ) === 1 ? (
                <span>
                  {order.orderItems.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  )}{" "}
                  item
                </span>
              ) : (
                <span>
                  {order.orderItems.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  )}{" "}
                  items
                </span>
              )}
            </div>
            <div className="order-items-price-content">${order.itemsPrice}</div>
          </div>

          <div className="order-delivery-fee">
            <div className="order-delivery-fee-title">Delivery fee</div>
            <div className="order-delivery-fee-content">
              ${order.deliveryFee}
            </div>
          </div>

          <div className="order-total-price">
            <div className="order-total-price-title">Total</div>
            <div className="order-total-price-content">${order.totalPrice}</div>
          </div>
        </div>

        <div className="email-confirmation">
          We will be sending a shipping confirmation email when the item is
          shipped!
        </div>

        <div className="appreciate-form">
          <div className="thanks">
            <div className="thanks-content">Thanks for shopping</div>
            <div className="representative">Greenlife team</div>
          </div>
          <div className="contact">
            <div className="contact-title">Need help?</div>
            <div className="contact-number">Call - 123458888</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
