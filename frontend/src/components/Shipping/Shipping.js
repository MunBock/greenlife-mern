import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Steps from "../common/Steps/Steps";

import { saveDeliveryAddress } from "../../actions/cart";

import "./shipping.css";

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, deliveryAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [postalCode, setPostalCode] = useState(deliveryAddress.postalCode);
  const [country, setCountry] = useState(deliveryAddress.country);

  const dispatch = useDispatch();

  if (!userInfo) {
    history.push("/login");
  }

  if (cartItems.length < 1) {
    history.push("/cart");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postalCode, country }));
    history.push("/payment");
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

  return (
    <>
      <Steps step1 />
      <div className="shipping-container">
        <form
          className="shipping-form"
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <div className="shipping-title">Delivery information</div>
          <div className="shipping-group">
            <label className="shipping-label">Address *</label>
            <input
              type="text"
              placeholder=""
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="shipping-input"
            />
          </div>

          <div className="shipping-group">
            <label className="shipping-label">City *</label>
            <input
              type="text"
              placeholder=""
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              className="shipping-input"
            />
          </div>

          <div className="shipping-group">
            <label className="shipping-label">Postal Code *</label>
            <input
              type="text"
              placeholder=""
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
              className="shipping-input"
            />
          </div>

          <div className="shipping-group">
            <label className="shipping-label">Country *</label>
            <input
              type="text"
              placeholder=""
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className="shipping-input"
            />
          </div>

          <button className="shipping-button" type="submit">
            Review & Pay
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

export default Shipping;
