import axios from "axios";

//ACTIONS
const SET_BOOKS = "SET_BOOKS";
const ADD_BOOK = "ADD_BOOK";
//const CHECKOUT_BOOK = "CHECKOUT_BOOK";

//ACTION CREATORS
export const setBooks = (books) => ({
  type: SET_BOOKS,
  books,
});

export const setSingleBook = (singleBook) =>({
  type: ADD_BOOK,
  singleBook
})

// export const checkoutBook = (book) => {
//   return {
//       type: CHECKOUT_BOOK,
//       book
//   }
// }

//THUNK CREATORS

export const fetchBooks = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/books");
      dispatch(setBooks(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setBook = (book) => {
  return async (dispatch) => {
    try{
      const { data: singleBook } = await axios.get(`/api/books/${book.id}`)
      dispatch(setSingleBook(singleBook));
    }catch (err) {
      console.log(err)
    }
  }
}

//for checkout
// export const reduceBookQty = (book, history) => {
//   return async (dispatch) => {
//     try {
//           const { data } = await axios.put(`/api/books/${book.id}`, book)
//           dispatch(checkoutBook(data));
//        //history.push(`/home`)  
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };
//REDUCER
const initialState = [];

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return action.books;
    case ADD_BOOK:
      return [...state, ...action.singleBook]
      // case CHECKOUT_BOOK:
      //   return state.map((book) => {book.id === action.books.id ? book.quantity - 1 : book.quantity}) 
    default:
      return state;
  }
}
