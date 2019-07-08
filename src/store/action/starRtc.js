/**
 * StarRTC需要支持异步action，实现在ws长连接下的状态（state.status）更新。
 */
import starRtc from '../../views/utils/starRtc';

// ====> 以下为同步actions <====
/**
 * login
 */
export const STAR_RTC_LOGIN_CALLBACK = 'STAR_RTC_LOGIN_CALLBACK';
function starRtcLoginCallback(data, status) {
    return {
        type: STAR_RTC_LOGIN_CALLBACK,
        data,
        status,
    };
}

/**
 * voip
 */
export const STAR_RTC_VOIP_CALLBACK = 'STAR_RTC_VOIP_CALLBACK';
function starRtcVOIPCallback(data, status) {
    return {
        type: STAR_RTC_VOIP_CALLBACK,
        data,
        status,
    };
}

/**
 * voip status
 */
export const STAR_RTC_VOIP_ACTION = 'STAR_RTC_VOIP_ACTION';
function starRtcVOIPAction(action) {
    return {
        type: STAR_RTC_VOIP_ACTION,
        action,
    };
}

// ====> 以下为异步actions <====

export function login(id) {
    return function (dispatch) {
        starRtc.login(id, (data, status) => {
            dispatch(starRtcLoginCallback(data, status));
            dispatch(starRtcVOIPAction('login'));
        });
    };
}

export function logout() {
    return function (dispatch) {
        starRtc.logout();
        dispatch(starRtcVOIPAction('logout'));
    };
}

export function voipCall(id) {
    return function (dispatch) {
        starRtc.voipCall(id, (data, status) => {
            dispatch(starRtcVOIPCallback(data, status));
            dispatch(starRtcVOIPAction('voipCall'));
        });
    };
}

export function voipAccept(id) {
    return function (dispatch) {
        starRtc.voipAccept(id, (data, status) => {
            dispatch(starRtcVOIPCallback(data, status));
            dispatch(starRtcVOIPAction('voipAccept'));
        });
    };
}

export function voipRefuse(id) {
    return function (dispatch) {
        starRtc.voipRefuse(id);
        dispatch(starRtcVOIPCallback({targetId: id,}, 'voipRefuse'));
        // 延迟更新挂断信息，防止接收到额外信息
        setTimeout(() => {
            dispatch(starRtcVOIPAction('voipRefuse'));
        }, 400);
    };
}

export function voipHangup() {
    return function (dispatch) {
        starRtc.voipHangup();
        dispatch(starRtcVOIPCallback({}, 'voipHangup'));
        // 延迟更新挂断信息，防止接收到额外信息
        setTimeout(() => {
            dispatch(starRtcVOIPAction('voipHangup'));
        }, 400);
    };
}
