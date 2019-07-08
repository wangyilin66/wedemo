import React, { Component, } from 'react';
import { Modal, Button, } from 'antd';
import moment from 'moment';
import CollectionCreateForm from './CollectionCreateForm';
export class OperationalModuls extends Component {
    state = {
        visible: false,
    };

    componentDidMount() {
        console.log(this.props.ParamsName);
    }
    showModal = () => {
        this.setState({ visible: true, });
    };

    handleCancel = () => {
        this.setState({ visible: false, });
    };

    handleCreate = () => {
        const { form, } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const dataList = {
                caseId: values.caseId,
                number: values.number,
                means: values.means,
                description: values.description.join(','),
                responsibleUserId: values.responsibleUserId,
                executeUserId: values.executeUserId,
                startTime: moment(values.startTime).format('YYYY/MM/DD HH:mm:ss'),
                endTime: moment(values.endTime).format('YYYY/MM/DD HH:mm:ss'),
                location: values.location,
            };
            this.$axios({
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('user')).token,
                },
                method: 'get',
                url: 'http://39.98.37.28:8085/command/combat/addMissionByTokenAndCaseId',
                params: dataList,
            }).then((res) => {
                if (res.code === 1) {
                    console.log(res);
                }
            });
            form.resetFields();
            this.setState({ visible: false, });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <div className="operBtn Operational" type="primary" onClick={this.showModal}>
                    <span>作战部署</span>
                </div>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    Operation={this.props.ParamsName}
                />
            </div>
        );
    }
}

export default OperationalModuls;
