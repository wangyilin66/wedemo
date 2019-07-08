import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tabs, TabPane, TabContent, ScrollableInkTabBar } from './Tabs';
import expressions from './expressions';

const baidu = require('../../../assets/img/baidu.png');

class Expression extends Component {
   constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        const { name } = e.currentTarget.dataset;
            this.props.onSelect1(name);
    }

    renderDefaultExpression() {return (
        <div className="default-expression">
            {
                expressions.default.map((e, index) => (
                    <div
                        key={index}
                        data-name={e}
                        onClick={this.handleClick}
                    >
                        <div className="image" style={{ backgroundPosition: `left ${-30 * index}px`, backgroundImage: `url(${baidu})` }} />
                    </div>
                ))
            }
        </div>
    )
    }

    render() {
        return (
            <div className="chat-expression">
                <Tabs
                    defaultActiveKey="default"
                    renderTabBar={() => <ScrollableInkTabBar />}
                    renderTabContent={() => <TabContent />}
                >
                    <TabPane tab="默认表情" key="default">
                        {this.renderDefaultExpression()}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Expression;
