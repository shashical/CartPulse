import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },

  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

function reducer(currentState, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': // Handles both creation and updation of the item.
      const newItem = action.payload;
      const existItem = currentState.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? currentState.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...currentState.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return {
        ...currentState,
        cart: {
          ...currentState.cart,
          cartItems,
        },
      };
    case 'CART_REMOVE_ITEM': {
      const cartItems = currentState.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return {
        ...currentState,
        cart: {
          ...currentState.cart,
          cartItems,
        },
      };
    }
    case 'CART_CLEAR':
      return { ...currentState, cart: { ...currentState.cart, cartItems: [] } };
    case 'USER_SIGNIN':
      return { ...currentState, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...currentState,
        userInfo: null,
        cart: { ...currentState.cart, shippingAddress: {}, paymentMethod: '' },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...currentState,
        cart: { ...currentState.cart, shippingAddress: action.payload },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...currentState,
        cart: {
          ...currentState.cart,
          paymentMethod: action.payload,
        },
      };
    default:
      return currentState;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
