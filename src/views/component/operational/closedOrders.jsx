// // 已结束
// import React, { Component } from 'react'
// import appAlert from '../../component/operational/appAlert';
// export class closedOrders extends Component {
//     constructor(...args) {
//         super(...args)
//         this.state = {
//             newData: []
//         }
//     }
//     componentDidMount() {
//         console.log('....props', this.props.Params)
//     }
//     componentWillUnmount(){
//     }
//     open = () => {
        
//         localStorage.setItem("key", JSON.stringify(this.props.Params));
//         appAlert.open({
//             alertTip: '这是弹框',
//             consoleAlert: function () {
//                 console.log('关了。。。。。。。。')
//             }
//         })
//     }

//     render() {
//         return (
//             <li>
//                 {/* <h2 className="caseNum">{this.props.Params.name}</h2>
//                 <div className="caseDetail">
//                     <div className="detail">
//                         <div className="userInfo">
//                             <span>编号: {this.props.Params.number};</span>
//                             <span>负责人: 王处长</span>
//                         </div>
//                         <p className="caseTime">立案时间: {this.props.Params.finishTime}</p>
//                         <p className="caseDescribe">
//                             {this.props.Params.description}
//                         </p>
//                     </div>
//                     <div className="actionObject">
//                         <div className="actionTop">
//                             <span>行动对象</span>
//                             <span></span>
//                             <span onClick={this.open}>添加行动对象</span>
//                         </div>
//                         <div className="actionObjectInfo">
//                             <div className="actionObjectInfoWrap">
//                                 {
//                                     this.props.Params.actionObjectList.map(itm => {
//                                         return (
//                                             <dl onChange={this.handleScroll}>
//                                                 <dd>
//                                                     <img
//                                                         src={itm.picUrl}
//                                                         alt=""
//                                                     />
//                                                 </dd>
//                                                 <dt>
//                                                     <span>姓名:宋江</span>
//                                                     <span>性别:男</span>
//                                                     <span>手机号:{itm.phone}</span>
//                                                     <span>身份证号:{itm.idNumber}</span>
//                                                     <span>{itm.residence}:{itm.city}{itm.area}</span>
//                                                     <span>交通:步行</span>
//                                                     <span>其他描述:{itm.remarks1}</span>
//                                                 </dt>
//                                             </dl>
//                                         )
//                                     })
//                                 }

//                             </div>
//                         </div>
//                     </div>
//                     <div className="fightPlayback">
//                         <a href="/deploy/detail" onClick={this.deployClick}>作战回放</a>
//                     </div>
//                 </div> */}
//             </li>
//         )
//     }
// }

// export default closedOrders
