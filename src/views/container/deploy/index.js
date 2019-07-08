import React, { Component, } from 'react';
import './index.css'; // css样式
import Command from '../map/index'; // 作战指挥 地图
import Operational from './child/operational'; // 作战部署
import Detail from './child/operational/detail'; // 作战部署详情页
import Monitoring from './child/monitoring'; // 集中监控
import MonitoringMore from './child/monitoring-more';  // 集中监控
import Study from './child/Shujuyanpan/Shujuyanpan'; // 数据研判
import Pigeonhole from './child/Pigeonhole/Pageonhole'; // 案件归档
import Exchange1 from './child/Exchange1/Exchange1.js'; // 工作交流
import Exchange from './child/Exchange/Exchange.js'; // 工作交流
import Management from './child/management'; // 系统管理
import Header from '../../component/header/index'; // 头部组件
import { Switch, Route, Redirect, } from "react-router-dom";

class Deploy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [
                {
                    id: 0,
                    name: '首页',
                    link: '/admin',
                }, {
                    id: 1,
                    name: '作战部署',
                    link: '/deploy/operational',
                },
                {
                    id: 2,
                    name: '作战指挥',
                    link: '/deploy/command',
                },
                {
                    id: 3,
                    name: '集中监控',
                    link: '/deploy/monitoring',
                }, {
                    id: 4,
                    name: '数据研判',
                    link: '/deploy/study',
                },
                {
                    id: 5,
                    name: '案件归档',
                    link: '/deploy/pigeonhole',
                },
                {
                    id: 6,
                    name: '工作交流',
                    link: '/deploy/exchange1',
                },

                {
                    id: 7,
                    name: '系统管理',
                    link: '/deploy/management',
                },
            ],
            active: 0,
            headerName: '作战指挥平台',
        };
    }

    tab(val, index) {
        this.setState({
            active: index,
        });
        this.props.history.push(val.link);
    }
    render() {
        return (<div className="deploys" >
            <Header></Header>
            <div className="headerList" > {
                this.state.navList.map((item) => {
                    return <span key={item.id} 
                        style={{cursor: 'pointer',}}
                        onClick={
                            () => { this.tab(item, item.id); }}
                        className={item.id === this.state.active ? 'active' : ''} > {
                            item.name
                        } </span>;
                })
            }
            </div>
            <main className="contentMain">
                <Switch>
                    <Route exact path="/deploy" render={() => {
                        return <Redirect to="/deploy/operational" />;
                    }} />
                    <Route path="/deploy/operational" component={Operational} />
                    <Route path="/deploy/detail" component={Detail} />
                    <Route path="/deploy/command" component={Command} />
                    <Route path="/deploy/deploys" />
                    <Route path="/deploy/monitoring" component={Monitoring} />
                    <Route path="/deploy/study" component={Study} />
                    <Route path="/deploy/pigeonhole" component={Pigeonhole} />
                    <Route path="/deploy/exchange1" component={Exchange1} />
                    <Route path="/deploy/exchange" component={Exchange} />
                    <Route path="/deploy/management" component={Management} />
                </Switch>
            </main>
        </div>

        );
    }
}

export default Deploy;