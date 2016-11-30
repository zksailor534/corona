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
  siteName: 'Application',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
