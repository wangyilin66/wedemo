const TopiclistState= {
    TopicList:[],
};
 
const TopicListReducer = (state = TopiclistState ,action) => {
    const { type,payload, } = action;
    switch(type){
    case "SET_TOPIC_LIST":
        return { ...state,
            TopicList:payload,
        };
    case "AT_TOPIC_LIST":
        return {
            ...state,
            TopicList:[...state,payload,],
        };
    default:
        return state;
    }
};
 
export default TopicListReducer;