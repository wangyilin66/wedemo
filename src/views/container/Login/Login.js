import React from 'react';
import { Form, Icon, Input, Button,message,} from 'antd';
import './Login.css';
import Header from '../../component/header/index.js';

import Tinode from '../../Im/tinodesdk/tinode.js';
import LocalStorageUtil from '../../Im/lib/local-storage.js';

import { API_KEY, APP_NAME, DEFAULT_ACCESS_MODE, MEDIA_BREAKPOINT, READ_DELAY, RECEIVED_DELAY, } from '../../Im/config.js';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arrs:[],
            addShow:false,
            loading:false,
            loginNm: '',
            passWord: '',
            codes:null,
            username:'',
            userpassword:'',
        };
    }
    componentDidMount(){
        this.getcode();
    }

    getcode = () => {
        let A_Z="";     
        for(let i=65;i<91;i++){
            A_Z+=String.fromCharCode(i)+",";
        }     
        //字符串转数组
        let A_Z_Arr = A_Z.split(',');  
        function getLetter(n) {  
            //根据接收的数字n， 来决定取几个随机字母。默认n = 4
            var letterArr = [];
            for(var i=0 ; i<n ; i++){
                var val = Math.floor(Math.random() * 26);
                if(letterArr.indexOf(val)  === -1) {
                    letterArr.push(A_Z_Arr[val]);
                }else{
                    i--;
                }
            }      
            //返回长度为4的数组             
            return letterArr;
        }
        let str = getLetter(4);
        this.setState({
            codes:str,
        });
      
        let form_box = document.querySelector('.form_box');
      
        str.map((v,i) => {
            let spans = document.createElement("span");
            spans.innerHTML = v;
            spans.className = 'span'+i;
            form_box.appendChild(spans);
        });
    }
      
      changecode = () => {
          let form_box = document.querySelector('.form_box');
          form_box.innerHTML = '';
          this.getcode();
      }

      handleConnected=() =>{
          var params = this.tinode.getServerInfo();
          // this.setState({
          //   serverVersion: params.ver + ' ' + (params.build ? params.build : 'none') + '; '
          // });
          this.doLogin(this.state.username, this.state.userpassword, {meth: null, resp: null,});
      }

      doLogin(login, password, cred) {
        
          // Sanitize and package credentail.
          cred = Tinode.credential(cred);
          // Try to login with login/password. If they are not available, try token. If no token, ask for login/password.
          let promise = null;
          let token = this.tinode.getAuthToken();
        
          if (login && password) {
              this.setState({password: null,});
              promise = this.tinode.loginBasic(login, password, cred);
          } 
    
          if (promise) {
              promise.then((ctrl) => {
                  if (ctrl.code >= 300 && ctrl.text === 'validate credentials') {
                      if (cred) {
                          //this.handleError("Code does not match", 'warn');
                      }
                      //this.handleCredentialsRequest(ctrl.params);
                  } else {
                      console.log("login success!");
                      //this.handleLoginSuccessful();
                      LocalStorageUtil.setObject('auth-token', this.tinode.getAuthToken());
                  }
              }).catch((err) => {
                  // Login failed, report error.
                  //this.setState({loginDisabled: false, credMethod: undefined, credCode: undefined});
                  //this.handleError(err.message, 'err');
                  //localStorage.removeItem('auth-token');
                  //HashNavigation.navigateTo('');
              });
          } else {
          // No login credentials provided.
          // Make sure we are on the login page.
          //HashNavigation.navigateTo('');
          //this.setState({loginDisabled: false});
          }
      }
    

    login=()=>{

        let inpval = this.refs.logininp.value;
        let code = this.state.codes;
        let strcode = '';

        this.tinode = new Tinode(APP_NAME, '47.94.235.90:6060', API_KEY, 'ws', false);

        this.tinode.onConnect = this.handleConnected;

        this.tinode.connect().catch((err) => {
        //Socket error
        // this.handleError(err.message, 'err');
        });



        code.map((v) => {
            strcode += v;
        });
      
        this.props.form.validateFields((err,value)=>{
            if(err){
                message.error('用户信息错误请重试', 1, ()=>{
                    console.log('关闭了');
                });
            }
            else if(strcode.toLowerCase() !== inpval.toLowerCase()){
                alert('验证码错误');
                this.changecode();
            }
            else{     
                this.$axios({
                    method:"post",
                    url:"http://39.98.37.28:8085/user/login",
                    params: {
                        username:this.state.loginNm,
                        password: this.state.passWord,
                    },        
                }).then((res)=>{
                    console.log(res.data);
                    if (res.code === 1&&strcode.toLowerCase() === inpval.toLowerCase())
                    {
                        let userinfo = JSON.stringify(res.data);
                        localStorage.setItem('user',userinfo); 
                        this.props.history.push('/admin');     
                    }           
                    else if(res.code !== 1){
                        alert('用户名或密码错误');
                    }   
                });
            }
        });
    }
    componentWillMount(){
        console.log(this);
    }

    handelUsernameChange(e){
        this.setState({ 
            loginNm:e.target.value,      
        });  
    }

    handelPasswdChange(e)
    {
        this.setState({
            passWord:e.target.value,       
        });
    }

    render(){
        let {getFieldDecorator,}=this.props.form;
        return(
            <div className="main">
                <div className="main_top">
                    <Header></Header>
                </div>
                <div className="main_title">用户登录</div>
                <div className="main_card">
                    <Form.Item>
                        {getFieldDecorator('userName',{
                            rules:[{required:true,message:'用户名不能为空',},],
                            initialValue: this.state.username,
                        })
                        (<Input onChange={this.handelUsernameChange.bind(this)} placeholder="用户名" className="main_card_name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)', fontSize:'26px',}} />} />)}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('userPass',{
                            rules:[{required:true,message:'密码不能为空',},],
                            initialValue: this.state.password,
                        })  
                        (<Input type="password" onChange={this.handelPasswdChange.bind(this)} placeholder="密码" className="main_card_password" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,0.25)', fontSize:'26px',
                        }} />} />)}
                    </Form.Item>

                    <Form.Item className="main_card_block">
                        <input ref="logininp" placeholder="验证码" className="main_card_checkout"></input>
                        {/* (<Input ref="logininp" placeholder="验证码" className="main_card_checkout" prefix={<Icon type="safety-certificate" style={{color: 'rgba(0,0,0,0.25)', fontSize:'26px',
                     }} />} / >)}               */}
                        <div className="form_box" onClick={this.changecode}></div>
                    </Form.Item>

                    <div className="main_card_btn">
                        <Button type="primary" onClick={this.login} className="className=">
                        登录
                        </Button>      
                    </div>
                </div>
            </div>
      
        );
    }
}

export default Form.create()(Login);
