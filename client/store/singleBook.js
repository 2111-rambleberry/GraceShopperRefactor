import axios from 'axios'

const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK';
const REMOVE_BOOK = "REMOVE_BOOK";
const CHECKOUT_BOOK = "CHECKOUT_BOOK";

export const setSingleBook = (book) => {
    return {
        type: GET_SINGLE_BOOK,
        book
    }
}

export const checkoutSingleBook = (book) => {
    return {
        type: CHECKOUT_BOOK,
        book
    }
}

export const fetchSingleBook = (bookId) => {
    return async (dispatch) => {
        try {
            const { data:book } = await axios.get(`/api/books/${bookId}`)
            dispatch(setSingleBook(book))
        } catch (err) {
            console.log(err);
        }
    }
}

export const reduceBookQty = (book, history) => {
    return async (dispatch) => {
      try {
        // const token = window.localStorage.getItem(TOKEN)
        // if(token){
            const { data } = await axios.put(`/api/books/${book.id}`, book)
            // , {
            //   headers: {
            //     authorization: token,
            //   },
            // });
            //console.log("redux stuff", data);
            dispatch(checkoutSingleBook(data));
        //)}    
         //history.push(`/home`)  
      } catch (err) {
        console.log(err);
      }
    }
  };

export default function singleBookReducer (state = {}, action){
    switch(action.type){
        case GET_SINGLE_BOOK:
            return action.book
         case CHECKOUT_BOOK:
             return {...action.book, quantity: action.book.quantity ? action.book.quantity -= 1 : action.book.quantity}
        default:
            return state;

    }
}