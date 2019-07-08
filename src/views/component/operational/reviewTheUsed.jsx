// 審核通過
import React, { Component, } from 'react';
import appAlert from '../../component/operational/appAlert';
class componentName extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // console.log('..........审核通过', this.props.Params)
    }
    open = () => {
        // console.log('关了。。。', this.props.Params.id);
        localStorage.setItem("key", JSON.stringify(this.props.Params));
        appAlert.open({
            alertTip: '这是弹框',
            consoleAlert: function () {
                console.log('关了。。。。。。。。');
            },
        });
    }
    render() {
        return (
            <div>
                <li>
                    <h2 className="caseNum">{this.props.Params.name}</h2>
                    <div className="caseDetail">
                        <div className="detail">
                            <div className="userInfo">
                                <span>编号:&nbsp; 085434322;</span>
                                &nbsp;&nbsp;
                                <span>负责人:&nbsp; 王处长</span>
                            </div>
                            <p className="caseTime">{this.props.Params.filingTime}</p>
                            <p className="caseDescribe">
                                {this.props.Params.description}
                            </p>
                        </div>
                        <div className="actionObject">
                            <div className="actionTop">
                                <div className="span">行动对象</div>
                                <span onClick={this.open}>添加行动对象</span>
                            </div>
                            <div className="actionObjectInfo">
                                <div className="actionObjectInfoWrap">

                                    {
                                        this.props.Params.actionObjectList.map((itm) => {
                                            return (
                                                <dl>
                                                    <dd>
                                                        <img
                                                            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3663082828,4038475488&fm=27&gp=0.jpg"
                                                            alt=""
                                                        />
                                                    </dd>
                                                    <dt>
                                                        <span>姓名:{itm.name}</span>
                                                        <span>性别:</span>
                                                        <span>手机号:{itm.phone}</span>
                                                        <span>身份证号:{itm.idNumber}</span>
                                                        <span>{itm.residence}:{itm.city}{itm.area}</span>
                                                        <span>交通:{itm.traffic}</span>
                                                        <span>其他描述:身高180cm，体型健 硕，上衣白衬衫，下装黑裤子</span>
                                                    </dt>
                                                </dl>

                                            );

                                        })
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="fightPlayback">
                            <a href="/deploy/detail" onClick={this.deployClick}>作战部署</a>
                            <a href="/deploy/monitoring" onClick={this.deployClick}>作战指挥</a>
                        </div>
                    </div>
                </li>

            </div>
        );
    }
}

export default componentName;
