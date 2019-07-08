import {
    connect,
    Provider,
} from 'react-redux';
import ReactDOM from 'react-dom';
import React, {
    Component,
} from 'react';
import _ from 'lodash';

import {
    login,
    logout,
    voipCall,
    voipAccept,
    voipRefuse,
    voipHangup,
} from '../../../store/action/starRtc';

import Store from '../../../store/index.js';

import VideoChat from '../../component/StarRtc/VideoChat/index';

function getLoginStatus(state) {
    const {
        status,
        data,
    } = state;
    if (status === 'onVoipMessage') {
        switch (data.type) {
        case 'voipCall':
            return 'voipCall';
        case 'voipHangup':
            return 'voipHangup';
        case 'voipRefuse':
            return 'voipRefuse';
        }
    }
    return '';
}

function getVoipStatus(state) {
    const {
        status,
        data,
    } = state;
    if (status === 'onVoipMessage') {
        switch (data.type) {
        case 'voipCall':
            return 'CallFrom';
        case 'voipHangup':
            return 'voipHangup';
        case 'voipRefuse':
            return 'voipRefuse';
        case 'voipBusy':
            return 'voipBusy';
        case 'voipConnect':
            return 'voipConnect';
        }
    }
    if (status === 'connect success') {
        return 'voipConnectSuccess';
    }
    if (status === 'onWebrtcMessage') {
        switch (data.type) {
        case 'streamCreated':
            if (data.status === 'success') {
                return 'voipStreamCreatedSuccess';
            } else {
                return 'voipStreamCreatedFail';
            }
        case 'voipCalling':
            if (data.status === 'success') {
                return 'voipCallingSuccess';
            }
        case 'voipResponseing':
            if (data.status === 'success') {
                return 'voipResponseingSuccess';
            }
        case 'voipStreamReady':
            return 'voipStreamReady';
        }
    }
    return '';
}

function getStatus(state) {
    const loginStatus = getLoginStatus(state.StarRtcReducer.login);
    const voipStatus = getVoipStatus(state.StarRtcReducer.voip);
    const action = state.StarRtcReducer.voipAction;

    const voipAcceptedStatusList = [
        'voipConnectSuccess',
        'voipStreamCreatedSuccess',
        'voipConnect',
        'voipCallingSuccess',
        'voipResponseingSuccess',
        'voipStreamReady',
    ];

    const voipActionList = [
        'voipAccept',
        'voipCall',
        'voipRefuse',
        'voipHangup',
    ];

    const voipCallToList = [
        'voipConnectSuccess',
        'voipStreamCreatedSuccess',
        'voipCallingSuccess',
        'voipResponseingSuccess',
    ];

    if (voipAcceptedStatusList.includes(voipStatus)) {
        return 'voipAccepted';
    }

    // 主动呼叫: voipCall状态下，接收到voip回调信息
    if (action === 'voipCall' && voipCallToList.includes(voipStatus)) {
        return 'voipCallTo';
        // 被动呼叫
    } else if (!voipActionList.includes(action) && loginStatus === 'voipCall') {
        return 'voipCallFrom';
        // 被动接受: login状态下，接收到voip回调信息
    } else if (voipAcceptedStatusList.includes(voipStatus)) {
        return 'voipAccepted';
        // 主动接受
    } else if (action === 'voipAccept' && voipAcceptedStatusList.includes(voipStatus)) {
        return 'voipAccepted';
    } else {
        return '';
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.login,
        action: state.StarRtcReducer.voipAction,
        status: getStatus(state),
        loginStatus: getLoginStatus(state.StarRtcReducer.login),
        voipStatus: getVoipStatus(state.StarRtcReducer.voip),
        loginData: state.StarRtcReducer.login.data,
        voipData: state.StarRtcReducer.voip.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (id) => {
            dispatch(login(id));
        },
        logout: () => {
            dispatch(logout());
        },
        voipCall: (id) => {
            dispatch(voipCall(id));
        },
        voipAccept: (id) => {
            dispatch(voipAccept(id));
        },
        voipRefuse: (id) => {
            dispatch(voipRefuse(id));
        },
        voipHangup: () => {
            dispatch(voipHangup());
        },
    };
};
/**
 * VideoChatManager 用来响应store的变化和分发actions
 */
const VideoChatManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoChat);

// 单例模式
VideoChatManager.newInstance = function newVideoChatInstance(properties, callback) {
    const {
        getContainer,
        ...props
    } = properties || {};
    const div = document.createElement('div');
    // 有getContainer的话，支持自定义；没有的话，挂载DOM到body上
    if (getContainer) {
        const root = getContainer();
        root.appendChild(div);
    } else {
        document.body.appendChild(div);
    }
    // 是否被调用过
    let called = false;

    function ref(component) {
        if (called) {
            return;
        }
        called = true;
        callback({
            component: component,
            destroy() {
                ReactDOM.unmountComponentAtNode(div);
                div.parentNode.removeChild(div);
            },
        });
    }
    // 手动渲染DOM到对应的Container
    ReactDOM.render((<Provider store = {Store} >
        <VideoChatManager {...props} forwardedRef = {ref}/>
    </Provider>), div);
};

export default VideoChatManager;