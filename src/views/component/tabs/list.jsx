import React,{Component,} from 'react';
import './main.css';
class List extends Component{
    handleClick(){
        this.props.handleClick(this.props.index);
    }
    render(){
        return(
            <li className={this.props.currentClass(this.props.index)} onClick={ this.handleClick.bind(this)} >{this.props.val}</li>
        );
    }
}
export default List;