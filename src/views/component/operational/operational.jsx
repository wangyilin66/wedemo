// Action封装
import React, { Component, } from 'react';
import NewDl from '../../component/operational/newAudit';
import CollectionCreateForm from '../../component/operational/objectList';
import qs from 'qs';
import './operational.scss';
export class Operational extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCaseId: '',
            modelId: '',
        };
    }

    state = {
        visible: false,
        newMap: {},
    };

    // 点击model
    showModal = (ind) => {
        this.setState({ visible: true, });
    };

    handleCancel = () => {
        this.setState({ visible: false, });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    handleCreate = () => {
        const { form, } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const dataList = qs.stringify({
                caseId: this.props.Params.id,
                picUrl: values.imageUrl,
                name: values.valueName,
                sex: values.valueSex,
                phone: values.valuePhone,
                idNumber: values.valueidNumber,
                province: values.valueProvince[0],
                city: values.valueProvince[1],
                area: values.valueProvince[2],
                traffic: values.valueTraffic,
                residence: values.valueResidence,
                remarks1: values.valueRemarks1,
            });
            this.$axios({
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('user')).token,
                },
                method: 'post',
                url: 'http://39.98.37.28:8085/command/combat/addActionObjectByTokenAndCaseId',
                data: dataList,
            }).then((res) => {
                console.log(res);
                form.resetFields();
                this.setState({ visible: false, });
                this.props.onAdd();
                // this.$axios({
                //     headers: {
                //         Authorization: JSON.parse(localStorage.getItem('user')).token
                //     },
                //     method: 'get',
                //     url: 'http://39.98.37.28:8085/command/combat/addActionObjectByTokenAndCaseId',
                //     params: {
                //         id:res.id
                //     }
                // }).then(items =>{
                //     console.log(items)
                //     form.resetFields();
                //     this.setState({ visible: false });
                // })

            });
        });
    };


    // componentDidMount() {
    //     console.log(this.props.Params)
    // }

    render() {
        return (
            <div className="actionObject">
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <div className="actionTop">
                    <span>行动对象</span>
                    <span
                        type="primary"
                        onClick={() => this.showModal(this.props.Params.id)}
                    >
                        添加行动对象
                    </span>
                </div>
                <div className="actionObjectInfo">
                    <div className="actionObjectInfoWrap">
                        {this.props.Params.actionObjectList &&
                            this.props.Params.actionObjectList.map((itm) => {
                                return (
                                    <NewDl key={itm.id} dlItem={itm}></NewDl>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Operational;
