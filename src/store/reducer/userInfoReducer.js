const msgSendState= {
    userID:'',
    userNick:'',
};
 
const UserInfoReducer = (state = msgSendState ,action) => {
    const { type,payload, } = action;
    switch(type){
    case "USER_INFO":
        return { ...state,
            userID:payload.userID,
            userNick:payload.userNick,
        };
    default:
        return state;
    }
};
 
export default UserInfoReducer;