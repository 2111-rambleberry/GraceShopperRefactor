import axios from "axios";

const TOKEN = "token";
const GUEST_CART = "guestCart";

//Initial state:
const initialState = {
  cart: {
    books: []
  }   
} 

//ACTIONS
const LOAD_CART = "LOAD_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_ITEM = "REMOVE_ITEM";
// EMPTY CART each time user checks out
const EMPTY_CART = "EMPTY_CART";
const CHECKOUT = "CHECKOUT"

//ACTION CREATORS
const getCart = (cart) => ({ type: LOAD_CART, cart });
const updateCart = (book) =>({ type: ADD_TO_CART, book})
const removeItem = (book)=> ({ type: REMOVE_ITEM, book});
const emptyCart = () => ({ type: EMPTY_CART });

const checkout = (cart) => ({ type: CHECKOUT, cart });

//Thunks
export const loadCart = () => {
  return async (dispatch) => {
    try { 
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: cart } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(getCart(cart));
      } else {
        const cart = JSON.parse(window.sessionStorage.getItem(GUEST_CART))
          ? JSON.parse(window.sessionStorage.getItem(GUEST_CART))
          : {}
        dispatch(getCart(cart));
      }
    } catch (err) {
      console.log(">>>>>>loadCartThunk not working");
    }
  };
};

// thunk for adding book to cart
export const addItemThunk = (book) => {
  console.log(book); 
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
        const { data: updated } = await axios.post("/api/cart", book, {
          headers: {
            authorization: token
          }
        });
        dispatch(updateCart(updated));
      } else {
        const cart = window.sessionStorage.getItem(GUEST_CART)
          ? JSON.parse(window.sessionStorage.getItem(GUEST_CART))
          : { books: [] };
        cart.books.push(book)
        window.sessionStorage.setItem(GUEST_CART, JSON.stringify(cart))
        dispatch(updateCart(book));
      }
    } catch (error) {
      console.log(">>>>>>addItemThunk not working")
      console.log(error);
    }
  }
};

// thunk for deleting book from cart
export const removeItemThunk = (id) => {
  return async (dispatch) => {
    try{
      const token = window.localStorage.getItem(TOKEN)
      if(token){
        const { data: book } = await axios.delete(`/api/cart/${id}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(removeItem(book))
      } else {
        const cart = JSON.parse(window.sessionStorage.getItem(GUEST_CART))
        const book = cart.books.filter(book => book.id === id).pop()
        const cartUpdate = { books: cart.books.filter(book => book.id !== id) }
        window.sessionStorage.setItem(GUEST_CART, JSON.stringify(cartUpdate))
        dispatch(removeItem(book));
      }
    } catch(err){
      console.log('error removing book')
    }
  }
}

export const cartCheckoutStatus = (cartId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: cart } = await axios.put(`/api/cart/${cartId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(checkout(cart));
    }
  }catch(err){
      console.log('api error')
      console.log(err)
    }
  }
}

//Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.cart;
    case ADD_TO_CART:
      console.log('redux state', state)
      return {...state,
        cart: {...state.cart,
          books: [...state.cart.books, action.book]},
      //   cart_quantity: { state.cart_quantity ? state.cart_quantity = 1 : state.cart_quantity +=1},   
       } 
    case REMOVE_ITEM:
      return {...state, 
        books: state.books.filter((book) => {
          return book.id !== action.book.id
        }),
        // cart_quantity: state.cart_quantity -=1
    } 
    case CHECKOUT:
      return {...state, order_status: state.order_status = 'ordered'};
    case EMPTY_CART:
      return initialState;
    default:
      return state;
    }
  }