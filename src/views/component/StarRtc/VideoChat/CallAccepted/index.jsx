import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import RefuseImage from '../../../../../common/images/tankuang_btn_05.png';
import MuteImage from '../../../../../common/images/tankuang_btn_06.png';


class CallAccepted extends Component {
    static defaultProps = {
        status: '',
        data: {},
    }

    static propTypes = {
        status: PropTypes.string,
        data: PropTypes.object,
    }

    constructor() {
        super();

        this.state = {
            isSmallFirst: true,
            targetId: '',
        };
    }

    voipSetStream(videoObj, streamObj) {
        videoObj.srcObject = streamObj;
        videoObj.play();
    }

    handleVideoSwith = (isSmall) => {
        // 只有小窗口的video才响应窗口切换
        if (isSmall) {
            const {
                isSmallFirst,
            } = this.state;
            this.setState({isSmallFirst: !isSmallFirst,});
        }
    }

    handleClick = (type) => {
        this.props.onOperate(type);
    }

    componentDidUpdate() {
        console.log('------', this.props.status);
        const bigVideoDOM = this.refs.bigVideo;
        const smallVideoDOM = this.refs.smallVideo;

        const {
            status,
            data,
        } = this.props;

        if (status === 'voipStreamCreatedSuccess') {
            this.voipSetStream(smallVideoDOM, data.streamObj);
        } else if (status === 'voipResponseingSuccess') {
            console.log('voipResponseingSuccess: ', data);
            localStorage.setItem('targetId', data.userData.roomInfo.targetId);
        } else if (status === 'voipStreamReady') {
            this.voipSetStream(bigVideoDOM, data.streamObj);
        }
    }


    render() {
        const {
            isSmallFirst,
        } = this.state;
        const {
            action,
            status,
        } = this.props;

        let userInfo = null;

        if (action === 'voipCall' && status !== 'voipStreamReady') {
            userInfo = (
                <div className="user-info">
                    <div className="avatar">
                        <img src={'/favicon.ico'} alt="avatar"/>
                    </div>
                    <p className="username">{'奋斗'}</p>
                    <p className="msg"><span>正在等对方接受邀请...</span></p>
                </div>
            );
        }
        return (
            <div className="call-accepted-container">
                {userInfo}
                <div
                    className={`video ${isSmallFirst ? 'small' : ''}`}
                    onClick={() => this.handleVideoSwith(isSmallFirst)}>
                    <video ref="smallVideo"></video>
                </div>
                <div 
                    className={`video ${!isSmallFirst ? 'small' : ''}`}
                    onClick={() => this.handleVideoSwith(!isSmallFirst)}>
                    <video ref="bigVideo"></video>
                </div>

                <div className="call-footer">
                    {/* <div className="call-btn" onClick={() => this.handleClick('mute')}>
                        <img className="call-btn-icon" src={MuteImage} alt="btn"/>
                        <p>静音</p>
                    </div> */}
                    <div className="call-btn" onClick={() => this.handleClick('hangup')}>
                        <img className="call-btn-icon" src={RefuseImage} alt="btn"/>
                        <p>挂断</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CallAccepted;
