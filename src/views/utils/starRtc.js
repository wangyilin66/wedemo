import {setCookie,} from './index';
import {message,} from 'antd';

const SERVER_IP = '129.204.145.78';
// const SERVER_IP = '114.251.158.52';
const AGENT_ID = 'stargWeHN8Y7';
let AUTH_KEY = '';

const starRtc = {
    voipRoom: null,
    init(isPrivateCloud = false) {
        ////////////////////////公有云私有云区别搜索 StarRtc.Instance.configModePulic 查看
        if (isPrivateCloud) {
            ////////////////////////私有云改配置///////////////////////
            ///////////////////////以下10.90.7.70需替换为私有部署IP////
            StarRtc.Instance.setConfigModePulic(false);
            StarRtc.Instance.setMsgServerInfo(SERVER_IP, 19903);					//ip, websocket port  //需要手动从浏览器输入 https://10.90.7.70:29991 信任证书
            StarRtc.Instance.setChatRoomServerInfo(SERVER_IP, 19906); 			//ip, websocket port //需要手动从浏览器输入 https://10.90.7.70:29993 信任证书
            StarRtc.Instance.setSrcServerInfo(SERVER_IP, 19934, 19935);  			//ip, websocket port, webrtc port //需要手动从浏览器输入 https://10.90.7.70:29994 信任证书
            StarRtc.Instance.setVdnServerInfo(SERVER_IP, 19940, 19941); 			//ip, websocket port, webrtc port //需要手动从浏览器输入 https://10.90.7.70:29995 信任证书
            StarRtc.Instance.setVoipServerInfo(SERVER_IP, 10086, 10087, 10088); 	//ip, voipServer port, websocket port, webrtc port //需要手动从浏览器输入 https://10.90.7.70:29992 信任证书
            StarRtc.Instance.setWebrtcServerIP(SERVER_IP);
        } else {
            ////////////////////////公有云改配置///////////////////////

            StarRtc.Instance.setConfigModePulic(true);
            StarRtc.Instance.setLoginServerUrl('ips2.starrtc.com');
            StarRtc.Instance.setMsgScheduleUrl('ips2.starrtc.com');
            StarRtc.Instance.setChatRoomScheduleUrl('ips2.starrtc.com');
            StarRtc.Instance.setSrcScheduleUrl('ips2.starrtc.com');
            StarRtc.Instance.setVdnScheduleUrl('ips2.starrtc.com');
            // StarRtc.Instance.setVoipServerUrl('ips2.starrtc.com');
            StarRtc.Instance.setVoipServerUrl('voip2.starrtc.com');
            StarRtc.Instance.setWorkServerUrl('https://api.starrtc.com/public');
            //StarRtc.Instance.setWebrtcServerIP('192.168.0.1');
            StarRtc.Instance.setWebrtcServerIP('ips2.starrtc.com');

            // StarRtc.Instance.setConfigModePulic(true);
            // StarRtc.Instance.setLoginServerUrl('ips2.starrtc.com');
            // StarRtc.Instance.setMsgScheduleUrl('ips2.starrtc.com');
            // StarRtc.Instance.setChatRoomScheduleUrl('ips2.starrtc.com');
            // StarRtc.Instance.setSrcScheduleUrl('ips2.starrtc.com');
            // StarRtc.Instance.setVdnScheduleUrl('ips2.starrtc.com');
            // // StarRtc.Instance.setVoipServerUrl('ips2.starrtc.com');
            // StarRtc.Instance.setVoipServerUrl('voip2.starrtc.com');
            // StarRtc.Instance.setWorkServerUrl('https://api.starrtc.com/public');
            // //StarRtc.Instance.setWebrtcServerIP('192.168.0.1');
            // StarRtc.Instance.setWebrtcServerIP('ips2.starrtc.com');
        }

        StarRtc.Instance.version();
    },
    /**
     * login： 与建立19903建立ws连接
     * @param {string} userId 用户id
     * @param {func} callback 回调
     */
    login(userId, callback) {
        // 修改 公有云
        this.init(false);

        setCookie("starrtc_userId", userId, null);
        // 公有云
        if (StarRtc.Instance.configModePulic) {
            $.get(StarRtc.Instance.workServerUrl + "/authKey.php?userid=" + userId + "&appid=" + AGENT_ID, (data, status) => {
                if (status === "success") {
                    const obj = JSON.parse(data);
                    if (obj.status === 1) {
                        const authKey = obj.data;
                        AUTH_KEY = authKey;
                        setCookie("starrtc_authKey", authKey, null);
                        StarRtc.Instance.login(AGENT_ID, userId, AUTH_KEY, callback);
                    }
                } else {
                    alert('StarRTC 登录失败');
                }
            });
        }
        else {
            StarRtc.Instance.login(AGENT_ID, userId, AUTH_KEY, callback);
        }
    },
    /**
     * logout
     */
    logout() {
        StarRtc.Instance.logout();
    },
    /**
     * refresh: login & logout
     * @param {string} userId 用户id
     */
    refresh(userId, callback) {
        this.logout();
        this.login(userId, callback);
    },
    /**
     * 一对一视频通话： 与建立10087建立ws连接
     * @param {string} type ['call', 'response'] 拨打 或 接听
     * @param {string} targetId 目标id
     * @param {func} callback 回调
     */
    voip(type, targetId, callback) {
        this.voipRoom = StarRtc.Instance.getVoipRoomSDK(type,
            (data, status) => {
                this.voipCallBack(data, status);
                callback(data, status);
            }, 
            // callback,
            {
                'roomInfo': {
                    'targetId': targetId,
                },
            });
	    this.voipRoom.sigConnect();
    },
    voipCall(targetId, callback) {
        this.voip('call', targetId, callback);
    },
    voipAccept(targetId, callback) {
        this.voip('response', targetId, callback);
    },
    voipRefuse(targetId) {
        StarRtc.Instance.sendVoipRefuseMsg (targetId);
    },
    voipHangup() {
        if (this.voipRoom !== null) {
            this.voipRoom.leaveRoom ();
            this.voipRoom.sigDisconnect();
            this.voipRoom = null;
        }
    },
    /**
     * 视频会议
     */
    //获取视频会议列表
    loadVideoLiveList(_callback) {
        let videoLiveIds;
        if (StarRtc.Instance.configModePulic) {
            $.get(StarRtc.Instance.workServerUrl + "/live/list.php?appid=" + AGENT_ID, function (data, status) {
                if (status === "success") {
                    var obj = JSON.parse(data);
                    if (obj.status == 1) {
                        videoLiveIds = obj.data;
                        console.log('loadVideoLiveList', videoLiveIds);
                        for (var i = 0; i < videoLiveIds.length; i++) {
                            var item = videoLiveIds[i];
                            // $("#videoLiveList")[0].innerHTML +=
                            //     "<div class='button2' onclick='openVideoLive(" + i + ")'>" + item.Name + "</div>";
                        }
                        if (_callback != undefined) {
                            _callback();
                        }
                    } else {
                        // $("videoLiveList").html("获取失败");
                    }
                } else {
                    // $("videoLiveList").html("获取失败");
                }
            });
        }
        else {
            StarRtc.Instance.queryVideoLiveRoom(function (status, listData) {
                videoLiveIds = listData;
                console.log('loadVideoLiveList', videoLiveIds);

                for (var i = 0; i < listData.length; i++) {
                    var item = listData[i];
                    // $("#videoLiveList")[0].innerHTML +=
                    //     "<div class='button2' onclick='openVideoLive(" + i + ")'>" + item.Name + "</div>";
                }
                if (_callback != undefined) {
                    _callback();
                }
            });
        }
    },

    // callback
    loginCallBack(data, status) {
        let gid, fid, msgJson, msgTxt;
        switch (status) {
        //链接状态
        case 'connect success':
        case 'connect failed':
        case 'connect closed':
            break;
            //收到登录消息
        case 'onLoginMessage':
            console.log('---', 'login:' + data.status);
            break;
            //收到消息
        case 'onSingleMessage':
            console.log('---', data.fromId, data.msg.contentData, false);
            break;
        case 'onGroupMessage':
            msgJson = JSON.parse(data.msg);
            msgTxt = msgJson.contentData;
            console.log('---', data.groupId, data.fromId + ':<br/>&nbsp;&nbsp;&nbsp;' + msgTxt);
            break;
        case 'onGroupPrivateMessage':
            gid = data.groupId;
            fid = data.fromId;
            msgJson = JSON.parse(data.msg);
            msgTxt = msgJson.contentData;
            console.log('---', gid, fid + ':<br/>&nbsp;&nbsp;&nbsp;' + msgTxt);
            break;
        case 'onGroupPushMessage':
            gid = data.groupId;
            msgJson = JSON.parse(data.msg);
            msgTxt = msgJson.contentData;
            console.log('---', gid, msgTxt);
            break;
        case 'onSystemPushMessage':
            msgJson = JSON.parse(data.msg);
            msgTxt = msgJson.contentData;
            console.log('---', status + ':' + msgTxt);
            console.log('---', 'all', status + ':' + msgTxt);
            break;
        case 'onVoipMessage':
            switch (data.type) {
            case 'voipCall':
                message.warn('您有一个视频通话邀请');
                console.log('---', 'voipCall');
                break;
            case 'voipHangup':
                message.success('您拒绝了一个视频通话');
                console.log('---', 'voipHangup');
                break;
            case 'voipRefuse':
                message.success('您拒绝了一个视频通话');
                console.log('---', 'voipRefuse');
                // alert('对方拒绝了通话！');
                break;
            }
            break;
        case 'onErrorMessage':
            switch (data.errId) {
            case 2:
                // alert('您的账号在另外的设备登录，您已经下线');
                // starlogout();
                break;
            }
            break;
        case 'onGetGroupList':
            break;
        case 'onGetOnlineNumber':
            break;
        case 'onGetGroupUserList':
            break;
        case 'onGetAllUserList':
            break;
        case 'onPushGroupSystemMsgFin':
            break;
        case 'onPushSystemMsgFin':
            break;
        case 'onUnsetGroupMsgIgnoreFin':
            break;
        case 'onSetGroupMsgIgnoreFin':
            break;
        case 'onRemoveGroupUserFin':
            break;
        case 'onAddGroupUserFin':
            break;
        case 'onDelGroupFin':
            break;
        case 'onCreateGroupFin':
            break;
        case 'onSendGroupMsgFin':
            break;
        }
    },

    voipCallBack(data, status, oper) {
        const thisRoom = data.obj;
        switch (status) {
        //链接状态
        case "connect success":
            thisRoom.createStream();
            break;
        case "connect failed":
        case "connect closed":
            // stopVoip();
            break;
        case "onWebrtcMessage":
            switch (data.type) {
            case "streamCreated":
                if (data.status === "success") {
                    // voipSetStream($("#voipSmallVideo")[0], data.streamObj);
                    thisRoom.joinRoom();
                }
                else {
                    // voipConnectDlg.dialog("close");
                    message.error('获取摄像头视频失败！请检查摄像头设备是否接入！error:' + data.error);
                }
                break;
            case "voipCalling":
                if (data.status === "success") {

                }
                break;
            case "voipResponseing":
                if (data.status === "success") {
                    // $('#targetUserId').val(data.userData.roomInfo.targetId);
                }
                break;
            case "voipStreamReady":
                // voipSetStream($("#voipBigVideo")[0], data.streamObj);
                break;
            }
            break;
        case "onVoipMessage":
            switch (data.type) {
            case "voipRefuse":
                // voipConnectDlg.dialog("close");
                // $("#callerId").html("");
                message.warn('对方拒绝了通话!');
                thisRoom.sigDisconnect();
                break;
            case "voipHangup":
                message.warn('对方挂断了通话!');
                thisRoom.sigDisconnect();
                break;
            case "voipConnect":
                // voipConnectDlg.dialog("close");
                break;
            case "voipBusy":
                message.warn('对方正忙!');
                thisRoom.sigDisconnect();
                break;
            case "voipSingleMsg":
                // voipMsgWindow.displayMessage(data.fromId, data.msg.contentData, false);
                break;
            }
            break;
        }
    },
};

window.rtc = starRtc;

export default starRtc;
