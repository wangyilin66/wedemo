import React,{Component,} from 'react';
// import ReactDOM from 'react-dom';
import Content from './content.jsx';
import List from './list.jsx';
import './main.css';
class TabBox extends Component{
    constructor(){
        super();
        this.state = {
            list: ['审核中', '审核通过', '已结案',],   
            content: [
                {item: '1',},
                {item: '2',},
                {item: '3',},
            ],
            current: 0,
        };
    }
    handleClick(index){
        this.setState({current: index,});
    }
    currentClass(index){
        return this.state.current === index ? 'current' : '';
    }
    contentClass(index){
        return this.state.current === index ? 'active' : '';
    }
    render(){
        return (
            <div id="outer">
                <ul id="tab">
                    { this.state.list.map((val, index) => {
                        return (
                            <List currentClass={this.currentClass.bind(this)} handleClick={this.handleClick.bind(this)}
                                val={val} key={index} index={index}/> );
                    }) }
                </ul>
                <div id="content">
                    { this.state.content.map((val, index) => {
                        return (<Content key={index} val={val.item} index={index}
                            contentClass={ this.contentClass.bind(this) }/> );
                    })}
                </div>
            </div>
        );
    }
}

export default TabBox;