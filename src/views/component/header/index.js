import React, {Component,} from 'react';
import './index.css';
import { connect, } from 'react-redux';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = ({
            h:null,
            f:null,
            s:null,
            y:null,
            m:null,
            ds:null,
            days:null,
        });
    }

    componentDidMount() {

        let that = this;

        setInterval(function () {
            var d = new Date();
            var y = d.getFullYear();
            var m = d.getMonth() + 1;
            var ds = d.getDate();
            if (ds <= 9) {
                ds = '0' + ds;
            }
            var h = d.getHours();
            if (h <= 9) {
                h = '0' + h;
            }
            var f = d.getMinutes();
            if (f <= 9) {
                f = '0' + f;
            }
            var s = d.getSeconds();
            if (s <= 9) {
                s = '0' + s;
            }
            var days = d.getDay();
            switch (days) {
            case 1:
                days = '星期一';
                break;
            case 2:
                days = '星期二';
                break;
            case 3:
                days = '星期三';
                break;
            case 4:
                days = '星期四';
                break;
            case 5:
                days = '星期五';
                break;
            case 6:
                days = '星期六';
                break;
            case 0:
                days='星期日';
                break;

            }
 
            let str = `<li>{h}:{f}:{s}</li><li>{y}-{m}-{ds}</li><li>{days}</li>`;

            that.setState({
                h:h,
                f:f,
                s:s,
                y:y,
                m:m,
                ds:ds,
                days:days,
            });
   
        },1000);
    }

    render() {
        return (
            <div className="header" >
                <div className="imgBox" >
                    <span className='word' > 作战指挥平台 </span>
                    <ul className='timerright' ref='timebox' >
                        <li className='logout'>{this.props.userNick === '' ? '' : '退出登录'}</li>
                        <li>{this.props.userNick}</li>
                    </ul>
                    <ul className='timerleft' ref='timebox' >
                        <li>{this.state.h}:{this.state.f}:{this.state.s}</li>
                        <li>{this.state.y}-{this.state.m}-{this.state.ds}</li>
                        <li>{this.state.days}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {userID,userNick,} = state.UserInfoReducer || {};
    return {
        userNick:userNick,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
   
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(Header);