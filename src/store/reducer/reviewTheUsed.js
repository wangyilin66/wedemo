const myData= {
    newData:'',
};
 
const myDatas = (state = myData ,action) => {
    const { type,payload, } = action;
    switch(type){
    case "SEND_POSITION":
        return { ...state,
            sender:payload.sender,
            receiver:payload.receiver,
            position:payload.position,
        };
    default:
        return state;
    }
};
 
export default myDatas;