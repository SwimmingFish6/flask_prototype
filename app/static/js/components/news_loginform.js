/**
 * Created by luxuhui on 2017/6/7.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Modal} from 'antd';
const FormItem = Form.Item;

function success() {
    const modal = Modal.success({
        title: '登录成功',
        content: '您将进入狗扑新闻的世界',
    });
     setTimeout(() => modal.destroy(), 1000);
}
function error(errormsg) {
    Modal.error({
        title: errormsg+'，登录失败',
        content: '可能是由于服务器存在问题登录失败，请您稍后再尝试',
    });
}

export default class NewsLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            loginState: false,
            iconLoading: false
        });

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            iconLoading: true
        });

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $.ajax({
                    url: '/verify',
                    data: values,
                    type: 'GET',
                    dataType: 'json',
                    success: (response) => {
                        this.setState({
                            loginState: response.state,
                            iconLoading: false
                        });
                        if (this.state.loginState) {
                            success();
                            this.props.handleCheckLogin(this.state.loginState, response.userInfo);
                        }
                        else{
                            error(response.errormsg);
                        }
                    },
                    error: () => {
                         this.setState({
                            iconLoading: false
                        });
                        error("未知错误");
                    }
                });

            }
        });
    }

    componentWillUpdate() {
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <p className="login-form-tip">狗扑每日小贴士: 每日要记得多喝开水哦~~</p>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: '请输入您的用户名'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入您的密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox className="login-form-remember">记住密码</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码？</a>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                            loading={this.state.iconLoading}>
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
