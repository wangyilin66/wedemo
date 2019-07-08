import React, { Component, } from 'react';
import './monitoring.css'; // css样式
import axios from 'axios';
import { Tree, Slider, Input, } from 'antd';
import $ from 'jquery';
import { async, } from 'q';
const { TreeNode, } = Tree;
const { TextArea, } = Input;
const iconCameraUrl = require( '../../../../common/monitor-img/icon_shexiang.png');
const iconShebeiUrl = require( '../../../../common/monitor-img/icon_shebei.png');
const linjinPhoto = require( '../../../../common/monitor-img/shipin.png');
const mainSrc = require('./rpi_car.MP4');
const userName = '张宏';
const agentId = "stargWeHN8Y7";

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // videoMeetingMsgWindow: new MyMsgWindow("videoMeetingMsgWindow", this.videoLiveInputMsgCallBack),
            currRoom: null,
            selectVideoMeetingIndex: -1,
            newVideoId: '',
            videoRef: [],
            status: false,
            volume: 100,
            volumeRange: false,
            map: null,
            deviceList: [],
            btn: true,
            remark: '',
            cameraNo: 'dzm-001-03',
            control: '1',
            luminosity: 100,
            transparency: 100,
            tone: 100,
            saturation: 100,
            frameRate: 100,
            definition: 100,
            commentList:  [{
                time: 1,
                commentTime: '2019-05-23 19:18:00',
                commenter: '宋江',
                comment: '此处很重要',
            },{
                time: 2,
                commentTime: '2019-05-23 18:18:00',
                commenter: '宋江',
                comment: '此处很重要',
            },{
                time: 3,
                commentTime: '2019-05-23 17:18:00',
                commenter: '宋江',
                comment: '此处很重要',
            },],
            nearbyList: [],
            gData: [{
                "title":"朝阳区",
                "key":"0-0",
                "children":[{
                    "title":"案件一",
                    "key":"0-0-0",
                    "children":[{
                        "title":"任务一",
                        "key":"0-0-0-0",
                        "children":[{
                            "title":"第一小队",
                            "key":"0-0-0-0-0",
                            "children":[{
                                "title":"设备类型-编号01",
                                "key":"0-0-0-0-0-0",
                                "type": "camera",
                                "lng":39.90,
                                "lat":116.40,
                            },{
                                "title":"设备类型-编号02",
                                "key":"0-0-0-0-0-1",
                                "type": "shebei",
                                "lng":40.00,
                                "lat":116.50,
                            },{
                                "title":"人员A",
                                "key":"0-0-0-0-0-2",
                            },],
                        },{
                            "title":"第二小队",
                            "key":"0-0-0-0-1",
                            "children":[{
                                "title":"设备类型-编号01",
                                "key":"0-0-0-0-1-0",
                                "type": "camera",
                                "lng":39.91,
                                "lat":116.51,
                            },{
                                "title":"设备类型-编号02",
                                "key":"0-0-0-0-1-1",
                                "type": "shebei",
                                "lng":40.92,
                                "lat":116.52,
                            },{
                                "title":"人员A",
                                "key":"0-0-0-0-1-2",
                            },],
                        },],
                    },{
                        "title":"任务二",
                        "key":"0-0-0-1",
                        "children":[{
                            "title":"第一小队",
                            "key":"0-0-0-0-0",
                            "children":[{
                                "title":"设备类型-编号01",
                                "key":"0-0-0-0-0-0",
                                "type": "shebei",
                                "lng":39.93,
                                "lat":116.53,
                            },{
                                "title":"设备类型-编号02",
                                "key":"0-0-0-0-0-1",
                            },{
                                "title":"人员A",
                                "key":"0-0-0-0-0-2",
                            },],
                        },{
                            "title":"第二小队",
                            "key":"0-0-0-0-1",
                            "children":[{
                                "title":"设备类型-编号01",
                                "key":"0-0-0-0-1-0",
                            },{
                                "title":"设备类型-编号02",
                                "key":"0-0-0-0-1-1",
                            },{
                                "title":"人员A",
                                "key":"0-0-0-0-1-2",
                            },],
                        },],
                    },],
                },{
                    "title":"案件二",
                    "key":"0-0-1",
                    "children":[{
                        "title":"任务一",
                        "key":"0-0-1-0",
                        "children":[{
                            "title":"第一小队",
                            "key":"0-0-1-0-0",
                            "children":[{
                                "title":"设备类型-编号01",
                                "key":"0-0-1-0-0-0",
                            },{
                                "title":"设备类型-编号02",
                                "key":"0-0-1-0-0-1",
                            },{
                                "title":"人员A",
                                "key":"0-0-1-0-0-2",
                            },],
                        },{
                            "title":"第二小队",
                            "key":"0-0-1-0-1",
                            "children":[{
                                "title":"设备类型-编号01",
                                "key":"0-0-1-0-1-0",
                            },{
                                "title":"设备类型-编号02",
                                "key":"0-0-1-0-1-1",
                            },{
                                "title":"人员A",
                                "key":"0-0-1-0-1-2",
                            },],
                        },],
                    },{
                        "title":"任务二",
                        "key":"0-0-1-1",
                        "children":[{
                            "title":"第一小队",
                            "key":"0-0-1-0-0",
                            "children":[{
                                "title":"设备类型-编号01",
                                "key":"0-0-1-0-0-0",
                            },{
                                "title":"设备类型-编号02",
                                "key":"0-0-1-0-0-1",
                            },{
                                "title":"人员A",
                                "key":"0-0-1-0-0-2",
                            },],
                        },{
                            "title":"第二小队",
                            "key":"0-0-1-0-1",
                            "children":[{
                                "title":"设备类型-编号01",
                                "key":"0-0-1-0-1-0",
                            },{
                                "title":"设备类型-编号02",
                                "key":"0-0-1-0-1-1",
                            },{
                                "title":"人员A",
                                "key":"0-0-1-0-1-2",
                            },],
                        },],
                    },],
                },],
            },],
            expandedKeys: ['0-0', '0-0-0', '0-0-0-0',],
        };
    }

    componentDidMount() {
        window.BM.Config.HTTP_URL = 'http://www.bigemap.com:9000';
        // 在ID为map的元素中实例化一个地图，并设置地图的ID号为 bigemap.googlemap-streets，ID号程序自动生成，无需手动配置，并设置地图的投影为百度地图 ，中心点，默认的级别和显示级别控件
        var map = window.BM.map('monitorMap', 'bigemap.googlemap-satellite', { center: [39.9023974684,116.4056851466,], zoom: 10, zoomControl: true, });
        // const { gData } = this.state;
        let treeData = [];
        const _this = this;
        this.$axios({        
            method:"get",
            url:"http://39.98.37.28:8085/command/combat/getAllCaseList", 
            params: {
                
            },       
        }).then((res)=>{
            treeData = treeData.concat(res.data);
            treeData.map(item => {
                _this.$axios({        
                        method:"get",
                        url:"http://39.98.37.28:8085/command/combat/getMissionListByCaseId", 
                        params: {
                            caseId: item.id,
                        },       
                    }).then((res)=>{
                    item.caseList = res.data;
                })
            })
            setTimeout(()=>{
                console.log(treeData);
                const list = [];
                _this.findDevice(treeData, list);
                var video = _this.refs.mainVideo;
                const volume = video.volume * 100;
                console.log(list);
                _this.setState({
                    map,
                    gData: treeData,
                    deviceList: list,
                    volume,
                }, ()=>{
                    _this.setMarker();
                });
            }, 1000)
        });
    }

    findDevice = (data, deviceList) => {
        data.map( item => {
            if(item.caseList){
                item.caseList.map(caseI => {
                    if(caseI.teamList) {
                        caseI.teamList.map(team => {
                            if(team.deviceList){
                                team.deviceList.map(device=>{
                                    deviceList.push(device);
                                });
                            }
                        });
                    }
                });
            }
        });
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

    setMarker = () => {
        const { deviceList, } = this.state;
        console.log(deviceList);
        const _this = this;
        deviceList.map((item,index)=>{
            let marker, { currRoom, selectVideoMeetingIndex, } = this.state;
            const { map, } = this.state;
            if(item.type === "camera"){
                marker = window.BM.marker(window.BM.latLng(item.lng,item.lat),{icon:window.BM.icon({iconUrl:iconCameraUrl,}),}).addTo(map);
            }else if(item.type === "shebei"){
                marker = window.BM.marker(window.BM.latLng(item.lng,item.lat),{icon:window.BM.icon({iconUrl:iconShebeiUrl,}),}).addTo(map);
            }
            marker && marker.on("click", function(e){

            });
        });
    }

    onSelect = (selectedKey, info) => {
        console.log(info.node.props)
        const _this = this
        if(info.node.props.isLeaf){
            // this.getVideoLive(info.node.props.eventKey)
            this.$axios({        
                method:"get",
                url:"http://39.98.37.28:8085/command/combat/getVideoHistoryListByDevIdAndTime", 
                params: {
                    // devId: info.node.props.eventKey,
                    devId: 'y002',
                    // startTime: '',
                    // endTime: '',
                    pageSize: 10,
                    pageNumber:  1
                },
            }).then((res)=>{
                _this.setState({
                    nearbyList: res.data
                })
            })
        }
        // console.log('selected', selectedKey, info);
        // const list = [];
        // this.findDevice(info.selectedNodes, list);
        // this.setState({
        //     deviceList: [...list,],
        // }, ()=>{
        //     this.setMarker();
        // });
    }

    handleVideoRef = (target) => {
        const { videoRef, } = this.state;
        videoRef.push(target);
        this.setState({
            videoRef,
        });
    }

    enlargeVideo = (index) => {
        const { videoRef, } = this.state;
        
        this.refs.mainVideo.removeAttribute("src");
        this.refs.mainVideo.srcObject = videoRef[index].srcObject;
        this.refs.mainVideo.play();
        this.setState({
            status: true,
        });
    }

    playVideo = (item) => {
        const videoSrc = item.videoUrl;
        // const videoSrc = mainSrc;
        this.setState({
            videoSrc,
            status: false,
            commentList: item.commentList,
        });
    }

    vidplay = () => {
        var video = this.refs.mainVideo;
        const { status, } = this.state;
        if(video.paused) {
            video.play();
            this.setState({
                status: !status,
            });
        }else{
            video.pause();
            this.setState({
                status: !status,
            });
        }
    }
    
    skip = (value) => {
        var video = this.refs.mainVideo;
        // var video = document.getElementById("mainVideo");
        video.currentTime += value;
    }

    volume = () => {
        const { volumeRange, } = this.state;
        this.setState({
            volumeRange: !volumeRange,
        });
    }

    handleVolume = (value) => {
        var video = this.refs.mainVideo;
        video.volume = value/100;
        this.setState({
            volume: value/100,
        });
    }

    
    addMark() {
        const video = this.refs.mainVideo;
        const { commentList, remark, } = this.state;
        const obj = {};
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var ds = d.getDate();
        if (ds <= 9) {
            ds = '0' + ds;
        }
        var h = d.getHours();
        if (h <= 9) {
            h = '0' + h;
        }
        var f = d.getMinutes();
        if (f <= 9) {
            f = '0' + f;
        }
        var s = d.getSeconds();
        if (s <= 9) {
            s = '0' + s;
        }
        obj.commentTime = y + '-' + m + '-' + ds + ' ' + h + ':' + f  + ':' + s;
        obj.commenter = userName;
        obj.comment = remark;
        obj.time = video.currentTime;
        commentList.push(obj);
        this.setState({
            commentList,
            remark: '',
        });
    }

    gotoTime = (time) => {
        const video = this.refs.mainVideo;
        video.currentTime = time;
    }

    handleChange = (e) => {
        this.setState({
            remark: e.target.value,
        });
    }

    render () {
        const { gData, btn, cameraNo, commentList, nearbyList, control, status, volume, volumeRange,
            luminosity, transparency, tone, saturation, frameRate, definition, videoSrc, remark, newVideoId } = this.state;

        const loop = data =>
            data.map(item => {
                if ((item.caseList && item.caseList.length) || (item.teamList && item.teamList.length) ||(item.deviceList && item.deviceList.length)) {
                    return (
                        <TreeNode key={item.id} title={item.name}>
                            {loop(item.caseList || item.teamList || item.deviceList)}
                        </TreeNode>
                    );
                }
                if(item.deviceName){
                    return <TreeNode key={item.id} title={item.deviceName} isLeaf />;
                }else{
                    return <TreeNode key={item.id} title={item.name} />;
                }
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
                                onSelect={this.onSelect}
                            >
                                {loop(gData)}
                            </Tree>
                        </div>
                    </div>
                    <div id="monitorMap" className="map"></div>
                </div>
                <div className="monitor-middle">
                    <ul className="monitor-list">
                        <li onClick={this.enlargeVideo.bind(this, 0)}><video width="260" height="160" ref={this.handleVideoRef} id={newVideoId}></video></li>
                        <li onClick={this.enlargeVideo.bind(this, 1)}><video width="260" height="160" ref={this.handleVideoRef}></video></li>
                        <li onClick={this.enlargeVideo.bind(this, 2)}><video width="260" height="160" ref={this.handleVideoRef}></video></li>
                        <li onClick={this.enlargeVideo.bind(this, 3)}><video width="260" height="160" ref={this.handleVideoRef}></video></li>
                    </ul>
                </div>
                <div className={`btn ${ btn ? 'shouqi' : 'tankai' }`} onClick={this.expand.bind(this)}></div>
                <div className={`monitor-right ${btn ? '': 'hide'}`} >
                    集中监控
                    <div className="content">
                        <video id="mainVideo" width="704" height="400" ref="mainVideo" src={videoSrc}></video>
                        <div className="buttonDiv">
                            <button id="rew" onClick={this.skip.bind(this,-10)}></button>
                            <button id="play" className={`${status?'zanting':''}`} onClick={this.vidplay.bind(this)}></button>
                            <button id="fastFwd" onClick={this.skip.bind(this,10)}></button>
                            <button id="volume" onClick={this.volume.bind(this)}></button>
                            <Slider vertical disabled={false} defaultValue={volume} onChange={this.handleVolume}
                                className={`volumeSlider ${volumeRange?'':'hide'}`}
                            />
                        </div>
                        <div className="video-right">
                            <p>摄像头编号：{cameraNo}</p>
                            <ul className="video-control">
                                <li className={`${control === '1' ? 'active' : ''}`} onClick={this.changeControl.bind(this,'1')}>云台控制</li>
                                <li className={`${control === '2' ? 'active' : ''}`} onClick={this.changeControl.bind(this,'2')}>视频控制</li>
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
                            <TextArea className="remark" placeholder="请输入备注信息：" onChange={this.handleChange} value={remark}/>
                            <button onClick={this.addMark.bind(this)}>提交</button>
                        </div>
                        <ul className="brilliant-moment">
                            {
                                commentList.map(item=>{
                                    return (
                                        <li onClick={this.gotoTime.bind(this,item.time)}>{item.commentTime} {item.commenter}标注了“{item.comment}”</li>
                                    );
                                })
                            }
                        </ul>
                        <div className="nearby"><span>临近视频</span><span onClick={()=>this.props.history.push("/deploy/monitoringMore")}>查看更多 >></span></div>
                        <ul className="nearby-list">
                            {
                                nearbyList.slice(0,5).map((item,index)=>{
                                        return (
                                            <li>
                                                {/* <video width="79" height="60" autoPlay>
                                                        <source src='' type="video/mp4" />
                                                        您的浏览器不支持 HTML5 video 标签。
                                                    </video> */}
                                                <img src={item.photoUrl} width="79" height="60" onClick={this.playVideo.bind(this,item)} />
                                                <ul className={`markList ${(index+1)%3 ? '' : 'mr0'}`}>
                                                    <li className="markTitle">标注：</li>
                                                    {
                                                        item.commentList && item.commentList.map(comment=>{
                                                            return (
                                                                <li>{comment.commentTime} {comment.commenter}标注了“{comment.comment}”</li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        );
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