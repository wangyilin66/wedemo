import React from 'react';

import './Exchange.css';
import Header from '../../component/header/index.js';
import { Pagination, } from 'antd';



class Exchange extends React.Component{
    constructor(props){
        super(props);
        this.state={
        
        };
    }
   
    componentDidMount(){
      
    }

    componentWillMount(){
        console.log(this);
    }

  
    render(){
       
        return(
            <div className="main">
                <div className="main_contant">
                    <div className="contant_left">
                        <div className="contant_left_top">
                            <div className="contant_left_title">工作交流</div>
                            <ul className="contant_left_btm">
                                <li className="one">系统通知</li>
                                <li>音频设备使用手册</li>
                                <li>视频设备使用手册</li>
                                <li>信标设备使用手册</li>
                            </ul>
                        </div>
                        <div className="contant_left_bottom">
                            <div className="contant_right_title">推荐内容</div>
                            <ul className="contant_right_btm">
                                <li>
                                    <span>1.拉拉拉拉啊拉拉拉啊啊啊拉拉拉拉啊拉拉拉啊啊啊拉拉拉拉啊拉拉拉啊啊啊</span>
                                </li>
                                <li>
                                    <span>1.拉拉拉拉啊拉拉拉啊啊啊</span>
                                </li>
                                <li>
                                    <span>1.拉拉拉拉啊拉拉拉啊啊啊</span>
                                </li>
                                <li>
                                    <span>1.拉拉拉拉啊拉拉拉啊啊啊</span>
                                </li>
                                <li>
                                    <span>1.拉拉拉拉啊拉拉拉啊啊啊</span>
                                </li>
                                <li>
                                    <span>1.拉拉拉拉啊拉拉拉啊啊啊</span>
                                </li>
                            </ul>
                         
                        </div>
                    </div>
                    <div className="contant_right">
                        <dl>
                            <dt>爱综艺爱综艺爱综艺</dt>
                            <dd className="contant_right_top">
                                <a href="#">内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺</a>
                            </dd>	
                            <dd className="contant_right_bom">
                                <span className="contant_right_bom1">发表于：<span className="contant_right_bom2">2019-06-06</span></span>
                            </dd>
                        </dl>

                        <dl>
                            <dt>爱综艺爱综艺爱综艺</dt>
                            <dd className="contant_right_top">
                                <a href="#">内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺</a>
                            </dd>	
                            <dd className="contant_right_bom">
                                <span className="contant_right_bom1">发表于：<span>2019-06-06</span></span>
                            </dd>
                        </dl>

                        <dl>
                            <dt>爱综艺爱综艺爱综艺</dt>
                            <dd className="contant_right_top">
                                <a href="#">内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺
                                内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺
                                内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺
                                </a>
                            </dd>	
                            <dd className="contant_right_bom">
                                <span className="contant_right_bom1">发表于：<span>2019-06-06</span></span>
                            </dd>
                        </dl>

                        <dl>
                            <dt>爱综艺爱综艺爱综艺</dt>
                            <dd className="contant_right_top">
                                <a href="#">内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺内地综艺</a>
                            </dd>	
                            <dd className="contant_right_bom">
                                <span className="contant_right_bom1">发表于：<span>2019-06-06</span></span>
                            </dd>
                        </dl>


                    </div>
                </div>            
                <div className="main_bottom">
                    <Pagination size="small" total={50} />       
                </div>
            </div>
      
        );
    }
}

export default Exchange;