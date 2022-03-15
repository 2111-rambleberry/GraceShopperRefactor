import axios from "axios";

const SET_GENRE = "SET_GENRE";

export const setGenre = (genre) => ({
    type: SET_GENRE,
    genre
});

export const fetchGenre = (genre) => {
    return async (dispatch) => {
        try{
        const { data: bookGenre } = await axios.get(`/api/genre/${genre}`)
        dispatch(setGenre(bookGenre));
    }catch(err){
        console.err(err);
    }
}
}

export default function genreReducer(state= [], action){
    switch(action.type){
        case SET_GENRE:
            return action.genre;
        default:
            return state;
    }
}