import React, { Component, } from 'react';
import './index.css';
import zzzhPic from '../../../common/images/btn_zuozhanzhihui.png';
import gzjlPic from '../../../common/images/btn_gongzuojiaoliu.png';
import jzjkPic from '../../../common/images/btn_jizhongjiankong.png';
import sjypPic from '../../../common/images/btn_shujuyanpan.png';
import xtglPic from '../../../common/images/btn_xitongguanli.png';
import zzbsPic from '../../../common/images/btn_zuozhanbushu.png';
import ajgdPic from '../../../common/images/btn_anjianguidang.png';
import jiantouLeft from '../../../common/images/jiantou1_icon.png';
import jiantouRight from '../../../common/images/jiantou2_icon.png';

export default class Swiper extends Component {
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
    render() {
        return (
            <div className="container">
                <div style={{float: 'left', height: '100%', marginLeft: 50,}} onClick={this.leftFun}>
                    <img className="jiantou" src={jiantouLeft}></img>
                </div>
                <div style={{float: 'right', height: '100%', marginRight: 50,}} onClick={this.rightFun}>
                    <img className="jiantou" src={jiantouRight}></img>
                </div>
                <div className="position">
                    <div className="position1" id="one">
                        <img src={zzzhPic} className="backGround1"></img>
                    </div>
                    <div className="position2" id="two">
                        <img src={zzbsPic} className="backGround2"></img>
                    </div>
                    <div className="position3" id="seven">
                        <img src={jzjkPic} className="backGround2"></img>
                    </div>
                    <div className="position4" id="six">
                        <img src={sjypPic} className="backGround3"></img>
                    </div>
                    <div className="position5" id="three">
                        <img src={ajgdPic} className="backGround3"></img>
                    </div>
                    <div className="position6" id="four">
                        <img src={xtglPic} className="backGround4"></img>
                    </div>
                    <div className="position7" id="five">
                        <img src={gzjlPic} className="backGround4"></img>
                    </div>
                </div>
            </div>
        );
    }
}