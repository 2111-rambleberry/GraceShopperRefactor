import axios from "axios";

const TOKEN = "token";

//ACTIONS
const LOAD_CART = "LOAD_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_ITEM = "REMOVE_ITEM";
// EMPTY CART each time user checks out
const EMPTY_CART = "EMPTY_CART";


//ACTION CREATORS
const getCart = (cart) => ({ type: LOAD_CART, cart });
const updateCart = (cart) =>({ type: ADD_TO_CART, cart})
const removeItem = (item)=> ({ type: REMOVE_ITEM, item});
const emptyCart = () => ({ type: EMPTY_CART });

//Thunks
export const loadCart = () => {
  return async (dispatch) => {
    try { const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: cart } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(getCart(cart));
      }
    } catch (err) {
      console.log(">>>>>>thunk not working");
    }
  };
};

// funk for adding book to cart
export const addItemThunk = (book) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
        const { data: updated } = await axios.post("/api/cart", book, {
          headers: {
            authorization: token
          }
        });
        dispatch(updateCart(updated.books));
      }
    } catch (error) {
      console.log("Thunk not working!!!")
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
        const { data } = await axios.delete(`/api/cart/${id}`, {
          headers: {
            authorization: token,
          },
        });
        console.log("removed", data)
        dispatch(removeItem(data))
      }
    } catch(err){
      console.log('error removing book')
    }
  }
}

//Initial state:
const initialState = {
  cart: {
    books: []
  }   
} 

//RReducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      console.log(state.cart.books)
      return action.cart;
    case ADD_TO_CART:
      return {
        ...state, cart: {
          ...state.cart, books: [
          ...state.cart.books, action.cart
          ]
        }
      }
    case REMOVE_ITEM:
      return {
        ...state, books: [ 
          ...state.books.filter((book) => {
            console.log(book)
            book.id !== action.item.id
          }) 
        ]
      }
    case EMPTY_CART:
      return initialState;
    default:
      return state;
    }
  }