import axios from 'axios'

const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK';
const REMOVE_BOOK = "REMOVE_BOOK";

export const setSingleBook = (book) => {
    return {
        type: GET_SINGLE_BOOK,
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

export default function singleBookReducer (state = {}, action){
    switch(action.type){
        case GET_SINGLE_BOOK:
            return action.book
        default:
            return state
    }
}