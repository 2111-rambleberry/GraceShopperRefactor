import axios from "axios";

const TOKEN = "token";

//ACTIONS
const SET_USERS = "SET_USERS";

//ACTION CREATORS
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

//THUNK CREATORS
export const fetchUsers = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.get("api/users", {
        headers: {
          authorization: token,
        },
      });
      return dispatch(setUsers(data));
    }
  };
};

//REDUCER
const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
