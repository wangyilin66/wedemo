import React from 'react';
import { Modal, Button, Input, } from 'antd';
import './index.css';
class Modul extends React.Component {
	state = { visible: false, };

	showModal = () => {
	    this.setState({
	        visible: true,
	    });
	};

	handleOk = (e) => {
	    console.log(e);
	    this.setState({
	        visible: false,
	    });
	};

	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	        visible: false,
	    });
	};

	render() {
	    return (
	        <div>
	            <Button type="primary" onClick={this.showModal}>
					作战部署
	            </Button>
	            <Modal
	                title="基础信息"
	                visible={this.state.visible}
	                onOk={this.handleOk}
	                onCancel={this.handleCancel}
	                closable={false}
	                ant-click-animating-without-extra-node={true}
	            >
	                <Input placeholder="Basic usage" />
	            </Modal>
	        </div>
	    );
	}
}
export default Modul;
