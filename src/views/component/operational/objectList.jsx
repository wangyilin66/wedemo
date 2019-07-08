// Action弹框
import React from 'react';
import { Select, Modal, Form, Input, Radio, Upload, Icon, message, Cascader, } from 'antd';
import './css/index.scss';
// import { parseCity } from '../../utils/index';
import cityData from '../../../assets/json/city.json';

const { Option, } = Select;

const options = cityData;

// console.log(JSON.stringify(options))


function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}


const CollectionCreateForm = Form.create({ name: 'form_in_modal', })(
    // eslint-disable-next-line
  class extends React.Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        // console.log(info)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true, });
            return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
            this.setState({
                //   imageUrl: info.file.response.data,
                loading: false,
            });
            console.log(this.props.form);
            this.props.form.setFieldsValue({ 'imageUrl': info.file.response.data, });
        }
    };

    passwordValidator = (rule, value, callback) => {
        console.log(value);
        callback();
    }

    normFile = info => {
        console.log('Upload event:', info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true, });
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
            this.setState({
                imageUrl: info.file.response.data,
                loading: false,
            });
            return info.file.response.data;
        }
        return '';
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text"></div>
            </div>
        );
        const { imageUrl, } = this.state;
        const { visible, onCancel, onCreate, form, } = this.props;
        const { getFieldDecorator, } = form;
        return (
            <Modal
                visible={visible}
                title="行动指挥"
                okText="确认"
                onCancel={onCancel}
                onOk={onCreate}
                className="Modal"
            >
                <Form layout="vertical" ref="form">
                    <Form.Item label="">
                        {getFieldDecorator('imageUrl', {
                            valuePropName: 'file',
                            getValueFromEvent: this.normFile,
                        })(<Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="http://39.98.37.28:8085/command/uploadFile"
                            beforeUpload={beforeUpload}
                            // onChange={this.handleChange}
                            style={{ marginLeft: '83px', marginRight: 0, }}
                        >
                            {imageUrl ? <img style={{ width: '100px', height: '100px', }} src={imageUrl} alt="file" /> : uploadButton}
                        </Upload>)}
                    </Form.Item>
                    <Form.Item label="姓名：">
                        {
                            getFieldDecorator('valueName', {
                                rules: [
                                    { required: true, message: '请填写姓名', },
                                    {
                                        validator: this.passwordValidator,
                                    },],
                            })(
                                <Input type="textarea" />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="性别：">
                        {getFieldDecorator('valueSex')(<Select style={{ width: 100, }}>
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="手机号：">
                        {getFieldDecorator('valuePhone')(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item label="身份证号：">
                        {getFieldDecorator('valueidNumber')(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item label="户籍所在地：">
                        {getFieldDecorator('valueProvince')(<Cascader options={options} placeholder="Please select" />)}
                    </Form.Item>
                    <Form.Item label="交通：">
                        {getFieldDecorator('valueTraffic')(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item label="住所：">
                        {getFieldDecorator('valueResidence')(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item label="其他描述：">
                        {getFieldDecorator('valueRemarks1')(<Input className='flastInput' type="textarea" />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
    },
);

export default CollectionCreateForm;