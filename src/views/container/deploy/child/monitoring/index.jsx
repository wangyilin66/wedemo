import React, { Component, } from 'react';
import './index.css'; // css样式
import { Tree, Slider, } from 'antd';
const { TreeNode, } = Tree;

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btn: true,
            cameraNo: 'dzm-001-03',
            control: '1',
            luminosity: 100,
            transparency: 100,
            tone: 100,
            saturation: 100,
            frameRate: 100,
            definition: 100,
            commentList: [{
                id: 1,
                commentTime: '2019-05-23 19:18:00',
                commenter: '宋江',
                comment: '此处很重要',
            }, {
                id: 2,
                commentTime: '2019-05-23 18:18:00',
                commenter: '宋江',
                comment: '此处很重要',
            }, {
                id: 3,
                commentTime: '2019-05-23 17:18:00',
                commenter: '宋江',
                comment: '此处很重要',
            },],
            nearbyList: [{
                commentList: [{
                    id: 1,
                    commentTime: '2019-05-23 19:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                },],
            }, {
                commentList: [{
                    id: 1,
                    commentTime: '2019-05-23 19:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                }, {
                    id: 2,
                    commentTime: '2019-05-23 18:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                }, {
                    id: 3,
                    commentTime: '2019-05-23 17:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                },],
            }, {
                commentList: [{
                    id: 1,
                    commentTime: '2019-05-23 19:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                }, {
                    id: 2,
                    commentTime: '2019-05-23 18:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                }, {
                    id: 3,
                    commentTime: '2019-05-23 17:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                },],
            }, {
                commentList: [{
                    id: 1,
                    commentTime: '2019-05-23 19:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                },],
            }, {
                commentList: [{
                    id: 1,
                    commentTime: '2019-05-23 19:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                },],
            }, {
                commentList: [{
                    id: 1,
                    commentTime: '2019-05-23 19:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                },],
            }, {
                commentList: [{
                    id: 1,
                    commentTime: '2019-05-23 19:18:00',
                    commenter: '宋江',
                    comment: '此处很重要',
                },],
            },],
            gData: [{
                "title": "朝阳区",
                "key": "0-0",
                "children": [{
                    "title": "案件一",
                    "key": "0-0-0",
                    "children": [{
                        "title": "任务一",
                        "key": "0-0-0-0",
                        "children": [{
                            "title": "第一小队",
                            "key": "0-0-0-0-0",
                            "children": [{
                                "title": "设备类型-编号01",
                                "key": "0-0-0-0-0-0",
                            }, {
                                "title": "设备类型-编号02",
                                "key": "0-0-0-0-0-1",
                            }, {
                                "title": "人员A",
                                "key": "0-0-0-0-0-2",
                            },],
                        }, {
                            "title": "第二小队",
                            "key": "0-0-0-0-1",
                            "children": [{
                                "title": "设备类型-编号01",
                                "key": "0-0-0-0-1-0",
                            }, {
                                "title": "设备类型-编号02",
                                "key": "0-0-0-0-1-1",
                            }, {
                                "title": "人员A",
                                "key": "0-0-0-0-1-2",
                            },],
                        },],
                    }, {
                        "title": "任务二",
                        "key": "0-0-0-1",
                        "children": [{
                            "title": "第一小队",
                            "key": "0-0-0-0-0",
                            "children": [{
                                "title": "设备类型-编号01",
                                "key": "0-0-0-0-0-0",
                            }, {
                                "title": "设备类型-编号02",
                                "key": "0-0-0-0-0-1",
                            }, {
                                "title": "人员A",
                                "key": "0-0-0-0-0-2",
                            },],
                        }, {
                            "title": "第二小队",
                            "key": "0-0-0-0-1",
                            "children": [{
                                "title": "设备类型-编号01",
                                "key": "0-0-0-0-1-0",
                            }, {
                                "title": "设备类型-编号02",
                                "key": "0-0-0-0-1-1",
                            }, {
                                "title": "人员A",
                                "key": "0-0-0-0-1-2",
                            },],
                        },],
                    },],
                }, {
                    "title": "案件二",
                    "key": "0-0-1",
                    "children": [{
                        "title": "任务一",
                        "key": "0-0-1-0",
                        "children": [{
                            "title": "第一小队",
                            "key": "0-0-1-0-0",
                            "children": [{
                                "title": "设备类型-编号01",
                                "key": "0-0-1-0-0-0",
                            }, {
                                "title": "设备类型-编号02",
                                "key": "0-0-1-0-0-1",
                            }, {
                                "title": "人员A",
                                "key": "0-0-1-0-0-2",
                            },],
                        }, {
                            "title": "第二小队",
                            "key": "0-0-1-0-1",
                            "children": [{
                                "title": "设备类型-编号01",
                                "key": "0-0-1-0-1-0",
                            }, {
                                "title": "设备类型-编号02",
                                "key": "0-0-1-0-1-1",
                            }, {
                                "title": "人员A",
                                "key": "0-0-1-0-1-2",
                            },],
                        },],
                    }, {
                        "title": "任务二",
                        "key": "0-0-1-1",
                        "children": [{
                            "title": "第一小队",
                            "key": "0-0-1-0-0",
                            "children": [{
                                "title": "设备类型-编号01",
                                "key": "0-0-1-0-0-0",
                            }, {
                                "title": "设备类型-编号02",
                                "key": "0-0-1-0-0-1",
                            }, {
                                "title": "人员A",
                                "key": "0-0-1-0-0-2",
                            },],
                        }, {
                            "title": "第二小队",
                            "key": "0-0-1-0-1",
                            "children": [{
                                "title": "设备类型-编号01",
                                "key": "0-0-1-0-1-0",
                            }, {
                                "title": "设备类型-编号02",
                                "key": "0-0-1-0-1-1",
                            }, {
                                "title": "人员A",
                                "key": "0-0-1-0-1-2",
                            },],
                        },],
                    },],
                },],
            },],
            expandedKeys: ['0-0', '0-0-0', '0-0-0-0',],
            monitorList: [{},],
        };
    }

    componentDidMount() {
        // BM.Config.HTTP_URL = 'http://www.bigemap.com:9000';
        // 在ID为map的元素中实例化一个地图，并设置地图的ID号为 bigemap.googlemap-streets，ID号程序自动生成，无需手动配置，并设置地图的投影为百度地图 ，中心点，默认的级别和显示级别控件
        // var map = BM.map('map', 'bigemap.googlemap-streets', { center: [39.9023974684,116.4056851466], zoom: 10, zoomControl: true });
    }

    expand() {
        const { btn, } = this.state;
        this.setState({
            btn: !btn,
        });
    }

    changeControl(control) {
        this.setState({
            control: control,
        });
    }

    render() {
        const { gData, btn, cameraNo, commentList, monitorList, nearbyList, control,
            luminosity, transparency, tone, saturation, frameRate, definition, } = this.state;

        const loop = data =>
            data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <TreeNode key={item.key} title={item.title}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.key} title={item.title} />;
            });
        return (
            <div className="monitor">
                <div className="monitor-left">
                    <div className="device-info">
                        设备信息
                        <div className="tree">
                            <Tree
                                className="draggable-tree"
                                defaultExpandedKeys={this.state.expandedKeys}
                            >
                                {loop(gData)}
                            </Tree>
                        </div>
                    </div>
                    <div id="mapB" className="mapB"></div>
                </div>
                <div className="monitor-middle">
                    <ul className="monitor-list">
                        {
                            monitorList.map(item => {
                                return (
                                    <li>
                                        <video width="260" height="160" autoPlay>
                                            <source src={item.src} type="video/mp4" />
                                            您的浏览器不支持 HTML5 video 标签。
                                        </video>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className={`btn ${btn ? 'shouqi' : 'tankai'}`} onClick={this.expand.bind(this)}></div>
                <div className={`monitor-right ${btn ? '' : 'hide'}`} >
                    集中监控
                    <div className="content">
                        <video width="704" height="400" autoPlay>
                            <source src='' type="video/mp4" />
                            您的浏览器不支持 HTML5 video 标签。
                        </video>
                        <div className="video-right">
                            <p>摄像头编号：{cameraNo}</p>
                            <ul className="video-control">
                                <li className={`${control === '1' ? 'active' : ''}`} onClick={this.changeControl.bind(this, '1')}>云台控制</li>
                                <li className={`${control === '2' ? 'active' : ''}`} onClick={this.changeControl.bind(this, '2')}>视频控制</li>
                            </ul>
                            <div className={`video-content ${control === '1' ? '' : 'hide'}`}>
                                <div className="yuntai-left">
                                    <div className="shang"></div>
                                    <div className="you"></div>
                                    <div className="xia"></div>
                                    <div className="zuo"></div>
                                    <div className="zhong"></div>
                                </div>
                                <div className="yuntai-right">
                                    <p><span>缩放</span><span className="anniu"><i className="jia"></i></span><span className="anniu"><i className="jian"></i></span></p>
                                    <p><span>光圈</span><span className="anniu">大</span><span className="anniu">小</span></p>
                                    <p><span>聚焦</span><span className="anniu">近</span><span className="anniu">远</span></p>
                                    <p><span>速度</span><Slider defaultValue={30} disabled={false} /></p>
                                </div>
                                <div className="yuntai-left-bottom">
                                    <p><span>扫描</span><span className="anniu">启</span><span className="anniu">停</span></p>
                                    <p><span>红外</span><span className="anniu">启</span><span className="anniu">停</span></p>
                                </div>
                                <div className="yuntai-right-bottom">
                                    <p><span>巡航</span><span className="anniu">启</span><span className="anniu">停</span></p>
                                    <p><span>雨刷</span><span className="anniu">启</span><span className="anniu">停</span></p>
                                </div>
                            </div>
                            <div className={`video-content  ${control === '2' ? '' : 'hide'} attribute`}>
                                <p>光度：{luminosity}</p>
                                <p>透明度：{transparency}</p>
                                <p>色调：{tone}</p>
                                <p>饱和度：{saturation}</p>
                                <p>帧率：{frameRate}</p>
                                <p>清晰度：{definition}</p>
                            </div>
                            <textarea className="remark" cols="30" rows="10" placeholder="请输入备注信息："></textarea>
                            <button>提交</button>
                        </div>
                        <ul className="brilliant-moment">
                            {
                                commentList.map(item => {
                                    return (
                                        <li>{item.commentTime} {item.commenter}标注了“{item.comment}”</li>
                                    );
                                })
                            }
                        </ul>
                        <div className="nearby"><span>临近视频</span><span>查看更多 >></span></div>
                        <ul className="nearby-list">
                            {
                                nearbyList.map((item, index) => {
                                    if (index > 5) {
                                        return null;
                                    } else {
                                        return (
                                            <li>
                                                <video width="79" height="60" autoPlay>
                                                    <source src='' type="video/mp4" />
                                                    您的浏览器不支持 HTML5 video 标签。
                                                </video>
                                                <ul className={`markList ${(index + 1) % 3 ? '' : 'mr0'}`}>
                                                    <li className="title">标注：</li>
                                                    {
                                                        item.commentList.map(comment => {
                                                            return (
                                                                <li>{comment.commentTime} {comment.commenter}标注了“{comment.comment}”</li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        );
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}


export default componentName;