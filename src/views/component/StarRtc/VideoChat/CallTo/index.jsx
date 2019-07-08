import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import RefuseImage from '../../../../../common/images/tankuang_btn_05.png';


class CallTo extends Component {
    static defaultProps = {
        avatarUrl: '/favicon.ico',
        username: '奋斗',
    }
    static propTypes = {
        avatarUrl: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }

    constructor() {
        super();
        // window.b = this;
    }

    handleClick = (type) => {
        this.props.onOperate(type);
    }

    render() {
        const {
            avatarUrl,
            username,
        } = this.props;
        return (
            <div className="call-to-container">
                <div className="avatar">
                    <img src={avatarUrl} alt="avatar"/>
                </div>
                <p className="username">{username}</p>
                <p className="msg"><span>正在等对方接受邀请...</span></p>

                <div className="call-footer">
                    <div className="call-btn" onClick={() => this.handleClick('hangup')}>
                        <img className="call-btn-icon" src={RefuseImage} alt="btn"/>
                        <p>挂断</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CallTo;
