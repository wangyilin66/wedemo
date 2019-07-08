import React, { Component, } from 'react';
import Pagination from '../../../../component/Pagination';
import Operational from '../../../../component/operational/operational';
import qs from 'qs';
import { connect, } from 'react-redux';
import { Input, } from 'antd';
import jiantouLeft from '../../../../../common/deploy-imgs/jiantou1.png';
import jiantouRight from '../../../../../common/deploy-imgs/jiantou2.png';
import './operational.scss';

const { Search, } = Input;
class componentName extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            tabs: [{ tabName: '审核中', id: 0, }, { tabName: '审核通过', id: 1, }, { tabName: '已结案', id: 3, },],
            currentIndex: 0,
            newAudit: [], // 行动数据
            newMap: {},
            niceData: {},
            caseIdList: [],

        };
    };


    componentDidMount () {
        this.tabChoiced( this.state.currentIndex );
    }

    // 列表数据
    getList ( status ) {
        return this.$axios( {
            headers: {
                Authorization: JSON.parse( localStorage.getItem( 'user' ) ).token,
            },
            method: 'get',
            url: 'http://39.98.37.28:8085/command/combat/getCaseListByTokenAndStatus',
            params: {
                status: status,
            },
        } ).then( ( res ) => {
            return res.data;
        } );
    }

	tabChoiced = ( id ) => {
	    // tab切换的方法
	    this.setState( {
	        currentIndex: id,
	    } );
	    // console.log(id)
	    this.getList( id ).then( item => {
	        this.setState( {
	            caseIdList: item,
	        } );
	    } );
	};
	// 跳转详情页
	changTo = ( ind ) => {
	    this.props.history.push( '/deploy/detail', { id: ind, } );
	};
	// 跳转行动对象
	onDeploys = ( ind ) => {
	    console.log( ind );
	    this.props.sendPeloyID( {
	        CaseId: ind,
	    } );
	    this.props.history.push( '/deploy/command', { id: ind, } );
	}
	handleActionAdd = () => {
	    this.tabChoiced( this.state.currentIndex );
	}
	render () {
	    const { caseIdList, } = this.state;
	    var tabList = this.state.tabs.map( ( res, index ) => {
	        // 遍历标签页，如果标签的id等于tabid，那么该标签就加多一个active的className
	        var tabStyle = index === this.state.currentIndex ? 'subCtrl active' : 'subCtrl';
	        return (
	            <div className="NavList" key={res.id}>
	                <span onClick={() => this.tabChoiced( res.id )} className={tabStyle} >
	                    {res.tabName}
	                </span>
	                <div className="NavWire" />
	            </div>
	        );
	    }
	    );

	    return (
	        <div className="BoxWrap">
	            <div className="BoxNav">
	                <div className="NavWrap">{tabList}</div>
	                <div className="NavInput">
	                    <Search
	                        placeholder="请输入内容"
	                        onSearch={value => console.log( value )}
	                        style={{ width: 200, }}
	                        className="InputName"
	                    />
	                    <div className="navLine"></div>
	                </div>
	            </div>
	            <div class="deployList">
	                <div style={{ height: '100%', marginLeft: 50, }} className="deployLeft" onClick={this.leftFun}>
	                    <img className="jiantou" src={jiantouLeft}></img>
	                </div>
	                <div style={{ height: '100%', marginRight: 50, }} className="deployRight" onClick={this.rightFun}>
	                    <img className="jiantou" src={jiantouRight}></img>
	                </div>
	                <div className="deployContent">
	                    <ul className="deployLists ">
	                        {caseIdList.map( ( item ) => {
	                            return (
	                                <li key={item.id} className="deployLi">
	                                    <h2 className="caseNum">{item.name}</h2>
	                                    <div className="caseDetail">
	                                        <div className="detail">
	                                            <div className="userInfo">
	                                                <span>案件名称: {item.number};</span>
	                                                <span>负责人: 王处长</span>
	                                            </div>
	                                            <p className="caseTime">立案时间: {item.createTime}</p>
	                                            <p className="caseDescribe">{item.description}</p>
	                                        </div>
	                                        <Operational Params={item} onAdd={this.handleActionAdd}></Operational>
	                                        <div className={item.status === 1 ? 'fightPlayback block' : 'none'} >
	                                            <div
	                                                style={{ cursor: 'pointer', }}
	                                                className="a"
	                                                onClick={this.changTo.bind( this, item.id )}
	                                            >
													作战部署
	                                            </div>
	                                            <div
	                                                style={{ cursor: 'pointer', }} className="a"
	                                                onClick={this.onDeploys.bind( this, item.id )}
	                                            >
													作战指挥
	                                            </div>
	                                        </div>
	                                        <div className={item.status === 3 ? 'fightPlayback block' : 'none'}>
	                                            <div href="/deploy/detail"
	                                                //  onClick={this.deployClick}
	                                                className="a"
	                                            >
													作战回放
	                                            </div>
	                                        </div>
	                                    </div>
	                                </li>
	                            );
	                        } )}
	                    </ul>
	                </div>
	            </div>
	        </div>
	    );
	}
}
const mapStateToProps = ( state ) => {
    return {

    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        sendPeloyID: ( userInfo ) => {
            dispatch( {
                type: 'GET_DEPLOYED_ID',
                payload: userInfo,
            } );
        },
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( componentName );