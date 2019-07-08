import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './Admin.css';
import { Progress,Card,Input, Button,} from 'antd';
import Header from '../../component/header/index.js';
// import Swiper from '../../component/Swiper/index.js';
import zzzhPic from '../../../common/images/btn_zuozhanzhihui.png';
import gzjlPic from '../../../common/images/btn_gongzuojiaoliu.png';
import jzjkPic from '../../../common/images/btn_jizhongjiankong.png';
import sjypPic from '../../../common/images/btn_shujuyanpan.png';
import xtglPic from '../../../common/images/btn_xitongguanli.png';
import zzbsPic from '../../../common/images/btn_zuozhanbushu.png';
import ajgdPic from '../../../common/images/btn_anjianguidang.png';
import jiantouLeft from '../../../common/images/jiantou1_icon.png';
import jiantouRight from '../../../common/images/jiantou2_icon.png';

// 以上是轮播图
class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arrs:[],
            arr1:[],
            arr2:[],
            arr3:[],
            arr4:[],
            newCase:[],
            finishCase:[],
            x:[],
            a:[],
            b:[],
            c:[],
            d:[],
            e:[],
            isToggleOn: true,
            dispaly: 'block',
            username:'',
            passWord1:'',
            passWord2:'',
            tongzhi:[],
            tongzhi1:'',
            tongzhi2:[],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    //修改密码按钮
    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            display: prevState.isToggleOn ? 'none': 'block',
        }));
    }
    //轮播图点击跳转
      tiao= () => {
          this.props.history.push('/deploy/command');
      }

      tiao1= () => {
          this.props.history.push('/deploy/operational');
      }

      tiao2= () => {
          this.props.history.push('/deploy/monitoring');
      }

      tiao3= () => {
          this.props.history.push('/deploy/study');
      }

      tiao4= () => {
          this.props.history.push('/deploy/pigeonhole');
      }

      tiao5= () => {
          this.props.history.push('/deploy/management');
      }

      tiao6= () => {
          this.props.history.push('/deploy/exchange1');
      }
      //修改密码确认按钮
      inputChange(e){
          this.setState({
              username:e.target.value,
          });
      }

      inputChange1(e){
          this.setState({
              passWord1:e.target.value,
          });
      }
      inputChange2(e){
          this.setState({
              passWord2:e.target.value,
          });
      }
// 改密码
getInputValue= () => {
    this.$axios({
        method:"post",
        headers: {
            Authorization:JSON.parse(localStorage.getItem('user')).token,
        },
        url:"http://39.98.37.28:8085/user/updatePassword",
        params: {
            password:this.state.username,
            newPassword: this.state.passWord1,
        },       
    }).then((res)=>{    
        let a='this.state.passWord2';
        let b='this.state.passWord1';
        if(res.code === 1 && a === b){
            this.setState({
                username:this.state.passWord1,
            });
            console.log(this.state.username);
        }else{
            console.log('拉拉');
        }   
        //修改完密码点确定让弹框消失  
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            display:  'none',
        }));     
    });
}

rightFun = () => {
    let btn = document.getElementsByClassName('position')[0].childNodes;
    for(let i in btn){
        if(btn[i].id === 'one'){
            btn[i].style.animation = 'imgMoveRight1 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround2';
            setTimeout(()=>{
                btn[i].id = 'two';
            }, 1000);
        }
        if(btn[i].id === 'two'){
            btn[i].style.animation = 'imgMoveRight2 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround3';
            setTimeout(()=>{
                btn[i].id = 'three';
            }, 1000);                
        }
        if(btn[i].id === 'three'){
            btn[i].style.animation = 'imgMoveRight3 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround4';
            setTimeout(()=>{
                btn[i].id = 'four';
            }, 1000);                
        }
        if(btn[i].id === 'four'){
            btn[i].style.animation = 'imgMoveRight4 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround4';
            setTimeout(()=>{
                btn[i].id = 'five';
            }, 1000);                
        }
        if(btn[i].id === 'five'){
            btn[i].style.animation = 'imgMoveRight5 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround3';
            setTimeout(()=>{
                btn[i].id = 'six';
            }, 1000);                
        }
        if(btn[i].id === 'six'){
            btn[i].style.animation = 'imgMoveRight6 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround2';
            setTimeout(()=>{
                btn[i].id = 'seven';
            }, 1000);                
        }
        if(btn[i].id === 'seven'){
            btn[i].style.animation = 'imgMoveRight7 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround1';
            setTimeout(()=>{
                btn[i].id = 'one';
            }, 1000);                
        }
    }
}
leftFun = () => {
    let btn = document.getElementsByClassName('position')[0].childNodes;
    for(let i in btn){
        if(btn[i].id === 'one'){
            btn[i].style.animation = 'imgMoveLeft1 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround2';
            setTimeout(()=>{
                btn[i].id ='seven';
            }, 1000);
        }
        if(btn[i].id === 'seven'){
            btn[i].style.animation = 'imgMoveLeft2 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround3';
            setTimeout(()=>{
                btn[i].id ='six';
            }, 1000);                
        }
        if(btn[i].id === 'six'){
            btn[i].style.animation = 'imgMoveLeft3 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround4';
            setTimeout(()=>{
                btn[i].id ='five';
            }, 1000);                
        }
        if(btn[i].id === 'five'){
            btn[i].style.animation = 'imgMoveLeft4 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround4';
            setTimeout(()=>{
                btn[i].id ='four';
            }, 1000);                
        }
        if(btn[i].id === 'four'){
            btn[i].style.animation = 'imgMoveLeft5 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround3';
            setTimeout(()=>{
                btn[i].id ='three';
            }, 1000);                
        }
        if(btn[i].id === 'three'){
            btn[i].style.animation = 'imgMoveLeft6 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround2';
            setTimeout(()=>{
                btn[i].id ='two';
            }, 1000);                
        }
        if(btn[i].id === 'two'){
            btn[i].style.animation = 'imgMoveLeft7 1000ms ease 1';
            btn[i].style.animationFillMode = 'forwards';
            btn[i].firstChild.className = 'backGround1';
            setTimeout(()=>{
                btn[i].id ='one';
            }, 1000);                
        }
    }
}


componentWillMount(){
    this.getMessage();
}
componentDidMount(){
    window.sessionStorage.setItem('mapflag',true);
}

    getMessage=()=>{
        //页面渲染时让弹框隐藏
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            display:  'none',
        }));

        let a=JSON.parse(localStorage.getItem('user')).token;
        this.$axios({
            headers: {
                Authorization:JSON.parse(localStorage.getItem('user')).token,
            },
            method:"get",
            url:"http://39.98.37.28:8085/command/user/getUserInfoByToken",    
        }).then((res)=>{
            console.log(res);
            let arrs=res.data;
            this.setState({arrs:arrs,}); 
        });


        // 轮播图底部接口
        this.$axios({
            method:"get",
            url:"http://39.98.37.28:8085/command/combat/selectEmegencyNotice",    
        }).then((res)=>{
            console.log(res.data);
            // this.setState({tongzhi1:res.data[0]}) 
            // this.setState({tongzhi2:res.data[1]}) 
            // console.les.data
            let a=res.data;
            console.log(a);
            var arr=[];
            for(var i=0;i<a.length;i++)
            {
                arr.push(a[i].content);
                var str=arr.join(""); 
                console.log('str');
                console.log(str);
                this.setState({tongzhi1:str,});
                console.log(this.state.tongzhi1);
            }
           
            
        });


        //最新操作记录接口
        this.$axios({
            method:"get",
            url:"http://39.98.37.28:8085/command/user/getOperationLog?pageSize=5&pageNumber=1",    
        }).then((res)=>{    
            let arr1=res.data;
            this.setState({arr1:arr1,}); 
            this.setState({a:arr1[0],}); 
            this.setState({b:arr1[1],}); 
            this.setState({c:arr1[2],}); 
            this.setState({d:arr1[3],}); 
            this.setState({e:arr1[4],}); 
        });

        //获取首页左下角设备统计数
        this.$axios({
            method:"get",
            url:"http://39.98.37.28:8085/command/combat/selectDeviceCountDetail",    
        }).then((res)=>{    
          
            this.setState({arr2:res,}); 
            console.log( this.state.arr2);
        });


        //获取首页右上角案件统计数
        this.$axios({
            method:"get",
            url:"http://39.98.37.28:8085/command/combat/selectCaseCountGroupByStatus",    
        }).then((res)=>{    
         
            this.setState({arr3:res,}); 
            console.log( this.state.arr3);
        });

        //获取首页右下角统计
        this.$axios({
            method:"get",
            url:"http://39.98.37.28:8085/command/combat/selectRightBottomCount",    
        }).then((res)=>{    
             
            this.setState({arr4:res,}); 
            console.log( this.state.arr4);
        });

        //获取右上角案件折线图
        this.$axios({
            method:"get",
            url:"http://39.98.37.28:8085/command/combat/selectNewAndFinishCaseCountBefore2week",    
        }).then((res)=>{    
            console.log('我最好看');  
            console.log(res);
            //    this.setState({arr4:res}) 
            //    console.log( this.state.arr4)
            this.state.newCase=res.newCase;
            this.state.finishCase=res.finishCase;
            this.state.x=res.x;
            console.log( this.state.newCase);
            console.log( this.state.finishCase);
            console.log( this.state.x);
        });
    }
      
    getOption(){
        return {
            title: {
                text: '近两周完成案件与新立案件折线图',
                textStyle:{
                    color: '#fff',
                    fontSize: 12,
                },
                left:'center',
            },
            grid:{
                borderColor: 'gray',
                show:true,
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {      
                data:[
                    {
                        name:'完成案件',
                        icon:'roundRect',
                    },
                    {
                        icon:'roundRect',
                        name:'新立案件',
                    },
                ],
                itemWidth:10,
                itemHeight:10,
                align:'right',
                padding: 30,
                textStyle:{
                    color:'#fff',
                    fontSize: 9,
                },  
            },
           
            xAxis:  {
                show:true,
                type: 'category',
                boundaryGap: false,
                data: this.state.x,
              
                splitLine:{show: true,},//网格线
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: 'gray',//左边线的颜色
                        width:'1',//坐标线的宽度
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: 'gray',//坐标值得具体的颜色
                    },
                },

            },
            yAxis: {
                type: 'value',
                splitLine:{show: true,},//网格线
                axisLabel: {
                    lineStyle: {
                        type: 'solid',
                        color:'gray',
                        width:'1',
                    },
                    textStyle: {
                        color: 'gray',
                    },
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color:'gray',
                        width:'1',
                    },
                },
            },
            
            series: [
                {
                    name:'完成案件',
                    type:'line',
                    data:this.state.finishCase,
                    color:['#f0f',],
                },
                {
                    name:'新立案件',
                    type:'line',
                    data:this.state.newCase,
                    color:['green',],
                    
                }, 
            ],
        };
    }

    render(){  
        return(
            <div className="main" onClick={this.goto}>
                <div className="main_top">
                    <Header></Header>
                </div>
                <div className="main_bot">
                    <div className="main_bot_left">
                        <div className="main_bot_left_top">
                            <div  className="title">登录人员信息</div>
                            <ul  className="xinxi_one">
                                <li><span>姓名：</span><span>{this.state.arrs.username}</span><span className="reset_password" onClick={this.handleClick}>修改密码</span></li>
                                <li><span>性别：</span><span>{this.state.arrs.sex==='1'?'男':'女'}</span></li>
                                <li><span>职位：</span><span>{this.state.arrs.employer}{this.state.arrs.duty}</span></li>
                                <li><span>登录地点：</span><span>北京市</span></li>
                            </ul>
                            <Card title='修改密码' id='reset_passcard' style={{display: this.state.display,}}> 
                                <ul className="reset_middle">
                                    <li><span>原密码:</span><input className="reset_yuan" type="password" onChange={(e)=>this.inputChange(e)} ></input></li>
                                    <li><span>新密:</span><input className="reset_yuan" type="password" onChange={(e)=>this.inputChange1(e)}></input></li>
                                    <li><span>确认新密码:</span><input className="reset_yuan" type="password" onChange={(e)=>this.inputChange2(e)}></input></li>
                                </ul>
                                <div className="reset_bottom"><span  className="reset_bottom_left" onClick={this.handleClick}>取消</span><span  className="reset_bottom_right" onClick={this.getInputValue}>确认</span></div>
                            </Card>
                        </div>
                        <div className="main_bot_left_middle">
                            <div  className="title">最新操作记录</div>
                            <ul  className="xinxi_two">
                                <li>
                                    <span className='xinxi_two_left'>{this.state.a.createTime}</span>
                                    <span>{this.state.a.username}{this.state.a.content}</span>
                                </li>
                                <li>
                                    <span  className='xinxi_two_left'>{this.state.b.createTime}</span>
                                    <span>{this.state.b.username}{this.state.a.content}</span>
                                </li>
                                <li>
                                    <span  className='xinxi_two_left'>{this.state.c.createTime}</span>
                                    <span>{this.state.c.username}{this.state.a.content}</span>
                                </li>
                                <li>
                                    <span  className='xinxi_two_left'>{this.state.d.createTime}</span>
                                    <span>{this.state.d.username}{this.state.a.content}</span>
                                </li>
                                <li>
                                    <span className='xinxi_two_left'>{this.state.e.createTime}</span>
                                    <span>{this.state.e.username}{this.state.a.content}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="main_bot_left_bottom">
                            <div className="title">平台运行情况</div>
                            <ul  className="xinxi_three">
                                <li className="xinxi_three_top one">
                                    <span id="xinxi_three_top_title">摄像头</span>
                                    <ul  className="xinxi_three_erji">
                                        <li>总计:<span>{this.state.arr2.cameraTotal}</span></li>
                                        <li>正常:<span>{this.state.arr2.cameraNormal}</span></li>
                                    </ul>
                                </li>
                                <li className="one"><span>视频服务</span><span>{this.state.arr2.video === '1'?'正常':'异常'}</span></li>
                                <li className="one"> <span>音频服务</span><span>{this.state.arr2.audio === '1'?'正常':'异常'}</span></li>
                                <li className="one"><span>地图服务</span><span>{this.state.arr2.map === '1'?'正常':'异常'}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="main_bot_middle">    
                        <div className="main_bot_middlelb">
                            {/* <img src='../../../common/admin-img/admin-img/swiper.png'></img> */}
                            {/* <Swiper></Swiper> */}
                            <div className="container">
                                <div style={{float: 'left', height: '100%', marginLeft: 50,}} onClick={this.leftFun}>
                    左
                                    <img className="jiantou" src={jiantouLeft}></img>
                                </div>
                                <div style={{float: 'right', height: '100%', marginRight: 50,}} onClick={this.rightFun}>
                    右
                                    <img className="jiantou" src={jiantouRight}></img>
                                </div>
                                <div className="position">
                                    <div className="position1" id="one">
                                        <img src={zzzhPic} className="backGround1" onClick={this.tiao}></img>
                                    </div>
                                    <div className="position2" id="two">
                                        <img src={zzbsPic} className="backGround2" onClick={this.tiao1}></img>
                                    </div>
                                    <div className="position3" id="seven">
                                        <img src={jzjkPic} className="backGround2" onClick={this.tiao2}></img>
                                    </div>
                                    <div className="position4" id="six">
                                        <img src={sjypPic} className="backGround3" onClick={this.tiao3}></img>
                                    </div>
                                    <div className="position5" id="three">
                                        <img src={ajgdPic} className="backGround3" onClick={this.tiao4}></img>
                                    </div>
                                    <div className="position6" id="four">
                                        <img src={xtglPic} className="backGround4" onClick={this.tiao5}></img>
                                    </div>
                                    <div className="position7" id="five">
                                        <img src={gzjlPic} className="backGround4" onClick={this.tiao6}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        <div className="main_bot_middlebt"><span className="main_bot_middlebt_left">紧急通知<span className="main_bot_middlebt_mid">|</span></span><span className="main_bot_middlebt_right"> <span className="animate">{this.state.tongzhi1}</span></span></div>
                    </div>
                    <div className="main_bot_right">
                        <div className="main_bot_right_top">
                            <div className="title">案件信息</div>
                            <ul>
                                <li className="first"><span>待审批案件：</span><span>{this.state.arr3.unReview}</span></li>
                                <li><span>在办案件：</span><span>{this.state.arr3.unDeal}</span></li>
                                <li><span>已完成案件：</span><span>{this.state.arr3.finish}</span></li>
                            </ul>
                            <div id="bot_echart">
                                <ReactEcharts style={{width:'100%', height:'250px',color:'#fff',}} option={this.getOption()} />
                            </div>
                        </div>
                        <div className="main_bot_right_bottom">
                            <div className="title">资源信息</div>
                            <ul className="top">
                                <li><span>总人数：</span><span>{this.state.arr4.userTotal}</span></li>
                                <li><span>总设备数：</span><span>{this.state.arr4.deviceTotal}</span></li>    
                            </ul>

                            <ul className="middle">
                                <li>信标设备数: <span>{this.state.arr4.gpsTotal}</span></li>
                                <li>音频设备数: <span>{this.state.arr4.audioTotal}</span></li>
                                <li>视频设备数: <span>{this.state.arr4.videoTotal}</span></li>
                                <li>音视频设备数: <span>{this.state.arr4.videoAndAudioTotal}</span></li>
                            </ul>

                            <div className="bottom">
                                <dl style={{ width: 300 ,textAlign:'center',paddingTop:'67px',}}>
                                    <dt>信标设备数({this.state.arr4.gpsOnline}/{this.state.arr4.gpsTotal})</dt>
                                    <dd><Progress percent={this.state.arr4.gpsOnline/this.state.arr4.gpsTotal*100} strokeColor="purple" status="active" showInfo={false}/></dd>
                                    <dt>音频设备数({this.state.arr4.audioOnline}/{this.state.arr4.audioTotal})</dt>
                                    <dd><Progress percent={this.state.arr4.audioOnline/this.state.arr4.audioTotal*100}  status="active" strokeColor="pink"/></dd>
                                    <dt>视频设备数({this.state.arr4.videoOnline}/{this.state.arr4.videoTotal})</dt>
                                    <dd><Progress percent={this.state.arr4.videoOnline/this.state.arr4.videoTotal*100}  status="active" strokeColor="green"/></dd>
                                    <dt>音视频设备数({this.state.arr4.videoAndAudioOnline}/{this.state.arr4.videoAndAudioTotal})</dt>
                                    <dd><Progress percent={this.state.arr4.videoAndAudioOnline/this.state.arr4.videoAndAudioTotal*100} status="active" strokeColor="red"/></dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
                
        );
    }
}
export default Admin;
