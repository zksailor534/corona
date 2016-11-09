// user state pattern
// {
//   users: {
//     `${id}`: {
//       firstName: string,
//       lastName: string,
//       email: string,
//       role: string,
//       isChanging: bool,
//       error: bool,
//     },
//   },
// }

const initialState = {
  isFetching: false,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
      });
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null,
      });
    case 'LOGOUT_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
      });
    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
      });
    case 'SIGNUP_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
      });
    case 'SIGNUP_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null,
      });
    case 'RESET_PASSWORD_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case 'RESET_PASSWORD_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
      });
    case 'RESET_PASSWORD_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null,
      });
    default:
      return state;
  }
};
