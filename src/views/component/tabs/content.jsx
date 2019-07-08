import React, { Component, } from 'react';
import './main.css';
class Content extends Component {
    constructor() {
        super();
        this.state = {
        
        };
        // this.handleClick = this.handleClick.bind(this);
    }
    // handleClick() {
    // 	this.setState((prevState) => ({
            
    //     }));
    // }
    render() {
        return (
            <div className={this.props.contentClass(this.props.index)}>
                <div className="caseBox">
                    <ul className="caseWrap">
                        <li>
                            {this.props.val}
                            <p className="caseNum">案件名称一</p>
                            <div className="caseDetail">
                                <div className="detail">
                                    <div className="userInfo">
                                        <span>编号:&nbsp; 085434322;</span>
										&nbsp;&nbsp;
                                        <span>负责人:&nbsp; 王处长</span>
                                    </div>
                                    <p className="caseTime">立案时间: 2019-09-21 &nbsp;&nbsp; 12:00:00</p>
                                    <p className="caseDescribe">
										此处是案件描述此处是案件描述此处是案件描述此处是案件描述此处是案件描述 此处是案件描述此处是案件描述此处是案件描述此处是案件描
                                    </p>
                                </div>
                                <div className="actionObject">
                                    <div className="actionTop">
                                        <span>行动对象</span>
                                        <span>添加行动对象</span>
                                    </div>
                                    <div className="actionObjectInfo">
                                        <div className="actionObjectInfoWrap">
                                            <dl>
                                                <dd>
                                                    <img
                                                        src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3663082828,4038475488&fm=27&gp=0.jpg"
                                                        alt=""
                                                    />
                                                </dd>
                                                <dt>
                                                    <span>姓名：宋江</span>
                                                    <span>性别：男</span>
                                                    <span>手机号：13011112222</span>
                                                    <span>身份证号：112123404057054</span>
                                                    <span>住所：北京市朝阳区</span>
                                                    <span>交通：步行</span>
                                                    <span>其他描述：身高180cm，体型健 硕，上衣白衬衫，下装黑裤子</span>
                                                </dt>
                                            </dl>
                                        </div>
                                        <div className="actionObjectInfoWrap">
                                            <dl>
                                                <dd>
                                                    <img
                                                        src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3663082828,4038475488&fm=27&gp=0.jpg"
                                                        alt=""
                                                    />
                                                </dd>
                                                <dt>
                                                    <span>姓名：宋江</span>
                                                    <span>性别：男</span>
                                                    <span>手机号：13011112222</span>
                                                    <span>身份证号：112123404057054</span>
                                                    <span>住所：北京市朝阳区</span>
                                                    <span>交通：步行</span>
                                                    <span>其他描述：身高180cm，体型健 硕，上衣白衬衫，下装黑裤子</span>
                                                </dt>
                                            </dl>
                                        </div>
                                        <div className="actionObjectInfoWrap">
                                            <dl>
                                                <dd>
                                                    <img
                                                        src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3663082828,4038475488&fm=27&gp=0.jpg"
                                                        alt=""
                                                    />
                                                </dd>
                                                <dt>
                                                    <span>姓名：宋江</span>
                                                    <span>性别：男</span>
                                                    <span>手机号：13011112222</span>
                                                    <span>身份证号：112123404057054</span>
                                                    <span>住所：北京市朝阳区</span>
                                                    <span>交通：步行</span>
                                                    <span>其他描述：身高180cm，体型健 硕，上衣白衬衫，下装黑裤子</span>
                                                </dt>
                                            </dl>
                                        </div>
                                        <div className="actionObjectInfoWrap">
                                            <dl>
                                                <dd>
                                                    <img
                                                        src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3663082828,4038475488&fm=27&gp=0.jpg"
                                                        alt=""
                                                    />
                                                </dd>
                                                <dt>
                                                    <span>姓名：宋江</span>
                                                    <span>性别：男</span>
                                                    <span>手机号：13011112222</span>
                                                    <span>身份证号：112123404057054</span>
                                                    <span>住所：北京市朝阳区</span>
                                                    <span>交通：步行</span>
                                                    <span>其他描述：身高180cm，体型健 硕，上衣白衬衫，下装黑裤子</span>
                                                </dt>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="fightPlayback">
                                    <a href="/deploy/detail" onClick={this.deployClick}>作战部署</a>
                                </div>
                            </div>
                        </li>
                     
                    </ul>
                </div>
            </div>
        );
    }
}
export default Content;
