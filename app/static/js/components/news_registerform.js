/**
 * Created by luxuhui on 2017/6/7.
 */
import React from 'react'
import {Form, Input, Tooltip, Icon, Select, Checkbox, Button, Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


function success() {
    const modal = Modal.success({
        title: '恭喜您注册成功',
        content: '欢迎成为狗扑大家庭的新成员',
    });
     setTimeout(() => modal.destroy(), 1000);
}

function error() {
  Modal.error({
    title: '未知错误，注册失败',
    content: '可能是由于服务器存在问题注册失败，请您稍后再尝试',
  });
}

export default class NewsRegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            iconLoading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.checkConfirm = this.checkConfirm.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    handleSubmit(e) {
         this.setState({
            iconLoading: true
        });
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                 $.ajax({
                    url: '/register',
                    data: values,
                    type: 'POST',
                    dataType: 'json',
                    success: (response) => {
                        this.setState({
                            iconLoading: false
                        });
                        if(response.state) {
                            success();
                            this.props.handleLogin();
                        }
                    },
                     error: () => {
                        error();
                     }
                });
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector">
                <Option value="86">+86</Option>
            </Select>
        );


        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '输入邮箱格式有误！',
                        }, {
                            required: true, message: '请输入您的邮箱',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>密码&nbsp;
                                                    <Tooltip title="建议密码包括大写字母，小写字母，数字以及特殊符号三种及以上">
                <Icon type="question-circle-o"/>
                                                    </Tooltip></span>)}
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '输入密码',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认您的密码输入是否一致',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              昵称&nbsp;
                            <Tooltip title="请问您希望别人怎么称呼您呢">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('nickname', {
                        rules: [{required: true, message: '请输入您的用户名', whitespace: true}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: '请输入您的手机号码'}],
                    })(
                        <Input addonBefore={prefixSelector}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>我已经阅读并同意用户注册协议</Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">注册</Button>
                </FormItem>
            </Form>
        );
    }
}
