const msgSendState= {
    sender:'',
    receiver:'',
    position:{},
    playlist:[],
};

const MsgSendReducer = (state = msgSendState ,action) => {
    const { type,payload, } = action;
    switch(type){
    case "SEND_POSITION":
        return { ...state,
            sender:payload.sender,
            receiver:payload.receiver,
            position:payload.position,
        };
    case "SEND_PLAY_LIST":
        return {...state,
            playlist:payload.playlist,
        };
    case "MOVE_TO_POSITION":
        return {
            ...state,
            position:payload.position,
        };
    default:
        return state;
    }
};

export default MsgSendReducer;