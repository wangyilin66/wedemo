import React from 'react';
import './css/index.css';
import { Modal, Form, Input, Checkbox, Row, Col, Select, DatePicker, Radio, } from 'antd';

const { RangePicker, MonthPicker, } = DatePicker;
const { Option, } = Select;



function handleChange(value) {
    console.log(`Selected: ${value}`);
}

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}
const CollectionCreateForm = Form.create({ name: 'form_in_modal', })(
    // eslint-disable-next-line

    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                newData: [],
            };
        }

        componentDidMount() {
        }

        renderActionOptions(actions = []) {
            return (
                actions.map((action) => {
                    return (
                        <Select.Option key={action.id} value={`${action.name}`}>{action.name}</Select.Option>
                    );
                })
            );
        }

        handleSizeChange = e => {
            this.setState({ size: e.target.value, });
        };

        render() {
            const { visible, onCancel, onCreate, form, Operation, } = this.props;
            const { getFieldDecorator, } = form;
            const { newData, } = this.state;
            console.log(newData);

            return (
                <Modal
                    okText="确认"
                    cancelText="取消"
                    title="基础信息"
                    visible={visible}
                    onCancel={onCancel}
                    onOk={onCreate}
                    className='messageModul'
                >
                    <Form layout="vertical">
                        <Form.Item label="任务编号：">
                            {getFieldDecorator('caseId', {
                                rules: [{ required: true, message: 'Please input the title of collection!', },],
                            })(<Input className="FromInput" />)}
                        </Form.Item>
                        <Form.Item label="任务名称：">
                            {getFieldDecorator('number')(<Input className="FromInput" type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="方法：">
                            {getFieldDecorator('means')(<Input className="FromInput" type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="相关行动对象：">
                            {getFieldDecorator('description', {
                                // initialValue: ['a10', 'c12']
                            })(<Select
                                mode="tags"
                                size='small'
                                placeholder="Please select"
                                style={{ width: '100%', }}
                                className="Select"
                            >
                                {Operation && this.renderActionOptions(Operation.actionObjectList)}
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="负责人：">
                            {getFieldDecorator('responsibleUserId')(<Select
                                className="FromInput"
                                style={{ width: '138px', }}
                            >
                                <Option value="1">庄三</Option>
                                <Option value="2">王五</Option>
                                <Option value="3">李四</Option>
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="执行人：">
                            {getFieldDecorator('executeUserId')(<Select
                                className="FromInput"
                                style={{ width: '138px' ,background:'#fcc',}}
                            >
                                <Option value="1">庄三</Option>
                                <Option value="2">王五</Option>
                                <Option value="3">李四</Option>
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="开始时间：">
                            {getFieldDecorator('startTime')(<DatePicker 
                                renderExtraFooter={() => 'extra footer'} 
                                placeholder=""
                                className="newMother" />)}
                        </Form.Item>
                        <Form.Item label="结束时间：">
                            {getFieldDecorator('endTime')(<DatePicker 
                                renderExtraFooter={() => 'extra footer'} 
                                placeholder=""
                                className="newMother" showTime />)}
                        </Form.Item>
                        <Form.Item label="任务地点：">
                            {getFieldDecorator('location')(<Input className="FromInput" type="textarea" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);


export default CollectionCreateForm;

