import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import { Row, Col, } from 'antd';
import './index.scss';

import CallImage from '../../../../../common/images/camera.png';

class CallFrom extends Component {

    constructor() {
        super();
        this.state = {
            userInfo: '',
        };
    }

    componentDidMount() {
        const targetId = this.props.targetId;
        this.fetch(targetId).then((res) => {
            this.setState({
                userInfo: res,
            });
        });
    }

    /**
     * TODO: fetch id 的用户
     */
    fetch(id) {
        return Promise.resolve(1)
            .then(() => ({
                name: '吴用',
                position: '此处是定位实时信息',
                company: '北京市朝阳区XXX分局',
                duty: '警务处处长',
                telephone: '3662155795',
            }));
    }

    handleClick = (type) => {
        this.props.onOperate(type);
    }

    render() {
        const {
            userInfo,
        } = this.state;
        return (
            <div className="call-from-container">

                <div className="user-info">
                    <img className="avatar" src={CallImage} alt="avatar"/>
                    <span className="name">{`${'A队员AAAAAAAAAAA'}邀请你进行视频通话`}</span>
                </div>

                <img className="call-image" src={CallImage} alt="camera"/>

                <div className="call-footer">
                    <div className="call-btn accept active" onClick={() => this.handleClick('accept')}>
                        接听
                    </div>
                    <div className="call-btn refuse" onClick={() => this.handleClick('refuse')}>
                        拒绝
                        {/*<img className="call-btn-icon" src={VideoImage} alt="btn"/>*/}
                    </div>
                </div>
            </div>
        );
    }
}

// CallFrom.

export default CallFrom;
