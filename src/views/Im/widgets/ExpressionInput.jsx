import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon'
import Dropdown from './Dropdown';

import Expression from './Expression';
import './Chat.less';

class ExpressionInput extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            expressionVisible: false
        };
         this.handleVisibleChange = this.handleVisibleChange.bind(this);
         this.handleSelectExpression = this.handleSelectExpression.bind(this);
    }
    componentDidUpdate(prevProps) {
        
    }
    
    handleVisibleChange(visible) {
        this.setState({
            expressionVisible: visible
        });
    }
    
    handleSelectExpression(expression) {
        this.handleVisibleChange(false);
        this.props.onSelect(expression);
    }

    expressionDropdown = (
        <div className="expression-dropdown">
            <Expression onSelect1={this.handleSelectExpression.bind(this)} />
        </div>
    )

    render() {
        const { expressionVisible} = this.state;
        var instance = this;
            return (
                <div className="chat-chatInput">
                {/*instance.props.disabled ? <div className="chat-chatInput disabled"/> : <div className="chat-chatInput"/>*/}
                    <Dropdown
                        trigger={['click']}
                        visible={expressionVisible}
                        onVisibleChange={this.handleVisibleChange}
                        overlay={this.expressionDropdown}
                        animation="slide-up"
                        placement="topLeft"
                    >
                       {/* <IconButton className="expression" width={44} height={44} icon="expression" iconSize={32} >*/}
                            <InsertEmoticon fontSize="20" style={{ fontSize: 20 }}/>
                        {/*  </IconButton>*/}
                    </Dropdown>
                </div>
            );
    }
}

export default ExpressionInput;

