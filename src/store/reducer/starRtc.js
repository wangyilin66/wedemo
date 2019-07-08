import {
    STAR_RTC_VOIP_ACTION,
    STAR_RTC_LOGIN_CALLBACK,
    STAR_RTC_VOIP_CALLBACK,
} from '../action/starRtc';

const defaultState = {
    voipAction: '',
    login: {
        data: {},
        status: '',
    },
    voip: {
        data: {},
        status: '',
    },
};

const StarRtcReducer = (state = defaultState, action) => {
    switch (action.type) {
    case STAR_RTC_VOIP_ACTION:
        return {
            ...state,
            voipAction: action.action,
        };
    case STAR_RTC_LOGIN_CALLBACK:
        return {
            ...state,
            login: {
                data: action.data,
                status: action.status,
            },
        };
    case STAR_RTC_VOIP_CALLBACK:
        return {
            ...state,
            voip: {
                data: action.data,
                status: action.status,
            },
        };
    default:
        return state;
    }
};

export default StarRtcReducer;