/**
 * Created by luxuhui on 2017/6/7.
 */
import React from 'react'
import {Modal, Form} from 'antd';
import NewsLoginForm from './news_loginform'
import NewsRegisterForm from './news_registerform'
import NewsInfoForm from './news_infoform'

export default class NewsModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '欢迎进入狗扑的世界( •̀ .̫ •́ )',
            visible: false,
            modaltype: 'l',
            loginState: false,
            count: 0,
            userInfo: ''
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCheckLogin = this.handleCheckLogin.bind(this);
    }

    handleCheckLogin(loginState, userInfo) {
        if (loginState) {
            this.setState({
                visible: false,
                loginState: true,
                userInfo: userInfo
            });
            this.props.setLoginState(loginState, userInfo);
        }
    }


    handleRegister() {
        this.setState({
            modaltype: 'r',
            title: '欢迎加入狗扑大家庭 (˃̶͈̀௰˂̶͈́)'
        });
    }

    handleLogin() {
        this.setState({
            modaltype: 'l',
            title: '欢迎进入狗扑的世界( •̀ .̫ •́ )'
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }


    componentWillReceiveProps(nextProps) {
        if (this.state.loginState) {
            if (this.state.count > 0) {
                this.setState({
                    modaltype: 'u'
                });
            }
        }
        else {
            this.setState({
                count: this.state.count + 1
            });
        }

        this.setState({
            visible: nextProps.visible,

        });
    }


    render() {
        const {visible, title, loginState, modaltype} = this.state;
        let modal;
        if (modaltype == 'l')
            modal = (
                <div>
                    <WrappedNewsLoginForm handleCheckLogin={this.handleCheckLogin}></WrappedNewsLoginForm>
                    <a onClick={this.handleRegister}>现在注册！</a>
                </div>
            );
        if (modaltype == 'r')
            modal = (
                <div>
                    <WrappedNewsRegisterForm handleLogin={this.handleLogin}></WrappedNewsRegisterForm>
                    <a onClick={this.handleLogin}>返回登录！</a>
                </div>
            );

        if (modaltype == 'u')
            modal = (
                <div>
                    <WrappedNewsInfoForm userInfo={this.state.userInfo} handleCheckLogin={this.handleCheckLogin}></WrappedNewsInfoForm>
                </div>
            );


        return (

            <Modal title={title}
                   visible={visible}
                   onCancel={this.handleCancel}
                   width="400px"
                   footer={null}
                   style={{textAlign: "center"}}

            >
                {modal}
            </Modal>
        );
    }
}
const WrappedNewsLoginForm = Form.create()(NewsLoginForm);
const WrappedNewsRegisterForm = Form.create()(NewsRegisterForm);
const WrappedNewsInfoForm = Form.create()(NewsInfoForm);