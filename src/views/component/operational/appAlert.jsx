import React, { Component, } from 'react';
import { is, fromJS, } from 'immutable';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Select, Cascader, Input, Upload, Icon, message, } from 'antd';
import './css/index.scss';
import qs from 'qs';

const { TextArea, } = Input;
const { Option, } = Select;
const paramsId = localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key')) : [];
// const paramsCaseId = paramsId.actionObjectList.map(item => {
//     return item
// });

//  const paramsUrl = paramsCaseId.map(res =>{
//     return res.picUrl
// })
// console.log(paramsUrl[0])

// 上传头像
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
// 上传头像
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
// console.log(beforeUpload, '=====')

function handleChange(value) {
    return `${value}`;
}

let defaultState = {
    alertStatus: false,
    alertTip: "添加行动对象",
    closeAlert: function () { },
};

class appAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertId: '',
            // imageUrl:paramsUrl[1]
        };
    }
    componentDidMount() {
        console.log(this.props.Params, '========');
        // this.state.alertCont.map(items =>{
        //     console.log(items.filter(item =>{

        //     }))
        // })
    }
    state = {
        ...defaultState,
        loading: false,
    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true, });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    // css动画组件设置为目标组件
    FirstChild = props => {
        const childrenArray = React.Children.toArray(props.children);
        return childrenArray[0] || null;
    }
    // 关闭弹框
    confirm = () => {
        this.setState({
            alertStatus: false,
        });
        this.state.closeAlert();
    }


    // 确认添加事件
    conSucceed = (e) => {
        console.log(e);
        this.setState({
            alertStatus: false,
            newData: [],
        });
    
        // const valuepicUrl = 
        const valueName = this.inputName.value; // 姓名
        // const valueSex = sexValue; // 性别
        const valuePhone = this.inputPhone.value; // 手机号
        const valueidNumber = this.inputidNumber.value; // 身份证号
        // const valueProvince = this.inputProvince.value; // 省份
        // const valueCity = this.inputCity.value; // 城市
        // const valueArea = this.inputArea.value; // 区域
        const valueTraffic = this.inputTraffic.value; // 交通方式
        const valueResidence = this.inputResidence.value; // 住址
        // const valueRemarks1 = this.inputRemarks1.value;
        // console.log(valueRemarks1)
        let headers = JSON.parse(localStorage.getItem('user')).token;
        const dataList = qs.stringify({
            picUrl: this.state.imageUrl ,
            name: valueName,
            phone: valuePhone,
            // sex:valueSex,
            idNumber: valueidNumber,
            // province:'',
            // city:'吕梁',
            // area:'离石',
            traffic: valueTraffic,
            residence: valueResidence,
            // remarks1:valueRemarks1
        });
        this.$axios({
            headers: {
                Authorization: headers,
            },
            method: "post",
            url: "http://39.98.37.28:8085/command/combat/addActionObjectByTokenAndCaseId",
            data: dataList,
        }).then(res => {
            if (res.code === 1) {
                // paramsCaseId.push(res.data)
                // window.callback(paramsCaseId)
            }
        });
    }

    open = (options) => {
        console.log(options);
        options = options || {};
        options.alertStatus = true;
        this.setState({
            ...defaultState,
            ...options,
            alertId: options.alertId,
            alertCont:options,
        });
    }
    close() {
        this.state.closeAlert();
        this.setState({
            ...defaultState,
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    render() {

        const uploadButton = (
            // 头像按钮
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl, } = this.state;
        return (
            <ReactCSSTransitionGroup
                component={this.FirstChild}
                transitionName='hide'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div className="alertCons" style={this.state.alertStatus ? { display: 'block', } : { display: 'none', }}>
                    <div className="alertContexts">
                        <div className="alertContentDetails">{this.state.alertTip}</div>
                        <div className="alertProject">
                            <div className="alertphoto">
                                <div className="alertphotos">
                                    <Upload
                                        style={{ width: '100%', height: '100%', position: 'relative', }}
                                        name="avatar"
                                        listType="picture-card"
                                        // className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        <span className="span"></span>
                                        {imageUrl ? <img src={imageUrl} style={{ position: 'absolute', left: 0, top: 0, }} alt="avatar" /> : uploadButton}
                                    </Upload>
                                </div>
                                {/* <span>添加照片</span> */}
                            </div>
                            <div className="alertProCont">
                                <div className="proCont">
                                    <div className="proContName">
                                        <span>姓名：</span>
                                    </div>
                                    <div className="proContInput">
                                        <input type="text" ref={input => this.inputName = input} />
                                    </div>
                                </div>
                                <div className="proCont">
                                    <div className="proContName">
                                        <span>性别：</span>
                                    </div>
                                    <div className="proContInput">
                                        <Select defaultValue="请选择性别" style={{ width: 120, background: '#045287', }} onChange={handleChange}>
                                            <Option value="1" style={{
                                                width: '130px',
                                                height: '24px',
                                                lineHeight: '24px',
                                                background: 'linear-gradient(0deg,rgba(28,93,142,1),rgba(5,70,120,1))',
                                                fontSize: '12px',
                                                fontFamily: 'DFPYuanW7',
                                                fontWeight: 400,
                                                color: 'rgba(3,143,174,1)',
                                            }}>男</Option>
                                            <Option value="2" style={{
                                                width: ' 130px',
                                                height: '24px',
                                                lineHeight: '24px',
                                                background: 'linear-gradient(0deg,rgba(28,93,142,1),rgba(5,70,120,1))',
                                                fontSize: '12px',
                                                fontFamily: 'DFPYuanW7',
                                                fontWeight: 400,
                                                color: 'rgba(3,143,174,1)',
                                            }}>女</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="proCont">
                                    <div className="proContName">
                                        <span>手机号：</span>
                                    </div>
                                    <div className="proContInput">
                                        <input type="text" ref={input => this.inputPhone = input} />
                                    </div>
                                </div>
                                <div className="proCont">
                                    <div className="proContName">
                                        <span>身份证号：</span>
                                    </div>
                                    <div className="proContInput">
                                        <input type="text" ref={input => this.inputidNumber = input} />
                                    </div>
                                </div>
                                <div className="proCont">
                                    <div className="proContName">
                                        <span>户籍所在地：</span>
                                    </div>
                                    <div className="proContInput">
                                        {/* <Picker 
                                            title="选择地区"
                                            extra="选择"
                                            data={antdDistrict}
                                            cols={2}
                                            value={this.state.pickerValue}
                                            onChange={v => this.setState({pickerValue: v})}
                                            onOk={v=>this.setState({pickerValue:v})}
                                        ></Picker>    */}
                                    </div>
                                </div>
                                <div className="proCont">
                                    <div className="proContName">
                                        <span>交通：</span>
                                    </div>
                                    <div className="proContInput">
                                        <input type="text" ref={input => this.inputTraffic = input} />
                                    </div>
                                </div>
                                <div className="proCont">
                                    <div className="proContName">
                                        <span>住所：</span>
                                    </div>
                                    <div className="proContInput">
                                        <input type="text" ref={input => this.inputResidence = input} />
                                    </div>
                                </div>
                                <div className="proCont">
                                    <div className="proContName">
                                        <span>其他描述：</span>
                                    </div>
                                    <div className="proContInput">
                                        {/* <input type="text" /> */}
                                        <TextArea className="AreaText" rows={4} style={{ background: '#045287', }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footercomfirms">
                            <div className="comfirms" onClick={this.confirm}>取消</div>
                            <div className="comfirms" onClick={this.conSucceed}>确认</div>
                        </div>
                    </div>
                </div>
            </ReactCSSTransitionGroup >
        );
    }
}

let div = document.createElement('div');
let props = {
    
};
document.body.appendChild(div);
console.log(props);
let Box = ReactDOM.render(React.createElement(
    appAlert,
    props
), div);


export default Box;
