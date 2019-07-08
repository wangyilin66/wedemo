const myData= {
    userid:'',
};
 
const sendUserIdReducer = (state = myData ,action) => {
    const { type,payload, } = action;
    switch(type){
    case "SEND_USER_ID":
        return { ...state,
            userid:payload.userid,
        };
    default:
        return state;
    }
};
 
export default sendUserIdReducer;