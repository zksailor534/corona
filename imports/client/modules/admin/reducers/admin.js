// admin state pattern
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

const initialAdminState = {
  users: {},
  isChanging: false,
};

const initialUserState = {
  isChanging: false,
  error: false,
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case 'ROLE_CHANGE_REQUEST':
      return Object.assign({}, state, {
        isChanging: false,
        error: false,
      });
    case 'ROLE_CHANGE_ERROR':
      return Object.assign({}, state, {
        isChanging: false,
        error: true,
      });
    case 'ROLE_CHANGE_SUCCESS':
      return Object.assign({}, state, {
        role: action.role,
        isChanging: false,
        error: false,
      });
    default:
      return state;
  }
};

const users = (state = {}, action) => {
  switch (action.type) {
    case 'ROLE_CHANGE_REQUEST':
    case 'ROLE_CHANGE_ERROR':
    case 'ROLE_CHANGE_SUCCESS':
      return Object.assign({}, state, {
        [action.id]: user(state.id, action),
      });
    default:
      return state;
  }
};

export default (state = initialAdminState, action) => {
  switch (action.type) {
    case 'ROLE_CHANGE_REQUEST':
      return Object.assign({}, state, {
        users: users(state.users, action),
        isChanging: true,
      });
    case 'ROLE_CHANGE_ERROR':
      return Object.assign({}, state, {
        users: users(state.users, action),
        isChanging: false,
      });
    case 'ROLE_CHANGE_SUCCESS':
      return Object.assign({}, state, {
        users: users(state.users, action),
        isChanging: false,
      });
    default:
      return state;
  }
};
