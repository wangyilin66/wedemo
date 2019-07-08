import React from 'react';
import SquadList from '../SquidList/index';
import './index.scss';
class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // newList: []
        };
    }
    componentDidMount() {
        console.log(this.props.TaskList);
    }

    render() {
    // const { newList } = this.state;
        return (
            <div className="taskLi">
                <h2>2019.05.20任务一</h2>
                <div className="Info">
                    <span>任务编号：保证XX活动的顺利开展</span>
                    <span>负责人：宋江</span>
                    <span>方法：方法一（跟踪）</span>
                    <span>创建人：吴用</span>
                    <span>相关行动对象：宋江</span>
                    <span>执行人：宋江</span>
                    <span>任务时间：2019-05-05 09:00-18;00</span>
                    <span>任务地点：北京市朝阳区</span>
                </div>
                <div className="devices">
                    <h4>人员设备：</h4>
                    <div className="devicesPart">
                        <SquadList></SquadList>
                        <SquadList></SquadList>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskList;
