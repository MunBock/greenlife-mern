import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart, removeFromCart } from "../../actions/cart";

import "./cart.css";

import CloseIcon from "@material-ui/icons/Close";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;

  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/shipping");
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

  return cartItems.length === 0 ? (
    <div className="empty-cart">
      <div className="empty-cart-title">Your cart is empty</div>
      <div className="empty-cart-content">
        Once you add items to your cart, it will display here. Let's get
        started!
      </div>
      <Link className="empty-cart-link" to="/">
        Get started
        <ArrowRightAltIcon className="empty-cart-arrow" />
      </Link>
    </div>
  ) : (
    <>
      <div className="shopping-cart-top">
        <div className="shopping-cart-top-title">Your cart</div>
        <div className="shopping-cart-top-total">
          TOTAL
          <span className="shopping-cart-top-quantity">
            (
            {cartItems.reduce((acc, item) => acc + item.quantity, 0) === 1 ? (
              <span>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} item
              </span>
            ) : (
              <span>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            )}
            )
          </span>
          <span className="shopping-cart-top-price">
            $
            {cartItems
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
          </span>
        </div>
      </div>
      <div className="shopping-cart-container">
        <div className="shopping-cart-items">
          {cartItems.map((item) => (
            <div className="shopping-cart-item" key={item.product}>
              <div className="shopping-cart-image-container">
                <img src={`${item.image}`} className="shopping-cart-image" />
              </div>

              <div className="shopping-cart-item-content">
                <div className="shopping-cart-name">{item.name}</div>
                <div className="shopping-cart-price">
                  ${item.price.toFixed(2)}
                </div>
                <div>
                  <select
                    value={item.quantity}
                    className="shopping-cart-quantity"
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.numberInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <CloseIcon
                className="shopping-cart-delete"
                onClick={() => removeFromCartHandler(item.product)}
              />
            </div>
          ))}
        </div>
        <div className="shopping-cart-order">
          <div className="shopping-cart-order-title">Order summary</div>
          <div className="shopping-cart-order-quantity">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0) === 1 ? (
              <div>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} item
              </div>
            ) : (
              <div>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </div>
            )}
            <div className="shopping-cart-order-price">
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
            <div className="shopping-cart-order-total-price">${totalPrice}</div>
          </div>
          <button
            type="button"
            className="shopping-cart-button"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
