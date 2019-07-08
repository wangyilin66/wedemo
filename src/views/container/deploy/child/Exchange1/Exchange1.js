import React from 'react';

import './Exchange1.css';

import {Carousel, Input, Tabs, Icon,} from 'antd';
import tsIcon from '../../../../../common/exchange-img1/tupian.png';

class Exchange1 extends React.Component{
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.state={        
            arr2:[],
            type1:[],
            type2:[],
            type3:[],//点击查看更多调到列表页展示的内容
            lunbo1:[],
            lunbo:[1,2,3,4,],
            pinglun:[],//首页右下角精选评论接口           
        };
    }
    next() {
        console.log('左');
        this.slider.slick.slickNext();
    }
    prev() {
        console.log('右');
        this.slider.slick.slickPrev();
    }
   
   onChange=(a, b, c)=> {
       console.log(a, b, c);
   }

   //点击查看更多时，到列表页所带的type值
   more(e){
       this.props.history.push({
           pathname:'/deploy/exchange',
           state:{value:e,},

       });
   }



   //首页各种设备
   shebei(e){
       console.log('好看');
       console.log(e);
       this.$axios({        
           method:"get",
           url:"http://39.98.37.28:8085/command/article/getArticle", 
           params: {
               type:e,
           },       
       }).then((res)=>{              
           this.setState({type2:res.data,});       
       });
   }
   componentDidMount(){
      
   }

   componentWillMount(){
    
       this.getMessage1();
   }

    getMessage1=()=>{   

        //大轮播图
        this.$axios({        
            method:"get",
            url:"http://39.98.37.28:8085/command/article/getSlideShow",                  
        }).then((res)=>{    
               
            this.setState({lunbo1:res.data,}); 
            
        });

        //右下角精选评论轮播图
        this.$axios({        
            method:"get",
            url:"http://39.98.37.28:8085/command/article/getChosenComment", 
            params: {
          
            },       
        }).then((res)=>{                   
            this.setState({pinglun:res.data,}); 
        });

        //首页左上角系统通知
        this.$axios({        
            method:"get",
            url:"http://39.98.37.28:8085/command/article/getArticle", 
            params: {
                type:1,
            },       
        }).then((res)=>{             
            this.setState({type1:res.data,}); 
            this.setState({type2:res.data,}); 
        });

      
        //首页右上角
        this.$axios({        
            method:"get",
            url:"http://39.98.37.28:8085/command/article/getArticle",       
        }).then((res)=>{                        
            this.setState({arr2:res.data.slice(0,6),});              
        });
    }
    //每一行点击按id跳到详情
    xiangqing(id){
        console.log('详情');
        console.log(id);
        this.props.history.push({
            pathname:'/deploy/exchange',
            value:id,
        });
    }
     

    render(){
        const lunboSetting = {
            dots: true,
            lazyLoad: true,
            autoplay:true,
        };
        return(
            <div className="main1">
                <div className="main1_contant">
                    <div className="contant_left1">
                        <div className="contant_left_top1">
                            <div className="contant_left_top1_left">
                                <div className="contant_left_top1_left_title">系统通知</div>
                                <ul className="contant_left_top1_left_content">
                                    {
                                        this.state.type1.map((item)=>{
                                            return (                                       
                                                <li className="one" onClick={(id)=>this.xiangqing(item.id)}>{item.title}</li>                                                                   
                                            );
                                        })
                                    }                    
                                </ul>
                                <div className="contant_left_top1_left_bottom" onClick={(e)=>this.more(1)}>查看更多>></div>
                            </div>
                            <div className="contant_left_top1_right">
                                <Carousel autoplay className="swiper1" {...lunboSetting} ref={el => (this.slider = el)}>
                                    {
                                        this.state.lunbo1.map((item)=>{
                                            return (                                       
                                                <div>
                                                    <img src={item.picUrl}/>
                                             
                                                </div>                                                            
                                            );
                                        })
                                    }     
                                </Carousel>
                              
                                <div className="left" onClick={this.prev}></div>
                                <div className="right" onClick={this.next}></div>
                            </div>
                        </div>

                        <div className="contant_left_bottom1">
                            <div className="contant_left_bottom1_left">
                                <div className="contant_left_bottom1_left_top">培训手册</div>
                                <div className="contant_left_bottom1_left_bottom">
                                    <img src={tsIcon}  alt=""/>            
                                </div>
                            </div>
                            <div className="contant_left_bottom1_right">
                                <ul className="contant_left_bottom1_right_top">
                                    <li  onClick={(e)=>this.shebei(1)}><a href="##">音频设备</a></li>
                                    <li  onClick={(e)=>this.shebei(2)}><a href="##">视频设备</a></li>
                                    <li  onClick={(e)=>this.shebei(3)}><a href="##">音视频设备</a></li>
                                    <li  onClick={(e)=>this.shebei(4)}><a href="##">信标设备</a></li>
                                </ul>
                                <ul className="contant_left_bottom1_right_btm">
                                    {
                                        this.state.type2.map((item)=>{
                                            return (                                       
                                                <li onClick={(id)=>this.xiangqing(item.id)}><span>{item.title}{item.type}</span></li>                                                               
                                            );
                                        })
                                    }                                          
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    <div className="contant_right1">
                        <div className="contant_right1_top">
                            <div className="contant_right1_top_title">推荐内容</div>
                            <ul className="contant_right1_top_content">
                                {
                                    this.state.arr2.map((item)=>{
                                        return (
                                            <li onClick={(id)=>this.xiangqing(item.id)}>
                                                <span>{item.title}</span>
                                            </li>
                                        );
                                    }
                                    )
                                }
                            </ul>
                            <div className="contant_right1_top_bottom"  onClick={(e)=>this.more(2)}>查看更多>></div>
                        </div>

                        <div className="contant_right1_bottom">
                            <div className="contant_right1_bottom_title">文章评论</div>               
                            <div className="contant_right1_bottom_swiper">  
                                <Carousel   autoplay className="swiper2">
                                    {
                                        this.state.pinglun.map((item)=>{
                                            return (
                                                <div>
                                                    <div className="contant_right1_bottom_top"  onClick={(id)=>this.xiangqing(item.articleId)}>
                                                        <a>
                                                            {item.articleInfo.title}
                                                        </a>                                     
                                                    </div>
                                                    <div className="contant_right1_bottom_middle"  onClick={(id)=>this.xiangqing(item.articleId)}>
                                                        <a>
                                                            {item.content}
                                                        </a>
                                                    </div>
                                                    <div className="contant_right1_bottom_bottom"  onClick={(id)=>this.xiangqing(item.articleId)}>
                                                        <a>
                                                            {item.userInfo.departmentName}{item.userInfo.realName}
                                                        </a>
                                                    </div>                                                                                                         
                                                </div> 
                                            );
                                        }
                                        )
                                    }
                                </Carousel>                                       
                            </div>                                 
                        </div>
                    </div>
                </div>            
                
            </div>
      
        );
    }
}

export default Exchange1;