const defaultState = {
    CaseId: 0,
    // contentId:[]
};

const PelouedCaseID = (state = defaultState,action) => {

    const { type,payload, } = action;
    // console.log(payload)
    switch(type){
    case "GET_DEPLOYED_ID":
        return { ...state,
            CaseId: payload.CaseId,
        };
        // case "GET_DEPLOYED_ID":
        // return {
        //     productList: payload
        // }
    default:
        return state;
    }
};

export default PelouedCaseID;