import React, { Component, } from 'react';
import Menu from '../../../../../component/Menu/index';
import OperationalModul from '../../../../../component/detail/modul/OperationalModul/index';
import PersonnelModel from '../../../../../component/detail/modul/allocation/index';
import FaciltyList from '../../../../../component/detail/faciltyList/index';
import TaskList from '../../../../../component/detail/taskListLi/index';
import jiantouLeft from '../../../../../../common/deploy-imgs/jiantou1.png';
import jiantouRight from '../../../../../../common/deploy-imgs/jiantou2.png';
import './index.scss';
class componentName extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            data: [],
            tabs: [{ tabName: '案件信息', id: 1, }, { tabName: '人员结构', id: 2, }, { tabName: '设置资源', id: 3, },],
            currentIndex: 0,
            FightDeployFlag: false,
            display_name: 'none', //此状态机为display的取值	
            num: 1,
            detailLists: '',
            newList: [],
        };
    }

    componentDidMount () {
        this.detailList( this.props.location.state.id );
        this.getList();
    }

	handleCancel = () => {
	    this.setState( { Visible: false, } );
	};

	tabChoiced = ( id ) => {
	    // tab切换的方法
	    this.setState( {
	        currentIndex: id,
	    } );
	};

	detailList = ( caseId ) => {
	    this.$axios( {
	        headers: {
	            Authorization: JSON.parse( localStorage.getItem( 'user' ) ).token,
	        },
	        method: 'get',
	        url: 'http://39.98.37.28:8085/command/combat/getCaseDetailByTokenAndCaseId?id=5',
	        id: caseId,
	    } ).then( ( res ) => {
	        // console.log(res.data)
	        this.setState( {
	            detailLists: res.data,
	        } );
	    } );
	}


	getList = () => {
	    return this.$axios( {
	        headers: {
	            Authorization: JSON.parse( localStorage.getItem( 'user' ) ).token,
	        },
	        method: 'get',
	        url: 'http://39.98.37.28:8085/command/combat/getMissionListByCaseId?caseId=1',
	    } ).then( ( res ) => {
	        // console.log(res)
	        this.setState( {
	            newList: res.data,
	        } );
	    } );
	}

	render () {
	    const { detailLists, newList, } = this.state;
	    // console.log(detailLists, newList);
	    var _this = this;
	    var tabList = this.state.tabs.map(
	        function ( res, index ) {
	            // 遍历标签页，如果标签的id等于tabid，那么该标签就加多一个active的className
	            var tabStyle = index === this.state.currentIndex ? 'subCtrls active' : 'subCtrls';
	            return (
	                <span key={index} onClick={this.tabChoiced.bind( _this, index )} className={tabStyle}>
	                    {res.tabName}
	                </span>
	            );
	        }.bind( _this )
	    );
	    return (
	        <div className="message">
	            <div style={{ height: '100%', marginLeft: 50, }} className="deployLeft" onClick={this.leftFun}>
	                <img className="jiantou" src={jiantouLeft}></img>
	            </div>
	            <div style={{ height: '100%', marginRight: 50, }} className="deployRight" onClick={this.rightFun}>
	                <img className="jiantou" src={jiantouRight}></img>
	            </div>
	            <div className="deployContent">
	                <div className="messageLi">
	                    <h2>信息</h2>
	                    <div className="handoverMessage">{tabList}</div>
	                    {!this.state.currentIndex ? (
	                        <div className="li">
	                            <div className="case">
	                                <h3>{detailLists.name}</h3>
	                                <span>编号：{detailLists.number}；负责人：王处长</span>
	                                <span>立案时间：{detailLists.createTime}</span>
	                                <p className="textP"> {detailLists.description}</p>
	                            </div>
	                            <div className="actionObject">
	                                <div className="ObjectList">
	                                    <h3>行动对象</h3>
	                                    <OperationalModul ParamsName={detailLists}></OperationalModul>
	                                </div>

	                                <div className="actionContent">
	                                    {
	                                        detailLists.actionObjectList && detailLists.actionObjectList.map( items => {
	                                            return (
	                                                <dl key={items.id}>
	                                                    <dd>
	                                                        <img src={items.picUrl} alt="" />
	                                                    </dd>
	                                                    <dt>
	                                                        <div className="p">姓名：{items.name}</div>
	                                                        <div className="p">性别：{items.sex}</div>
	                                                        <div className="p">手机号：{items.phone}</div>
	                                                        <div className="p">身份证号：{items.idNumber}</div>
	                                                        <div className="p">住所：{items.province}{items.area}</div>
	                                                        <div className="p">交通：{items.traffic}</div>
	                                                        <div className="p">其他描述：{items.remarks1}</div>
	                                                    </dt>
	                                                </dl>
	                                            );
	                                        } )
	                                    }
	                                </div>
	                            </div>
	                        </div >
	                    ) : this.state.currentIndex === 1 ? (
	                        <div className="li" >
	                            <Menu />
	                        </div>
	                    ) : (
	                        <div className="li">
	                            <FaciltyList></FaciltyList>
	                        </div>
	                    )
	                    }
	                </div>
	                <div className="messageConter">
	                    <div className="messageTask">
	                        {
	                            newList.map( item => {
	                                return (
	                                    <TaskList TaskList={item}></TaskList>
	                                );
	                            } )
	                        }
	                    </div>


	                </div >
	            </div>



	        </div >
	    );
	}
}

export default componentName;
