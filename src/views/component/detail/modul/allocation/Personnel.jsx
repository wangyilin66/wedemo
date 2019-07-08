
import React from 'react';
import { Button, Modal, Form, Input, Radio, Tabs, Checkbox, Row, Col, } from 'antd';

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}
const { TabPane, } = Tabs;

const CollectionCreateForm = Form.create({ name: 'form_in_modal', })(
    // eslint-disable-next-line

    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                mode: 'top',
            };
        }
        handleModeChange = e => {
            const mode = e.target.value;
            this.setState({ mode, });
        };

        render() {
            const { visible, onCancel, onCreate, form, } = this.props;
            const { getFieldDecorator, } = form;
            const { mode, } = this.state;
            return (
                <Modal
                    visible={visible}
                    title="人员添加"
                    okText="确认"
                    onCancel={onCancel}
                    onOk={onCreate}
                    className="CeateModal"
                >
                    <Form layout="vertical"
                        className="verticalHeader"
                    >
                        <Form.Item
                            label="小队名称"
                            className="RequestInput"
                        >
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入内容', },],
                            })(<Input className="RequestContent" />)}
                        </Form.Item>
                        <Form.Item
                            className="Requirebutton"
                        >
                            <Button className="addContent">添加</Button>
                        </Form.Item>
                    </Form>
                    <Form layout="vertical" className="verticalList">
                        <Form.Item
                            className=""
                        >
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入内容', },],
                            })(<div>
                                <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 500, }} className="TabList">
                                    {[...Array(30).keys(),].map(i => (
                                        <TabPane tab={`Tab-${i}`} key={i} className="InputContentList">
                                            <div>
                                                <h2 >人员配置</h2>
                                                <div>
                                                    <Checkbox.Group style={{ width: '100%', }} onChange={onChange}>
                                                        <Row className="chackboxPhon">
                                                            <Col span={4}>
                                                                <Checkbox value="A">A人员</Checkbox>
                                                            </Col>
                                                            <Col span={4}>
                                                                <Checkbox value="B">A人员</Checkbox>
                                                            </Col>
                                                            <Col span={4}>
                                                                <Checkbox value="C">A人员</Checkbox>
                                                            </Col>
                                                            <Col span={4}>
                                                                <Checkbox value="D">A人员</Checkbox>
                                                            </Col>
                                                            <Col span={4}>
                                                                <Checkbox value="E">A人员</Checkbox>
                                                            </Col>
                                                        </Row>
                                                    </Checkbox.Group>
                                                </div>
                                            </div>
                                            <div>
                                                <h2>设备配置</h2>
                                                <div> <Checkbox.Group style={{ width: '100%', }} onChange={onChange}>
                                                    <Row className="chackboxPhon">
                                                        <Col span={4}>
                                                            <Checkbox value="A">A</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="B">B</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="C">C</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="D">D</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="E">E</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="D">D</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="E">E</Checkbox>
                                                        </Col>
                                                    </Row>
                                                </Checkbox.Group></div>
                                            </div>
                                            <div>
                                                <h2>人员配置</h2>
                                                <div> <Checkbox.Group style={{ width: '100%', }} onChange={onChange}>
                                                    <Row className="chackboxPhon">
                                                        <Col span={4}>
                                                            <Checkbox value="A">A</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="B">B</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="C">C</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="D">D</Checkbox>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Checkbox value="E">E</Checkbox>
                                                        </Col>
                                                    </Row>
                                                </Checkbox.Group></div>
                                            </div>
                                        </TabPane>
                                    ))}
                                </Tabs>
                            </div>)}
                        </Form.Item>
                    </Form>

                </Modal>
            );
        }
    },
);
export default CollectionCreateForm;