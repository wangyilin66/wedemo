import React from 'react';
import './Exchange.css';
import { Pagination, } from 'antd';
import Item from 'antd/lib/list/Item';

class Exchange extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
            arr1:[],
            arr2:[],
            arr3:[],//右边列表
            arr4:[],//首页跳转带着type值查询的列表页右侧信息
            arr5:{},//根据列表查详情
            arr6:[],//根据文章id获取评论列表
            arr7:'',//评论框默认值
            //    pageNumber:parseInt(window.location.hash.slice(1), 0) || 1,
            pageNumber: 1,
            pageSize: 4,
            arr8:[],//分页
        };
    }
   
    componentDidMount(){
      
    }

    componentWillMount(){
       
        this.getMessage();
        //获取上页的参数   
        let b = this.props.location.value;
        let a = this.props.location.state;
        if(a){
            this.$axios({        
                method:"get",
                url:"http://39.98.37.28:8085/command/article/getArticle", 
                params: {
                    type:a.value,
                    pageNumber:this.state.pageNumber,
                    pageSize:this.state.pageSize,
                },       
            }).then((res)=>{      
                this.setState({ arr4:res.data,}); 
                this.setState({ arr3:res.data,});      
                this.setState({ arr8:res,});                
            });
        }else if(b){
            this.$axios({        
                method:"get",
                url:"http://39.98.37.28:8085/command/article/getArticle", 
                params: {
                    id:b,
                },       
            }).then((res)=>{      
                this.setState({ arr5:res.data[0],}); 
                this.setState({ show:false,});  
            });
        } 
    }

    //根据文章id获取文章详情以及评论列表
    handleClick2(id){
        this.$axios({        
            method:"get",
            url:"http://39.98.37.28:8085/command/article/getArticle",   
            params: {
                id:id,
            },     
        }).then((res)=>{                     
            this.setState({arr5:res.data[0],});   
            this.setState({show:false,});       
        });
        //获取评论列表、
        this.$axios({        
            method:"get",
            url:"http://39.98.37.28:8085/command/article/getCommentListByArticleId",   
            params: {
                articleId:id,
            },     
        }).then((res)=>{                  
            this.setState({arr6:res.data,});         
        });
    }

    //   根据左边按钮的id当作右边的type显示右边的列表
    tiao(id,pageNumber, pageSize){         
        console.log(id);
        this.$axios({        
            method:"get",
            url:"http://39.98.37.28:8085/command/article/getArticle",   
            params: {
                type:id,
                pageNumber:this.state.pageNumber,
                pageSize:4,          
            },     
        }).then((res)=>{   
          
            this.setState({arr3:res.data,}); 
            this.setState({arr8:res,}); 
            this.setState({show:true,}); 
        });
    }

       //分页功能
       pageChange=( page, pageSize)=>{
           console.log('我最棒');
           console.log(page,pageSize);
           let type=this.state.arr3[0].type;
        
           this.setState({
               pageNumber:1,
               pageSize:pageSize,
           },()=>{
               console.log('好累啊');
               console.log(this.state.pageNumber,this.state.pageSize);
               this.$axios({        
                   method:"get",
                   url:"http://39.98.37.28:8085/command/article/getArticle",   
                   params: {
                       type:type,
                       pageNumber:page,
                       pageSize:4,          
                   },     
               }).then((res)=>{   
                   console.log('888');
                   console.log(res.data);
                   this.setState({arr3:res.data,}); 
               });
           });      
       }

       //评论框
       handleInfo=(e)=>{
           this.setState({
               arr7:e.target.value,
           });
       }

//点击返回按钮回到列表页
back=()=>{
    this.setState({
        show:true,
    });
}
//点击发送按钮添加评论
send(id){
    this.$axios({        
        method:"get",
        headers: {
            Authorization:JSON.parse(localStorage.getItem('user')).token,
        },
        url:"http://39.98.37.28:8085/command/article/addCommentByToken",   
        params: {
            articleId:id,
            content:this.state.arr7,
        },     
    }).then((res)=>{   
        console.log('最优秀');       
        console.log(res);
        if(res.code === 1){
            console.log(id);
            this.handleClick2(id);    
            this.setState({arr7:'',});
        }
    });
}

       getMessage=()=>{   
           //   列表页左上角
           this.$axios({        
               method:"get",
               url:"http://39.98.37.28:8085/command/article/getType", 
               params: {
               },       
           }).then((res)=>{          
               this.setState({arr1:res.data,});       
           });

           //列表页左下角
           this.$axios({        
               method:"get",
               url:"http://39.98.37.28:8085/command/article/getArticle",      
           }).then((res)=>{          
               this.setState({arr2:res.data.slice(0,6),}); 
               console.log('黄月');
               console.log(this.state.arr2);
           });
       }

       render(){       
           return(
               <div className="main0">
                   <div className="main_contant0">
                       <div className="contant_left">
                           <div className="contant_left_top">
                               <div className="contant_left_title">工作交流</div>
                               <ul className="contant_left_btm">
                                   {
                                       this.state.arr1.map((item)=>{
                                           return (
                                               <li className="one" onClick={(id)=>this.tiao(item.id)}>{item.name}</li>
                                           );
                                       })                        
                                   }
                               </ul>
                           </div>

                           <div className="contant_left_bottom">
                               <div className="contant_right_title">推荐内容</div>
                               <ul className="contant_right_btm">
                                   {
                                   
                                       this.state.arr2.map((item,index)=>{
                                           return (
                                               <li>
                                                   <span>{item.title}</span>
                                               </li>
                                           );
                                       })                           
                                   }
                               </ul>                     
                           </div>
                       </div>

                       {this.state.show?(<div className="contant_right" onClick={this.handleClick}>
                           <div className="contant_right_liebiao">
                               {
                                   this.state.arr3.map((item)=>{
                                       return (
                                           <dl onClick={(id)=>this.handleClick2(item.id)}>
                                               <dt>{item.title}id:{item.id}type:{item.type}</dt>
                                               <dd className="contant_right_top">
                                                   <a href="">{item.summary}</a>
                                               </dd>	
                                               <dd className="contant_right_bom">
                                                   <span className="contant_right_bom1">发表于：<span className="contant_right_bom2">{item.createTime}</span></span>
                                               </dd>
                                           </dl>
                                       ); }                          
                                   )
                               }
                           </div>
                           

                           <div className="fenye">
                               <Pagination pageSize={4} defaultCurrent={1} onChange={this.pageChange} size="small" total={this.state.arr8.total} />
                           </div>                          
                       </div>
                       ):( <div className="contant_right1"  onClick={this.handleClick1}>
                           <div className="back" onClick={this.back}></div>
                           <div className="contant_right1_title">{this.state.arr5.title}</div>
                           <div className="contant_right1_xiaotitle">
                               <span className="contant_right1_xiaotitle_left">{this.state.arr5.createTime}</span>
                               <span className="contant_right1_xiaotitle_right">{this.state.arr5.remarks1=null?'':this.state.arr5.remarks1}</span>
                           </div>
                           <div className="contant_right1_content">
                               <p dangerouslySetInnerHTML={{ __html: this.state.arr5.article, }}  />

                               <div className="contant_right1_bottom">
                                   <div>
                                       <div className="contant_right1_content_title">评论</div>
                                       <div className="contant_right1_content_kuang">
                                           <div  className="contant_right1_content_kuang_left">
                                               <textarea className="contant_right1_content_kuang_left1" value={this.state.arr7} onChange={this.handleInfo}>
                         
                                               </textarea>
                                           </div>
                                           <div  className="contant_right1_content_kuang_right"  onClick={(id)=>this.send(this.state.arr5.id)}>发送</div>
                                       </div>
                                   </div>

                                   <div className="contant_right1_bottom1">
                                       <div className="contant_right1_content_title1">全部评论</div>
                                       <div className="contant_right1_content_bottom1">
                                
                                           {
                                               this.state.arr6.map((item)=>{
                                                   return (
                                                       <div>
                                                           <div  className="contant_right1_content_left1">
                                                               <img className="image" src={item.userInfo.headPic} alt=""/> 
                           
                                                           </div>
                                                           <div  className="contant_right1_content_right1">
                                                               <div className="contant_right1_content_right1_top">
                                                                   <span className="contant_right1_content_right1_top_name">{item.userInfo.username}</span>
                                                                   <span className="contant_right1_content_right1_top_time">{item.createTime}</span>
                                                               </div>
                                                               <div className="contant_right1_content_right1_bottom">
                                                                   {item.content}
                                                               </div>
                                                           </div>
                                                       </div>
                                                   );
                                               })                           
                                           }                                   
                                       </div>
                                   </div>
                               </div>
                           </div>                               
                       </div>)}                  
                   </div>            
               </div>
      
           );
       }
}

export default Exchange;