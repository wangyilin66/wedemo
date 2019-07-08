import React, { Component, } from 'react';
import './play_back_box.css';

export default class play_back_box extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            tablist:[
                {inner:"关键节点",id:0,},
                {inner:"警报信息",id:1,},
                {inner:"批注信息",id:2,},  
            ],
            currentIndex: 0,
            postilList:[],
        });
    }
    tabChoiced = (id) => {
        // tab切换的方法
        this.setState({
            currentIndex: id,
        });
    }
    componentDidMount(){
        this.$axios({
            method: "get",
            url: "http://39.98.37.28:8085/command/combat/getCaseLabelListByCaseId",
        }).then((res) => {
            if(res.code == 1){
                this.setState({
                    postilList:res.data,
                });
            }else{
                console.log("批注信息获取失败");
            }
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
                        <span>{res.inner}</span>
                    </li>
    
                        
                );
            }.bind(_this)
        );

        return (

            <div className="right_play_back_box">
                <div className='imboxtitle'>即时通讯</div>
                <div className="navIm">
                    {tablist}
                </div>
                {this.state.currentIndex === 0 ? <div>box1</div> : null}
                {this.state.currentIndex === 1 ? <div>box2</div> : null}
                {this.state.currentIndex === 2 ? <div>box3</div> : null}
            </div>
        );
    }
}
