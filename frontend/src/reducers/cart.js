import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_DELIVERY_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cart";

export const cartReducer = (
  state = { cartItems: [], deliveryAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find(
        (object) => object.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((object) =>
            object.product === existItem.product ? item : object
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_CLEAR_ITEMS:
      return { ...state, cartItems: [] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (object) => object.product !== action.payload
        ),
      };
    case CART_SAVE_DELIVERY_ADDRESS:
      return { ...state, deliveryAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
