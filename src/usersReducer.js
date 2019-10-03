import axios from "axios";

const FETCH_USERS = "FETCH_USERS";

export function getUsers() {
  return async function(dispatch) {
    const res = await axios.get("http://react-ssr-api.herokuapp.com/users");
    dispatch({
      type: FETCH_USERS,
      payload: res.data
    });
  };
}

const INITIAL_STATE = {
  users: []
};

export function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}
