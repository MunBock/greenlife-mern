import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Steps from "../common/Steps/Steps";
import { savePaymentMethod } from "../../actions/cart";
import { createOrder } from "../../actions/order";

import { ORDER_CREATE_RESET } from "../../constants/order";

import "./payment.css";

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, deliveryAddress } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  if (!deliveryAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const paymentHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
  };

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let deliveryFee = 0;

  if (itemsPrice <= 50) {
    deliveryFee = 5;
  }

  const totalPrice = (itemsPrice + deliveryFee).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, history, success]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        deliveryAddress: cart.deliveryAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        totalPrice: totalPrice,
        deliveryFee: deliveryFee,
      })
    );
  };

  return (
    <>
      <Steps step2 />
      <div className="payment-container">
        <form className="payment-form" onSubmit={placeOrderHandler}>
          <div className="payment-title">Payment method</div>
          <div className="payment-group">
            <div className="payment-content">
              <label className="payment-content-label">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  onClick={paymentHandler}
                  className="payment-input"
                  required
                />
                <span className="payment-custom-radio-button"></span>
                <div className="payment-input-title">PayPal</div>
              </label>
              <div className="payment-content-logo">
                <img
                  alt="PayPal-Logo"
                  className="paypal-logo"
                  src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..1602794215.png"
                />
              </div>
            </div>
          </div>
          <button className="payment-button" type="submit">
            Place order
          </button>
        </form>
        <div className="shipping-sub-container">
          <div className="shipping-cart-order">
            <div className="shipping-cart-order-title">Order summary</div>
            <div className="shipping-cart-order-quantity">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0) === 1 ? (
                <span>
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} item
                </span>
              ) : (
                <span>
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  items
                </span>
              )}
              <div className="shipping-cart-order-price">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </div>
            </div>
            <div className="shopping-cart-order-delivery">
              <div className="shopping-cart-order-delivery-title">
                <div>Delivery</div>
                <div className="shopping-cart-order-delivery-sub-title">
                  (free delivery on over $50)
                </div>
              </div>
              <div className="shopping-cart-order-delivery-content">
                {deliveryFee === 0 ? (
                  <div>FREE</div>
                ) : (
                  <div className="shopping-cart-order-delivery-fee">
                    ${deliveryFee.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
            <div className="shopping-cart-order-total">
              <div className="shopping-cart-order-total-title">
                <div>Total</div>
                <div className="shopping-cart-order-total-sub-title">
                  (inclusive of tax $0.00)
                </div>
              </div>
              <div className="shopping-cart-order-total-price">
                ${totalPrice}
              </div>
            </div>
          </div>
          <div className="shipping-information">
            <div className="shipping-information-title">Delivery address</div>
            <div className="shipping-address">{deliveryAddress.address}</div>
            <div className="shipping-city">{deliveryAddress.city}</div>
            <div className="shipping-postal-code">
              {deliveryAddress.postalCode}
            </div>
            <div className="shipping-country">{deliveryAddress.country}</div>
          </div>
          <div className="shipping-order-details">
            <div className="shipping-order-details-title">Order details</div>
            <div>
              {cartItems.map((item) => (
                <div className="shipping-order-details-item" key={item.product}>
                  <div className="shipping-order-details-image-container">
                    <img
                      src={`${item.image}`}
                      alt={item.image}
                      className="shipping-order-details-image"
                    />
                  </div>
                  <div className="shipping-order-details-item-content">
                    <div className="shipping-order-details-name">
                      {item.name}
                    </div>
                    <div className="shipping-order-details-price">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="shipping-order-details-quantity">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
