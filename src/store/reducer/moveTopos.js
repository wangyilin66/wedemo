const movePosState= {
    position:{},
};
 
const MoveToPosDeducer = (state = movePosState ,action) => {
    const { type,payload, } = action;
    switch(type){
    case "MOVE_TO_POSITION":
        return {
            ...state,
            position:payload.position,
        };
    default:
        return state;
    }
};
 
export default MoveToPosDeducer;