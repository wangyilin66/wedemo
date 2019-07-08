import React, { Component } from 'react'
import './monitoring-more.css'; // css样式
import axios from 'axios'
import { Pagination, DatePicker, Input, Slider, Select } from 'antd'
const { RangePicker } = DatePicker;
const { Search, TextArea } = Input;
const { Option } = Select;
const mainSrc = require('./rpi_car.MP4')
const userName = '张宏'

class componentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videoList: [],
            playVideo: false,
            status: false,
            volume: 100,
            volumeRange: false,
            total: 0,
            pageSize: 40,
            pageNumber: 1,
            startTime: '',
            endTime: '',
            devId: '',
            time: '',
            caseName: '',
            caseList: [],
            videoSrc: '',
            remark: '',
            videoMarkList: []
        }
    }

    componentDidMount() {
        // BM.Config.HTTP_URL = 'http://www.bigemap.com:9000';
        // 在ID为map的元素中实例化一个地图，并设置地图的ID号为 bigemap.googlemap-streets，ID号程序自动生成，无需手动配置，并设置地图的投影为百度地图 ，中心点，默认的级别和显示级别控件
        // var map = BM.map('map', 'bigemap.googlemap-streets', { center: [39.9023974684,116.4056851466], zoom: 10, zoomControl: true });
    }

    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            startTime: dateString[0].replace(/-/g, '/'),
            endTime: dateString[1].replace(/-/g, '/')
        })
    }

    playVideo = (item) => {
        const videoSrc = item.videoUrl;
        // const videoSrc = mainSrc;
        this.setState({
            videoSrc,
            playVideo: true
        })
    }

    vidplay = () => {
        var video = this.refs.mainVideo;
        const { status } = this.state;
        if(video.paused) {
            video.play();
            this.setState({
                status: !status
            })
        }else{
            video.pause();
            this.setState({
                status: !status
            })
        }
    }
    
    skip = (value) => {
        var video = this.refs.mainVideo;
        // var video = document.getElementById("mainVideo");
        video.currentTime += value;
    }

    volume = () => {
        const { volumeRange } = this.state;
        this.setState({
            volumeRange: !volumeRange
        })
    }

    download = () => {
        var video = this.refs.mainVideo;
        return video.buffered
    }

    handleVolume = (value) => {
        var video = this.refs.mainVideo;
        video.volume = value/100;
        this.setState({
            volume: value/100
        })
    }

    addMark() {
        const video = this.refs.mainVideo;
        const { videoMarkList, remark } = this.state;
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
        videoMarkList.push(obj);
        this.setState({
            videoMarkList,
            remark: ''
        })
    }

    handleChange = (e) => {
        this.setState({
            remark: e.target.value
        })
    }

    handleSelectChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    gotoTime = (time) => {
        const video = this.refs.mainVideo;
        video.currentTime = time;
    }

    closeDialog = () => {
        this.setState({
            playVideo: false
        })
    }

    onSearch = (value) =>{
        this.setState({
            devId: value
        }, ()=>{
            this.getData()
        })
    }

    getData () {
        const { startTime, endTime, devId, pageSize, pageNumber } = this.state;
        const sTime = encodeURIComponent(startTime);
        const eTime = encodeURIComponent(endTime);
        console.log(sTime,eTime)
        const _this = this;
        axios.get('http://39.98.37.28:8085/command/combat/getVideoHistoryListByDevIdAndTime?devId=' + devId + 
            '&startTime=' + startTime + '&endTime=' + endTime + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber).then((response)=>{
            const total = (pageNumber - 1) * pageSize + response.data.length
            _this.setState({
                videoList: response.data,
                total
            })
        })
    }

    onPageChange = (page, pageSize) => {
        this.setState({
            pageNumber: page
        }, ()=>{
            this.getData()
        })
    }

    render () {
        const { videoList, playVideo, volume, volumeRange, videoMarkList, status, 
            videoSrc, remark, caseList, total, pageSize, pageNumber } = this.state

        return (
            <div className="monitor-more">
                <div className="monitor-search">
                    <RangePicker 
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder={['请输入开始时间', '请输入结束时间']}
                        onChange={this.onChange.bind(this)}
                    />
                    <Search
                        placeholder="请输入设备编号进行查询"
                        onSearch={this.onSearch}
                        // onSearch={value=>console.log(value)}
                        style={{ width: 250 }}
                    />
                    <Select placeholder="请选择时间段" className="custom-select" onChange={this.handleSelectChange.bind(this,'time')}>
                        <Option value="最近三天">最近三天</Option>
                        <Option value="最近一周">最近一周</Option>
                        <Option value="最近一个月">最近一个月</Option>
                    </Select>
                    <Select placeholder="请选择案件" className="custom-select" onChange={this.handleSelectChange.bind(this,'caseName')}>
                        {
                            caseList.map(item=>{
                                return (
                                    <Option value={item.caseValue}>{item.caseName}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className="more-content">
                    集中监控
                    <ul className="video-list">
                        {
                            videoList.map(item=>{
                                return (
                                    <li onClick={this.playVideo.bind(this,item)}>
                                        <img src={item.photoUrl} width="100%" height="100%"/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <Pagination 
                        size="small"
                        total={total}
                        pageSize={pageSize}
                        current={pageNumber} 
                        // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    />
                </div>
                <div className={`dialog ${playVideo ? '' : 'hide'} `}>
                    <div className="close" onClick={this.closeDialog.bind(this)}>x</div>
                    <video 
                        id="mainVideo"
                        width="500"
                        height="400"
                        ref="mainVideo"
                        src={videoSrc}
                    >
                    </video>
                    <div className="buttonDiv">
                        <button id="rew" onClick={this.skip.bind(this,-10)}></button>
                        <button id="play" className={`${status?'zanting':''}`} onClick={this.vidplay.bind(this)}></button>
                        <button id="fastFwd" onClick={this.skip.bind(this,10)}></button>
                        <button id="volume" onClick={this.volume.bind(this)}>
                            <Slider vertical disabled={false} defaultValue={volume} onChange={this.handleVolume}
                                className={`volumeSlider ${volumeRange?'':'hide'}`}
                            />
                        </button>
                        <a id="download" href={videoSrc} download="111"></a>
                    </div>
                    <div className="video-right">
                        <ul className="more-markList">
                            {
                                videoMarkList.map(item=>{
                                    return (
                                        <li onClick={this.gotoTime.bind(this,item.time)}>{item.commentTime} {item.commenter}标注了“{item.comment}”</li>
                                    )
                                })
                            }
                        </ul>
                        <TextArea className="more-remark" placeholder="请输入备注信息：" onChange={this.handleChange} value={remark}/>
                        <button onClick={this.addMark.bind(this)}>提交</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default componentName