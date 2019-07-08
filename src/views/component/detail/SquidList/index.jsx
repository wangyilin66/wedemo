import React, { Component, } from 'react';
import './index.scss';
class SquidList extends Component {
    render() {
        return (
            <div className="devicesChild">
                <h3>第一小队：</h3>
                <div className="contentDev">
                    <div className="devPhone">
                        <span>A隊友</span>
                        <span>B车辆</span>
                        <span>C设备</span>
                        <span>A车辆</span>
                        <span>C设备</span>
                        <span>C人员</span>
                    </div>
                    <div className="devPhone">
                        <span>A隊友</span>
                        <span>B车辆</span>
                        <span>C设备</span>
                        <span>A车辆</span>
                        <span>C设备</span>
                        <span>C人员</span>
                    </div>
                    <div className="devPhone">
                        <span>A隊友</span>
                        <span>B车辆</span>
                        <span>C设备</span>
                        <span>A车辆</span>
                        <span>C设备</span>
                        <span>C人员</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SquidList;
