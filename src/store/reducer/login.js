const defaultState = {
    username: '',
    userid: '',
    states: 1,
};

const LoginReducer = (state = defaultState, action) => {
    const {
        type,
        user,
    } = action;
    switch (type) {
    case 'LOGIN':
        return {
            ...state,
            ...user,
        };
    default:
        return state;
    }
};

export default LoginReducer;