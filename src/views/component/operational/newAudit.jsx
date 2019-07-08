import React, { Component, } from 'react';

class newAudit extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <dl>
                <dd>
                    <img src={this.props.dlItem.picUrl} alt="" />
                </dd>
                <dt>
                    <span>姓名:{this.props.dlItem.name}</span>
                    <span>性别:男</span>
                    <span>手机号:{this.props.dlItem.phone}</span>
                    <span>身份证号:{this.props.dlItem.idNumber}</span>
                    <span>
                        住所:{this.props.dlItem.city}
                        {this.props.dlItem.area}
                    </span>
                    <span>交通:{this.props.dlItem.traffic}</span>
                    <p>其他描述:aaaaaaaaaaa</p>
                </dt>
            </dl>
        );
    }
}

export default newAudit;
