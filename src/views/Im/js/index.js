import React, { Component } from 'react';
import '../css/index.css';

import TinodeWeb from '../views/tinode-web';

import { IntlProvider, addLocaleData } from 'react-intl';
import allMessages from './messages.json';
import { connect } from 'react-redux';
const language = 'en';
const messages = allMessages.en;

 
const mapStateToProps = (state) => {
    return {
        position:state.MsgSendReducer
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {

    }
}

 class im extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            Imflag: "聊天记录",
            tablist:[
                {inner:"聊天记录",id:0},
                {inner:"通讯录",id:1},
                {inner:"设备情况",id:2},  
        ],
        currentIndex: 0
        });
    }

    handlechangeflag(flag){
        this.setState({
            Imflag: flag
        })
    }


  
    componentDidMount(){
        console.log("IM 加载了。。。。。。");
       }

       componentWillReceiveProps(nextProps){
           if(nextProps.position){
               console.log(nextProps.position)
           }else{
               console.log("没有props")
           }
       }

       tabChoiced = (id) => {
		// tab切换的方法
		this.setState({
			currentIndex: id
		});
	}

    render() {
        var _this = this;
        var tablist = this.state.tablist.map(
			function (res, index) {
				// 遍历标签页，如果标签的id等于tabid，那么该标签就加多一个active的className
				var tabStyle = index === this.state.currentIndex ? 'buts active' : 'buts';
				return (
                   
                    <li key={index} onClick={this.tabChoiced.bind(_this, index)} className={tabStyle}> 
                    <span onClick={_this.handlechangeflag.bind(_this,res.inner)}>{res.inner}</span>
                    </li>
    
                        
				);
			}.bind(_this)
		);

        return (
            <div className="imbox">
                <div className='imboxtitle'>即时通讯</div>
                <div className="navIm">
                {tablist}
                </div>
                <IntlProvider locale={language} messages={messages} textComponent={React.Fragment}>
                    <TinodeWeb className="content" Imflag={this.state.Imflag} />
                </IntlProvider>


            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(im);