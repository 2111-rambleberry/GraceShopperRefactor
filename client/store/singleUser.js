import axios from 'axios'

const GET_SINGLE_USER = 'GET_SINGLE_USER';
const UPDATE_SINGLE_USER = "UPDATE_SINGLE_USER";

export const setSingleUser = (user) => {
    return { 
        type: GET_SINGLE_USER,
        user
    }
}

export const _updateSingleUser = (user) => {
    return {
        type: UPDATE_SINGLE_USER,
        user
    }
}

//might need to come back and change the route to be the secret one
//You can do some  sort of eager loading where you access user whole id matches logged in id
export const fetchSingleUser = (user) => {
    return async (dispatch) => {
        try{

            const {data : user} = await axios.get(`/api/users/${user.userId}`);
            dispatch(setSingleUser(user))
        } catch (err) {
             console.log(err)
        }    
    }
}

export const updateSingleUser = (user) => {
    return async (dispatch) => {
        try{
            const { data: user } = await axios.put(`/api/users/${user.userId}`);
            dispatch(_updateSingleUser(user))
            history.push('/')
        }catch (err) {
            console.log(err)
        }
    }
}

export default function singleUserReducer (state = {}, action){
    switch(action.type){
        case GET_SINGLE_USER:
            return action.user;
        case UPDATE_SINGLE_USER:
            return state.map((user)=>{
                user.userId === action.user.id ? action.user : user
            })
        default:
            return state
    }
}