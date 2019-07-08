import React, { Component, } from 'react';
import "./index.css";
import { Icon, message, Tree, DatePicker, } from 'antd';
import moment from 'moment';
import { connect, } from 'react-redux';
//地图动画包
import './bm.geometryutil.js';
//IM模块引入
import SlideIm from '../../Im/js/index.js';
import PlayBackBox from './component/play_back_box.js';
import { login, } from '../../../store/action/starRtc.js';
import Carpic from './img/common_icon_gongzuocheliang.png';
import peoplepic from './img/common_icon_gongzuorenyuan.png';
import machinepic from './img/common_icon_gongzuoshebei.png';
import car from '../../../common/img/car.png';
// import "./mouse_draw/Bigemap.draw.js";
// import "./mouse_draw/Bigemap.Draw.Event.js";
// import "./mouse_draw/draw/handler/Draw.Feature.js";
// import "./mouse_draw/draw/handler/Draw.Polyline.js";
// import "./mouse_draw/draw/handler/Draw.Polygon.js";
// import "./mouse_draw/draw/handler/Draw.SimpleShape.js";
// import "./mouse_draw/draw/handler/Draw.Rectangle.js";
// import "./mouse_draw/draw/handler/Draw.Circle.js";
// import "./mouse_draw/draw/handler/Draw.Marker.js";
// import "./mouse_draw/draw/handler/Draw.CircleMarker.js";
// import "./mouse_draw/edit/handler/Edit.Poly.js";
// import "./mouse_draw/edit/handler/Edit.SimpleShape.js";
// import "./mouse_draw/edit/handler/Edit.Rectangle.js";
// import "./mouse_draw/edit/handler/Edit.Marker.js";
// import "./mouse_draw/edit/handler/Edit.CircleMarker.js";
// import "./mouse_draw/edit/handler/Edit.Circle.js";
// import "./mouse_draw/ext/TouchEvents.js";
// import "./mouse_draw/ext/LatLngUtil.js";
// import "./mouse_draw/ext/LineUtil.Intersect.js";
// import "./mouse_draw/ext/Polyline.Intersect.js";
// import "./mouse_draw/ext/Polygon.Intersect.js";
// import "./mouse_draw/Control.Draw.js";
// import "./mouse_draw/Tooltip.js";
// import "./mouse_draw/draw/DrawToolbar.js";
// import "./mouse_draw/edit/EditToolbar.js";
// import "./mouse_draw/edit/handler/EditToolbar.Edit.js";
// import "./mouse_draw/edit/handler/EditToolbar.Delete.js";


const { TreeNode, } = Tree;
const { RangePicker, } = DatePicker;

class map extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            showtitle: '',
            latime: 20190611,
            laname: null,
            namelis: null,
            filingTime: null,
            search: null,
            searchList: [],
            searchMessage: "没有查找到搜索内容",
            searchflag: false,
            idlist: [],
            taplist: [true, true, true, true, true,],
            slidelist: [true, true, true, true, true,],
            personnellist: [],
            arr1: [],
            Imshow: false,
            slide_left: 370,
            messageInfo: 1,
            tablist: [
                { inner: "聊天记录", id: 0, },
                { inner: "通讯录", id: 1, },
                { inner: "设备情况", id: 2, },
            ],
            currentIndex: 0,
            hideall: false,
            carflag: false,
            userflag: false,
            depflag: false,
            playbacklist: [],
            cardata: {
                "carlist":
                    [{ number: "123457", unit: "华东野战军1", driver: "张学友", phone: "13866457712", lat: 39.90499582805964, lng: 116.37130733332599, },
                        { number: "177777", unit: "华东野战军2", driver: "王杰", phone: "13866457712", lat: 39.98895805956577, lng: 116.26577854156496, },
                        { number: "666666", unit: "华东野战军3", driver: "张三", phone: "13866457712", lat: 39.91737289576941, lng: 116.32083892822267, },
                        { number: "555555", unit: "华东野战军4", driver: "李四", phone: "13866457712", lat: 39.8101184420615, lng: 116.45919799804689, },
                        { number: "444444", unit: "华东野战军5", driver: "王二", phone: "13866457712", lat: 39.89867473290113, lng: 116.5312957763672, },
                    ],
            },
            carList: [],
            carmarkerlist: [],
            userList: [],
            usermarkerlist: [],
            deviceList: [],
            devicemarkerlist: [],
            markerList: [],
            allNameList: [],
            RtcId:null,
            treeData:[],
            playList:{},
            playflaglist:[],
            play_off_flag:true,
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
            expandedKeys: ['0-0', '0-0-0',],
        });
    }

    //地图搜索框 键盘按下事件
    inpchange = (v) => {
        this.setState({
            searchflag: true,
        });
        let val = v.target.value;
        this.state.search = val;
        let newIdList = this.state.searchList;
        let idlists = this.state.idlist;

        if (val !== '') {
            newIdList = idlists.filter((item) => {

                if (item.indexOf(val) > -1) {
                    return item;
                }
            });
            this.state.searchList = newIdList;
            if (newIdList.length > 0) {
                this.state.searchMessage = "";
                this.setState({
                    searchflag: true,
                });
            } else {
            }
        } else {
            this.state.searchMessage = "没有查找到搜索内容";
            this.setState({
                searchflag: false,
            });
        }
    }
    //点击模糊搜索列表，替换输入框的内容
    tosearch = (val) => {
        this.refs.search.value = val;
    }

    //按钮鼠标按下事件，按下替换背景图。
    mouseDown = (ind, s) => {
        let newS = s;
        if (newS[ind] === true) {
            newS[ind] = false;
            this.setState({
                s: newS,
            });
        } else {
            newS[ind] = true;
            this.setState({
                s: newS,
            });
        }

    }


    componentWillMount() {

    }

    componentDidUpdate() {

        //this.bigmap.panTo(window.BM.latLng(Number(position.lag),Number(position.lat)), {animate: true, duration: 0.5});
    }

    componentWillReceiveProps(nextProps) {
        // if(nextProps.position)
        console.log(this.props.moveTopos.position);
        let position = this.props.moveTopos.position;
        console.log('redux de  值' + Number(position.lag), Number(position.lat));
        //console.log(position);
        //this.bigmap.panTo(window.BM.latLng(position.lag,position.lng), {animate: true, duration: 0.5});
    }


    //遍历所有的图标实例，给每一个图标添加一个点击和右击事件
    gcarr = () => {
        this.state.markerList.map((v, i) => {
            let that = this;
            v.on('click', function (e) {
                let classlist = e.target._icon.classList[0];
                that.bigmap.panTo(window.BM.latLng(e.latlng.lat, e.latlng.lng), { animate: true, duration: 0.5, });
                that.state.markerList.map((val, ind) => {
                    if(val._tooltip._content === e.target._tooltip._content){
                        let iconname = e.target._tooltip._content;
                        that.state.allNameList.map((val2,ind2) =>{
                       
                            if(val2.realName === iconname){
                                that.setState({
                                    RtcId:val2.userId,
                                });
                                console.log("配对成功，开始呼叫RTC ID 为" + val2.userId + "的用户");
                            }
                        });
                    }

                    if (val._latlng.lat === e.latlng.lat && val._latlng.lng === e.latlng.lng) {
                        console.log(val);
                        that.refs.popupli3.innerHTML = '驾驶员：' + val._tooltip._content;
                        that.refs.popupbox.style.display = "block";
                    }
                });
            });
            v.on('contextmenu', function (e) {
                console.log("右键图标了。");
                let mapright = document.querySelector('.picright');
                mapright.style.display = 'block';
                mapright.style.left = e.containerPoint.x - 40 + 'px';
                mapright.style.top = e.containerPoint.y + 0 + 'px';
                let sendplace = document.querySelector('.sendplace');
                sendplace.onclick = () => {
                    alert('X轴： ' + e.latlng.lat + 'y 轴：' + e.latlng.lng);
                    that.props.sendPos();
                };

            });


        });
    };

    //接受所有的资源数据，根据传入的值，渲染对应的地图图标
    map_add_icon = (carlist, devicelist, userlist, flag) => {

        let carlaglng = [
                { lag: 39.95580659996906, lng: 116.31706641665451, },
                { lag: 39.89393354266699, lng: 116.27243734699256, },
                { lag: 39.834640993640946, lng: 116.21681412845375, },

            ], devicelaglng = [
                { lag: 40.03812939078128, lng: 116.4839216255823, },
                { lag: 40.12271570320351, lng: 116.6892153460273, },
                { lag: 40.17310224346642, lng: 116.27931450620899, },
                { lag: 39.10080659996906, lng: 116.99906641665451, },
                { lag: 39.87093354266699, lng: 116.45553734699256, },
            ], userlaglng = [
                { lag: 39.75580659996906, lng: 116.11706641665451, },
                { lag: 39.81093354266699, lng: 116.27853734699256, },
                { lag: 39.754640993640946, lng: 116.21681412845375, },
                { lag: 39.87285761791617, lng: 116.4887163685731, },
                { lag: 39.513354266699, lng: 116.403734699256, },
                { lag: 39.74640993640946, lng: 116.281412845375, },

            ];
 
        switch(flag){
        case 'c':
            carlist.map((cval, cind) => {
                var myIcon1 = window.BM.icon({
                    iconUrl: Carpic,
                    iconSize: [56, 44,],
                    iconAnchor: [32, 70,],
                    popupAnchor: [-3, -76,],
                    shadowSize: [0, 0,],
                    shadowAnchor: [22, 94,],
                    tooltipAnchor: [24, -50,],
                });
                let icons = window.BM.marker([carlaglng[cind].lag, carlaglng[cind].lng,], { icon: myIcon1, }).addTo(this.bigmap);
                icons.bindTooltip(cval.driver);
                let carmarkerlist = this.state.carmarkerlist;
                let markerList = this.state.markerList;
                this.setState({
                    carmarkerlist: [...carmarkerlist, icons,],
                    markerList: [...markerList, icons,],
                });
            });    
            break;
        case 'd':
            devicelist.map((dval, dind) => {
                var myIcon1 = window.BM.icon({
                    iconUrl: machinepic,
                    iconSize: [56, 44,],
                    iconAnchor: [32, 70,],
                    popupAnchor: [-3, -76,],
                    shadowSize: [0, 0,],
                    shadowAnchor: [22, 94,],
                    tooltipAnchor: [24, -50,],
                });
                let icons = window.BM.marker([devicelaglng[dind].lag, devicelaglng[dind].lng,], { icon: myIcon1, }).addTo(this.bigmap);
                icons.bindTooltip(dval.deviceName);
                let devicemarkerlist = this.state.devicemarkerlist;
                let markerList = this.state.markerList;
                this.setState({
                    devicemarkerlist: [...devicemarkerlist, icons,],
                    markerList: [...markerList, icons,],
                });
            });
            break;
        case 'u':
            userlist.map((uval, uind) => {
                var myIcon1 = window.BM.icon({
                    iconUrl: peoplepic,
                    iconSize: [56, 44,],
                    iconAnchor: [32, 70,],
                    popupAnchor: [-3, -76,],
                    shadowSize: [0, 0,],
                    shadowAnchor: [22, 94,],
                    tooltipAnchor: [24, -50,],
                });
                let icons = window.BM.marker([userlaglng[uind].lag, userlaglng[uind].lng,], { icon: myIcon1, }).addTo(this.bigmap);
                icons.bindTooltip(uval.realName);
                let usermarkerlist = this.state.usermarkerlist;
                let markerList = this.state.markerList;
                this.setState({
                    usermarkerlist: [...usermarkerlist, icons,],
                    markerList: [...markerList, icons,],
                });
            });
            break;
        }
        //每次渲染完 就重新绑定一次事件
        this.gcarr();
        // this.state.markerList.map((v,i) => {

        // })
    }

    // handleGetCar = () => {

    //     if (carflag) {
    //         carmarker.map((v, i) => {
    //             v.remove();
    //             that.setState({
    //                 carflag: false,
    //             });
    //         });
    //     } else {
    //         let list = that.state.personnellist;
    //         console.log(list);

    //         that.setState({
    //             carflag: true,
    //         });

    //         gcarr();
    //     }

    // }


    

    treeclick = (place, e) => {
        let pbl = this.state.playbacklist;
        let innertext = e.node.props.title;
        console.log(innertext);
        let playlist = this.state.playList;
        console.log(playlist);
        console.log(this.state.allNameList);
        //console.log(innertext);
        if (!pbl.includes(innertext)) {
            pbl.push(innertext);
            this.setState({
                playbacklist: pbl,
            });  
        }
         
        this.state.allNameList.map((v,i) => {
          if(v.driver === innertext || v.deviceName === innertext || v.realName === innertext){
            let k = 'a' + v.userId;
            let ks = v.userId;
            let nams = innertext;
            if(!this.state.playList.k){
                this.$axios({
                    method: "get",
                    url: "http://39.98.37.28:8085/command/combat/getGpsRecordByCaseIdAndTime?caseId=1&startTime=2018-01-1&endTime=2019-10-10",
                }).then((res) => {
                    let arr = [];
                res.userGpsList.map((v,i) => {
                    let ar = [];
                   if(v.userId == ks){
                       //if(i >= 8 && i <= 9){ 
                        ar.push(v.latitude);
                        ar.push(v.longitude);
                        arr.push(ar);    
                      // }
               
                   }
                })
                console.log(arr);
                console.log([arr[8],arr[9]]);
                this.drawLine([...arr,[39.914476331396216,116.56150714676211]],ks,nams);
            });
               }else{
                this.state.playList.a2.marker.pauseMove();
                this.state.playList.a2.marker.remove();
                this.state.playList.a2.polyline.remove();
                delete playlist.a2;
                console.log(playlist);
                this.setState({
                    playList:playlist
                })
               }

          }
        })

        //if (innertext) {
 
       

            // this.setState({
            //     playflaglist:[...this.state.playflaglist,innertext]
            // })
        //}

    }

    timeChange = (value, dateString) => {

    }
    timeOk = (value) => {
        console.log('timeok ：：：：', value);
    }



    range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }


    disabledDate = (current) => {
        // Can not select days before today and today
        console.log(this.state.filingTime);
        let str = this.state.filingTime;
        let newstr = str.slice(0, str.indexOf(' '));
        let arr = newstr.split('-');
        let narr = arr.map((v, i) => {
            return Number(v);
        });
        let arrind = narr[1];
        if (arrind !== '00') {
            --arrind;
        };
        narr[1] = arrind;
        console.log(narr);

        return current && current <= moment(narr);
    }


    hidepopup = () => {
        this.refs.popupbox.style.display = "none";
    }

    callTheRtc = () => {
        console.log('开始拨号');
        let rtcid = this.state.RtcId;
        console.log('发起与id为' + rtcid +'的用户的一对一视频');
        window.a.props.voipCall(String(rtcid));
    }




    componentDidMount() {
        var that = this;
        let carmarker = [];
        //地图配置ip
        window.BM.Config.HTTP_URL = 'http://localhost:9000';
        //生成地图实例
        this.bigmap = window.BM.map('map', 'bigemap.8af4bjs4', { center: [39.90355880302419, 116.39554595927622,], zoom: 16, zoomControl: false, });
        let map = this.bigmap;
        var drawnItems = new window.BM.FeatureGroup();

        //添加在地图上

        map.addLayer(drawnItems);

        //案件详情框数据请求
        this.$axios({
            headers: {
                Authorization: JSON.parse(localStorage.getItem('user')).token,
            },
            method: "get",
            url: "http://39.98.37.28:8085/command/combat/getCaseDetailByTokenAndCaseId?id=5",
        }).then((res) => {
            console.log(res);
            if (res.code === 1) {
                this.setState({
                    showtitle: res.data.name,
                    namelis: res.data.actionObjectList,
                    filingTime: res.data.filingTime,
                    laname: res.data.responsibleName,
                });
            } else {
                console.log('案件详情接口出错');
            }
        });
        //操作纪录 数据请求
        this.$axios({
            method: "get",
            url: "http://39.98.37.28:8085/command/user/getOperationLog?pageSize=5&pageNumber=1",
        }).then((res) => {
            let arr1 = res.data;
            this.setState({ arr1: arr1, });
        });
        //获取历史标记点
        this.$axios({
            method: "get",
            url: "http://39.98.37.28:8085/command/combat/selectMapPointByCondition?caseId=5",
        }).then((res) => {
            if (res.code === 1) {
                let iconlist = [];
                console.log(res.data);
                res.data.map((v, i) => {
                    if (v.caseId == 5) {
                        iconlist.push(v);
                    }
                });
                iconlist.map((v, i) => {
                    var marker = window.BM.marker([v.longitude, v.latitude,], { draggable: false, }).addTo(map);
                    marker.bindTooltip(v.name).openTooltip();
                    marker.bindPopup(`<h2 class='text_h2'>${v.name}</h2><p>${v.remarks1}</p>`);
                    marker.addTo(map);
                });

            }
        });

                //获取车辆 人员 工作设备
                this.$axios({
                    method: "get",
                    url: "http://39.98.37.28:8085/command/combat/getMissionListByCaseId?caseId=5",
                }).then((res) => {
                    let carlist = [], devicelist = [], userlist = [];    
                    this.setState({
                        treeData:res.data,
                    })        
                    if (res.code == 1) {
                        res.data.map((v, i) => {
                            v.teamList.map((val, ind) => {
                                devicelist = [...devicelist, ...val.deviceList];
                                carlist = [...carlist, ...val.carList];
                                userlist = [...userlist, ...val.userList];
                            });
                        });
                        this.setState({
                            carList: carlist,
                            deviceList: devicelist,
                            userList: userlist,
                            allNameList: [...carlist,...devicelist,...userlist],
                        });
                        //this.map_add_icon(carlist, devicelist, userlist);    
                    } else {
                        console.log('任务列表获取失败');
                    };
                });
        // this.$axios({
        //     method: "get",
        //     url: "http://39.98.37.28:8085/command/combat/getMissionListByCaseId?caseId=5",
        // }).then((res) => {

        // })

        let ws = new WebSocket('ws://39.98.37.28:8089/websocket/20');
        let userid = '1';
        let img_flag = false;
        let icon_event = null;
        ws.onmessage = function (evt) {
            let obj = JSON.parse(evt.data);
            console.log("握手事件：接收到数据:", obj);
            that.state.allNameList.map((v,i) => {
                console.log(v.userId);
                if(v.userId == obj.user_id){
                    console.log('配对到了用户' + v.realName);
                    that.state.markerList.map((val,ind) => {
                        if(val._tooltip._content === v.realName){
                            val.setLatLng([Number(obj.lat), Number(obj.lon),]);
                        }
                    });
                }
                 
                
            });
            // if (!img_flag) {
            //     var myIcon = window.BM.icon({
            //         iconUrl: 'http://bpic.588ku.com/element_origin_min_pic/01/30/58/16573b1a8442ae3.jpg',
            //         iconSize: [56, 44,],
            //         iconAnchor: [32, 70,],
            //         popupAnchor: [-3, -76,],
            //         shadowSize: [0, 0,],
            //         tooltipAnchor: [24, -50,],
            //         shadowAnchor: [22, 94,],
            //         className: 'carpng',
            //     });

            //     let icons = window.BM.marker([Number(obj.lat), Number(obj.lon),], { icon: myIcon, }).addTo(map);
            //     icons.bindTooltip('测试图标');
            //     console.log(icons._tooltip._content);
            //     carmarker.push(icons);
            //     icon_event = icons;
            //     img_flag = true;
            // } else {
            //     console.log(icon_event);
            //     icon_event.setLatLng([Number(obj.lat), Number(obj.lon),]);
            // }
        };
        ws.onclose = function () {
            console.log('连接已经关闭');
        };

        // carlist.map((v,i) => {
        //     if(sList.indexOf(v.number) === -1){
        //         sList.push(v.number);
        //         if(sList.indexOf(v.driver) === -1){
        //             sList.push(v.driver);
        //         }
        //     }

        // });

        // this.setState({
        //     idlist:sList,
        // });


        map.on('click', function (e) {
            console.log('lat: ' + e.latlng.lat + ',lng: ' + e.latlng.lng);
            let mapright = document.querySelector('.mapright');
            let picright = document.querySelector('.picright');
            picright.style.display = 'none';
            mapright.style.display = 'none';

        });

        map.on('contextmenu', function (e) {
            console.log('右键地图了');
            let mapright = document.querySelector('.mapright');
            mapright.style.display = 'block';
            mapright.style.left = e.containerPoint.x + 10 + 'px';
            mapright.style.top = e.containerPoint.y + 10 + 'px';
            let textbox = document.querySelector('.map_right_text');
            document.querySelector('.addicon').onclick = () => {
                textbox.style.display = 'block';
                document.querySelector('.map_right_close').onclick = () => {
                    textbox.style.display = 'none';
                    that.refs.map_icon_inp.value = '';
                    that.refs.map_icon_text.value = '';
                };
                document.querySelector('.remove_box').onclick = () => {
                    textbox.style.display = 'none';
                    that.refs.map_icon_inp.value = '';
                    that.refs.map_icon_text.value = '';
                };

                document.querySelector('.add_icon').onclick = () => {
                    let inp = that.refs.map_icon_inp.value;
                    let text = that.refs.map_icon_text.value;
                    console.log(inp, text);
                    if (inp !== '') {
                        var marker = window.BM.marker(e.latlng, { draggable: false, }).addTo(map);
                        marker.bindTooltip(inp).openTooltip();
                        marker.bindPopup(`<h2 className='text_h2'>${inp}</h2><p>${text}</p>`);
                        marker.addTo(map);
                        textbox.style.display = 'none';
                        that.refs.map_icon_inp.value = '';
                        that.refs.map_icon_text.value = '';
                        console.log(e.latlng);
                        that.$axios({
                            method: "post",
                            headers: {
                                Authorization: JSON.parse(localStorage.getItem('user')).token,
                            },
                            url: "http://39.98.37.28:8085/command/combat/addMapPointByToken",
                            params: {
                                longitude: e.latlng.lat,
                                latitude: e.latlng.lng,
                                name: inp,
                                remarks1: text,
                                caseId: 5,
                            },
                        }).then((res) => {
                            if (res.code === 1) {
                                console.log('标注信息上传成功');
                            }
                        });
                    } else {
                        message.info('标注名不能为空');
                    }
                };
            };

        });


        //设置一个变量来保存当前的绘制对象

        //var draw,polygon,circle,square;

        // document.querySelector('#start').onclick= () => {
        //   if (!draw){
        //       draw=new window.BM.Draw.Polygon(map,{repeatMode: true});
        //   }
        //   draw.enable();
        // }

        // document.querySelector('#circle').onclick = () =>{
        // if(!circle){
        //  circle = new window.BM.Draw.Circle(map,{repeatMode: true});
        // }
        // circle.enable()
        // }

        // document.querySelector('#square').onclick = () => {
        // if(!square){
        //   square = new window.BM.Draw.Rectangle(map, {repeatMode: true})
        // }
        // square.enable()
        // }

        document.querySelector('#mapsmall').onclick = () => {
            map.zoomOut();
        };

        document.querySelector('#mapbig').onclick = () => {
            map.zoomIn();
        };

        // carlist.map((v,i) => {
        //     var myIcon = window.BM.icon({
        //         iconUrl: Carpic,
        //         iconSize: [56, 44,],
        //         iconAnchor: [32, 70,],
        //         popupAnchor: [-3, -76,],
        //         shadowSize: [0, 0,],
        //         tooltipAnchor:[24,-50,],
        //         shadowAnchor: [22, 94,],
        //         className:v.number+' carpng',
        //     });

        //     let icons = window.BM.marker([v.lat,v.lng,], {icon: myIcon,}).addTo(map);
        //     icons.bindTooltip(v.driver);
        //     carmarker.push(icons);

        // });
        


        function userShowFlag(userflag){
            let carlist = that.state.carList,
                deviceList = that.state.deviceList,
                userlist = that.state.userList;
            if (userflag) {
                that.state.usermarkerlist.map((v, i) => {
                    v.remove();
                    that.setState({
                        userflag: false,
                    });
                });
            } else {
                that.setState({
                    userflag: true,
                });          
                that.map_add_icon(carlist,deviceList,userlist,'u');
            }
        }


        function depShowFlag(depflag){
            let carlist = that.state.carList,
                deviceList = that.state.deviceList,
                userlist = that.state.userList;
            if (depflag) {
                that.state.devicemarkerlist.map((v, i) => {
                    v.remove();
                    that.setState({
                        depflag: false,
                    });
                });
            } else {
                that.setState({
                    depflag: true,
                });          
                that.map_add_icon(carlist,deviceList,userlist,'d');
            }
        }
       

        function carShowFlag(carflag) {
            let carlist = that.state.carList,
                deviceList = that.state.deviceList,
                userlist = that.state.userList;
            if (carflag) {
                that.state.carmarkerlist.map((v, i) => {
                    v.remove();
                    that.setState({
                        carflag: false,
                    });
                });
            } else {
                that.setState({
                    carflag: true,
                });          
                that.map_add_icon(carlist,deviceList,userlist,'c');
 
                // carlist.map((v, i) => {
                //     var myIcon = window.BM.icon({
                //         //iconUrl: 'http://pic.90sjimg.com/design/00/16/13/58/593501faa65a0.png',
                //         iconUrl: Carpic,
                //         iconSize: [56, 44,],
                //         iconAnchor: [32, 70,],
                //         popupAnchor: [-3, -76,],
                //         shadowSize: [0, 0,],
                //         shadowAnchor: [22, 94,],
                //         tooltipAnchor: [24, -50,],
                //         className: v.number + ' carpng',
                //     });

                //     let icons = window.BM.marker([v.lat, v.lng,], { icon: myIcon, }).addTo(map);
                //     icons.bindTooltip(v.driver);
                //     carmarker.push(icons);

                // });
            }
        }

        document.querySelector('#getcar').onclick = () => {
            let carflag = that.state.carflag;
            carShowFlag(carflag);
        };
        document.querySelector('#getdep').onclick = () => {
            let depflag = that.state.depflag;
            depShowFlag(depflag);
        };
        document.querySelector('#getuser').onclick = () => {
            let userflag = that.state.userflag;
            userShowFlag(userflag);
        };




        //    setTimeout(function () {
        //     map.on(window.BM.Draw.Event.CREATED, function (e) {
        //         var layer = e.layer,type = e.layerType;
        //         console.log(type);
        //         console.log(layer);
        //         layer.on('contextmenu',function (e) { 
        //           this.remove()
        //          })
        //         drawnItems.addLayer(layer);
        //       });
        //     },5000);


        document.querySelector('.pic').onclick = () => {
            let val = document.querySelector('.searchinput').value;
            // let carlist = this.state.cardata.carlist;
            // carlist.map((v, i) => {
            //     Object.keys(v).forEach(key => {
            //         if (val === v[key]) {
            //             map.panTo(window.BM.latLng(v.lat, v.lng), { animate: true, duration: 0.5, });
            //         }
            //     });
            // });

        };

        function draw_line(arr, name, title) {
            console.log(name,title);
            let markers = {};
            let polyline = window.BM.polyline(arr).addTo(map);
            map.fitBounds(polyline.getBounds());
            let m = window.BM.marker(arr[0], {
                icon: window.BM.icon({
                    iconUrl: car,
                    iconAnchor: [25, 15,],
                    iconSize:[52, 26],
                }),
            }).addTo(map);
            m.bindTooltip(title);   
            markers['a'+name] = { marker: m, polyline: polyline,};
             m.moveAlong(polyline,1500);
           //run_draw_line(play_back_list);
           that.setState({
          playList:{...that.state.playList,...markers}
           });
        }
        this.drawLine = draw_line;
        // function run_draw_line(obj) {
        //     Object.keys(obj).map(key => {
        //         return obj[key].marker.moveAlong(obj[key].polyline, 1500);
        //     });
        // }


        window.BM.Marker.addInitHook(function () {
            this.moveOptions = {
                origin: null,
                timer: null,
                done: 0,
                path: null,
                length: 0,
            };
        });


        window.BM.Marker.include({
            moveOptions: {
                origin: null,
                timer: null,
                done: 0,
                path: null,
                length: 0,
            },
            setSpeed: function (speed) {
                this.moveOptions.speed = isNaN(parseFloat(speed)) || parseFloat(speed <= 0) ? 200 : parseFloat(speed);
            },
            getSpeed: function () {
                return this.moveOptions.speed;
            },
            moveAlong: function (path, speed) {
                path = path instanceof window.BM.Polyline ? path : new window.BM.Polyline(path);
                this.moveOptions.path = path;
                this.moveOptions.length = window.BM.GeometryUtil.length(path);
                this.moveOptions.speed = isNaN(parseFloat(speed)) || parseFloat(speed <= 0) ? 200 : parseFloat(speed);
                this._move();
            },
            pauseMove: function () {
                clearInterval(this.moveOptions.timer);
                this.moveOptions.timer = null;
            },
            resumeMove: function () {
                this._move();
            },
            stopMove: function () {
                this.pauseMove();
                this.moveOptions.done = 0;
            },
            _move: function () {
                if (this.moveOptions.timer) return;
                let _t = this;
                this.moveOptions.timer = setInterval(function () {
                    let done = _t.moveOptions.done;
                    done += _t.moveOptions.speed / 1000 * 20;
                    let radio = done / _t.moveOptions.length;
                    if (radio >= 1) {
                        radio = 0;
                        done = 0;
                    }
                    _t.moveOptions.done = done;
                    let p = window.BM.GeometryUtil.interpolateOnLine(_t._map, _t.moveOptions.path, radio);
                    _t.setLatLng(p.latLng);
                    let pre_p = _t.moveOptions.path.getLatLngs()[p.predecessor];
                    if (pre_p) {
                        let deg = window.BM.GeometryUtil.computeAngle(_t._map.project(pre_p), _t._map.project(p.latLng));
                        _t._icon.style.transformOrigin = '50% 50%';
                        _t._icon.style.transform += ' rotateZ(' + deg + 'deg)';
                    }
                }, 20);
            },


        });



        // document.querySelector('#play_back_move2').onclick = () => {
        //     draw_line([
        //         [40.01446846627284, 116.33013320290516,],
        //         [39.86916866504292, 116.31776996242873,],
        //         [39.89129940636717, 116.46681569483917,],
        //         [40.04706582644986, 116.4675025415323,],
        //     ], '张三');
        // };

        // document.querySelector('#play_back_move1').onclick = () => {
        //     draw_line([
        //         [40.26904802805884, 116.28070027384715,],
        //         [40.11693985890127, 116.57044592611402,],
        //         [40.35596325640413, 116.79839748192589,],
        //     ], '张学友');
        // };

        // setInterval(function(){
        //   if(that.state.playbacklist.length === 0){
        //     console.log('回放列表为空')
        //   }else{
        //     that.state.playbacklist.map((v,i) => {
        //          als.map((val,ind) => {
        //               if(v === val.name){
        //                   draw_line(val.lags,v,v);
        //               }
        //          })
        //     })
        //   }
        // },1000);

        console.log(this.state.playbacklist);

        function playboxflag(flag) {
            let butlist = document.querySelector('.but_tap_list');
            let leftmid = document.querySelector('.left_middle');
            let searchinp = document.querySelector('.searchinp');
            let playbox = document.querySelector('.left_play_back_box');
            let imbox = document.querySelector('.imbox');
            let slide = document.querySelector('.slide_tool');
            let backimg = document.querySelector('.return_play_back');
            let playtime = document.querySelector('.play_back_timebox');
            if (flag) {
                that.setState({
                    hideall: true,
                });
                butlist.style.display = 'none';
                leftmid.style.display = 'none';
                searchinp.style.display = 'none';
                playbox.style.display = 'block';
                backimg.style.display = 'block';
                playtime.style.display = 'block';
                if (that.state.Imshow === true) {
                    imbox.style.display = 'none';
                    that.setState({
                        Imshow: false,
                        hideall: true,
                    });
                }
                slide.style.right = '425px';
            } else {
                that.setState({
                    hideall: false,
                });
                butlist.style.display = 'block';
                leftmid.style.display = 'block';
                searchinp.style.display = 'block';
                playbox.style.display = 'none';
                playtime.style.display = 'none';
                backimg.style.display = 'none';
                slide.style.right = '60px';
            }
        }


        document.querySelector('#play_back_move').onclick = () => {
            playboxflag(true);
            carShowFlag(true);
            let tapls = that.state.taplist;
            tapls[1] = true;
            that.setState({
                taplist: tapls,
            });
        };
        document.querySelector('.play_reback').onclick = () => {
            playboxflag(false);
            that.mouseDown(3, that.state.taplist);
        };


        document.querySelector('#imShow').onclick = () => {
            let imbox = document.querySelector('.imbox');
            let slide = document.querySelector('.slide_tool');
            console.log(imbox.style.display);
            if (that.state.Imshow === false) {
                imbox.style.display = 'block';
                slide.style.right = '425px';
                that.setState({
                    Imshow: true,
                });
            } else {
                imbox.style.display = 'none';
                slide.style.right = '60px';
                that.setState({
                    Imshow: false,
                });
            }

        };

        document.querySelector('.left_middle').onclick = () => {
            let mess = that.state.messageInfo;
            var popNotice = function () {
                if (Notification.permission === "granted") {
                    var notification = new Notification("指挥员你好", {
                        body: '你有' + (mess++) + '条新的消息',
                        icon: 'https://cdn.duitang.com/uploads/item/201405/28/20140528183447_UKt5C.thumb.700_0.jpeg',
                    });

                    notification.onclick = function () {
                        notification.close();
                    };
                }
            };

            if (Notification.permission === "granted") {
                popNotice();
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission(function (permission) {
                    popNotice();
                });
            }
            that.setState({
                messageInfo: mess,
            });
        };


        // document.querySelector('.popup').onclick = () => {
        //     that.props.sendUserId();
        //     console.log('发起 redux、 传用户id');
        // };

    }

    offplay = () => {
     
    }
    noplay = () => {

    }


    render() {
        const loop = (data,ind,i) => {
            let trData = data;
            let childind = ind+'-'+i;
            console.log(this.state.treeData);

           let trelis = trData.map(item => {
                function a() {
                    let a = 0;
                    let alis = [];
                    item.deviceList.map((v,i) => {
                        alis.push(<TreeNode key={childind+'-'+a++} title={v.deviceName} />)
                    })               
                    item.userList.map((v,i) => {
                        alis.push(<TreeNode key={childind+'-'+a++} title={v.realName} />)
                   })
                   item.carList.map((v,i) => {
                    alis.push(<TreeNode key={childind+'-'+a++} title={v.driver} />)
                   })
                   return alis
                  }
                  return a();
            })
                      
           return <TreeNode key={ind+'-'+i} title={trData[0].name}>{trelis}</TreeNode>
           
           // }
        }
        return (
            <div className="mapbox">
                <div id="map">
                    <div className='mapright'>
                        <div className="addicon"><Icon className='icons' type="environment" />添加标注</div>
                    </div>

                    <div className='picright'>
                        <div className='sendplace'><Icon className='icons' type="environment" />发送位置</div>
                        <div><Icon className='icons' type="user-delete" />导航</div>
                        <div><Icon className='icons2 icons' type="user-delete" />结束导航</div>
                    </div>
                </div>
                <div className='popup' ref='popupbox'>

                    <span class="popclose" onClick={this.hidepopup} ref='popclose'><Icon type="close" /></span>
                    <ul>
                        <li ref='popupli1'>车辆编号:</li>
                        <li ref='popupli2'>定位:</li>
                        <li ref='popupli3'>驾驶员:</li>
                        <li ref='popupli4'>单位:</li>
                        <li ref='popupli5'>电话:</li>
                    </ul>
                    <img ref='popupimg1' className="call" title="拨号" src={require('./img/tankuang_btn_01.png')}></img>
                    <img ref='popupimg2' className="vid" title="设备视频" src={require('./img/tankuang_btn_03.png')}></img>
                    <img onClick={this.callTheRtc} ref='popupimg3' className="vid2" title="发起视频" src={require('./img/tankuang_btn_04.png')}></img>;

     </div>

                <div className="slide_tool">
                    <ul>
                        <li id="mapsmall" onMouseDown={() => { this.mouseDown(0, this.state.slidelist); }}
                            onMouseUp={() => { this.mouseUp(0, this.state.slidelist); }}>
                            {this.state.slidelist[0] ? <img src={require('../../../common/images/common_icon_n_06.png')}></img>
                                : <img src={require('../../../common/images/common_icon_p_01.png')}></img>}
                        </li>
                        <li id="mapbig" onMouseDown={() => { this.mouseDown(1, this.state.slidelist); }}
                            onMouseUp={() => { this.mouseUp(1, this.state.slidelist); }}>
                            {this.state.slidelist[1] ? <img src={require('../../../common/images/common_icon_n_07.png')}></img>
                                : <img src={require('../../../common/images/common_icon_p_02.png')}></img>}
                        </li>
                        <li id="circle" onMouseDown={() => { this.mouseDown(2, this.state.slidelist); }}
                            onMouseUp={() => { this.mouseUp(2, this.state.slidelist); }}>
                            {this.state.slidelist[2] ? <img src={require('../../../common/images/common_icon_n_08.png')}></img>
                                : <img src={require('../../../common/images/common_icon_p_03.png')}></img>}
                        </li>
                        <li id="square" onMouseDown={() => { this.mouseDown(3, this.state.slidelist); }}
                            onMouseUp={() => { this.mouseUp(3, this.state.slidelist); }}>
                            {this.state.slidelist[3] ? <img src={require('../../../common/images/common_icon_n_09.png')}></img>
                                : <img src={require('../../../common/images/common_icon_p_04.png')}></img>}
                        </li>
                        <li id="start" onMouseDown={() => { this.mouseDown(4, this.state.slidelist); }}
                            onMouseUp={() => { this.mouseUp(4, this.state.slidelist); }}>
                            {this.state.slidelist[4] ? <img src={require('../../../common/images/common_icon_n_10.png')}></img>
                                : <img src={require('../../../common/images/common_icon_p_05.png')}></img>}
                        </li>
                    </ul>

                </div>


                <div className="but_tap_list">
                    <ul>
                        <li id="getuser" onClick={() => { this.mouseDown(0, this.state.taplist); }}>
                            {this.state.taplist[0] ? <img src={require('../../../common/images/common_icon_n_01.png')}></img>
                                : <img src={require('../../../common/images/common_icon_s_01.png')}></img>}
                            <p>工作人员</p>
                        </li>
                        <li id="getcar" onClick={() => { this.mouseDown(1, this.state.taplist); }}>
                            {this.state.taplist[1] ? <img src={require('../../../common/images/common_icon_n_02.png')}></img>
                                : <img src={require('../../../common/images/common_icon_s_02.png')}></img>}
                            <p>工作车辆</p>
                        </li>
                        <li id='getdep' onClick={() => { this.mouseDown(2, this.state.taplist); }}
                        >
                            {this.state.taplist[2] ? <img src={require('../../../common/images/common_icon_n_03.png')}></img>
                                : <img src={require('../../../common/images/common_icon_s_03.png')}></img>}
                            <p>工作设备</p>
                        </li>
                        <li id="play_back_move" onClick={() => { this.mouseDown(3, this.state.taplist); }}
                        >
                            {this.state.taplist[3] ? <img src={require('../../../common/images/common_icon_n_04.png')}></img>
                                : <img src={require('../../../common/images/common_icon_s_04.png')}></img>}
                            <p>轨迹查看</p>
                        </li>
                        <li id="imShow" onClick={() => { this.mouseDown(4, this.state.taplist); }}
                        >
                            {this.state.taplist[4] ? <img src={require('../../../common/images/common_icon_n_05.png')}></img>
                                : <img src={require('../../../common/images/common_icon_s_05.png')}></img>}
                            <p>即时通讯</p>
                        </li>

                    </ul>
                </div>

                <div className="searchinp">
                    <input className="searchinput" type="text" ref="search" onChange={v => this.inpchange(v)}></input>
                    <div className="pic">
                        <img title="搜索" src={require('../../../common/images/208.png')}></img>
                    </div>
                    {this.state.searchflag ? <div className="log">
                        <ul>
                            {this.state.searchList && this.state.searchList.map((v, i) => {
                                return <li key={i} onClick={this.tosearch.bind(this, v)}>{v}</li>;
                            })}
                        </ul>
                        <p>{this.state.searchMessage}</p>
                    </div> : <div></div>}
                </div>


                <div className='map_right_text'>
                    <div className='right_text_top'><h3>添加标记</h3><Icon className='map_right_close' type="close" /></div>
                    <div className='right_text_cont'>
                        <div className='name_inp'>
                            <p>名称</p>
                            <input type='text' ref='map_icon_inp'></input>
                        </div>
                        <div className='beizhu_text'>
                            <p>备注</p>
                            <textarea className="text_box" type='text' ref='map_icon_text'></textarea>
                        </div>
                    </div>
                    <div className='right_but'>
                        <div className='but_s add_icon'>保存</div>
                        <div className='but_s remove_box'>删除</div>
                    </div>
                </div>

                <div className="show">
                    <p className="head">{this.state.showtitle}</p>
                    <p className="latime">立案时间：{this.state.filingTime}</p>
                    <p className="laname">负责人：{this.state.laname}</p>
                    <div className="cont">
                        <ul>
                            {
                                this.state.namelis && this.state.namelis.map((v, i) => {
                                    return <li key={i}><img src={require('../../../common/images/u1068.png')}></img><span>{v.name}</span></li>;
                                })
                            }
                        </ul>
                    </div>
                </div>


                <div className="left_middle">
                    <div className="left_middle_title">最新操作记录</div>
                    <ul className="left_middle_contact">
                        {
                            this.state.arr1 && this.state.arr1.map((v, i) => {
                                return <li key={v.id}>
                                    <span>{v.createTime}</span>
                                    <span>{v.username}{v.content}</span>
                                </li>;
                            })
                        }
                    </ul>
                </div>


                <div className="left_play_back_box">
                    <div className="left_play_back_box_title">资源部署情况</div>
                    <ul id="play_back_move2" className="left_play_back_box_contact">
                        {/* <Tree
                            className="draggable-tree"
                            defaultExpandedKeys={this.state.expandedKeys}
                            onSelect={this.treeclick}
                        >
                        
                            { 
                                this.state.treeData.map((item,ind) => {
                                    if(item.teamList){
                                        return <TreeNode key={'0-'+ind} title={item.name}>
                                        {loop(item.teamList,'0-'+ind,ind)}
                                        </TreeNode> 
                                    }else{
                                        return <TreeNode key={'0-'+ind} title={item.name}>
                                        {loop(item.teamList,'0-'+ind,ind)}
                                        </TreeNode> 
                                    }
                                  
                                })
                            
                            }
                        </Tree> */}
                    </ul>
                </div>

                <div className='return_play_back'>
                    <img className='play_reback' src={require('../../../common/images/zuozhanhuifang_icon_02.png')}></img>
                    <img src={require('../../../common/images/zuozhanhuifang_icon_01.png')}></img>
                </div>

                <div className='play_back_timebox'>
                    <RangePicker
                        disabledDate={this.disabledDate}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss'),],
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                        className='time_select_box'
                        placeholder={['开始时间', '结束时间',]}
                    />
                    <div className='contact_rit'>
                        <div className='play_back_seatch'>
                            确认查询
                        </div>
                        <div className='play_click'>
                            <img src={require('../../../common/images/zuozhanhuifang_icon_04.png')}></img>
                            {
                                this.state.play_off_flag == true ? 
                                <img className='play_stop' onClick={this.offplay} src={require('../../../common/images/zuozhanhuifang_icon6.png')}></img>:
                                <img className='play_stop' onClick={this.noplay}  src={require('../../../common/images/zuozhanhuifang_icon_03.png')}></img>
                            }
                            
                           
                            <img src={require('../../../common/images/zuozhanhuifang_icon_05.png')}></img>
                        </div>
                    </div>
                </div>

                <SlideIm></SlideIm>

                {
                    this.state.hideall === true ? <PlayBackBox></PlayBackBox> : null
                }


            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state.TopicListReducer);
    return {
        topicList: state.TopicListReducer,
        moveTopos: state.MsgSendReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendPos: () => {
            dispatch({
                type: 'SEND_POSITION',
                payload: {
                    sender: '张三',
                    receiver: '随便',
                    position: { lag: 192.15852451, lng: 110.15751583, },
                },
            });
        },
        sendUserId: () => {
            dispatch({
                type: 'SEND_USER_ID',
                payload: {
                    userid: 'usrBWUpuxokvBU',
                },
            });
        },
        loginRtc: () => {
            dispatch(login(123321));
        },
        // sendPlaylist: () => {
        //     dispath({
        //         type:'SEND_PLAY_LIST',
        //         payload:{

        //         }
        //     })
        // }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(map);