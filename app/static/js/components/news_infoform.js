/**
 * Created by luxuhui on 2017/6/8.
 */
import React from 'react'
import {Form, Button, Checkbox, Modal} from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

function success() {
    const modal = Modal.success({
        title: '更新成功',
        content: '您将看到更多新鲜推荐',
    });
    setTimeout(() => modal.destroy(), 1000);
}
function error(errormsg) {
    Modal.error({
        title: errormsg + '，登录失败',
        content: '可能是由于服务器存在问题登录失败，请您稍后再尝试',
    });
}

let type_dict = {
    'news': '新闻',
    'sports': '体育',
    'ent': '娱乐',
    'economy': "财经",
    'war': '军事',
    'car': '汽车',
    'tech': '科技',
    'mobile': '手机',
    'digit': '数码',
    'lady': '女性',
    'edu': '教育',
    'health': '健康',
    'tour': '旅游',
    'child': '亲子',
    'home': '家居',
    'house': '房产'
};
export default class NewsInfoForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var data = {};
                data['email'] = this.props.userInfo['email'];
                console.log('Received values of form: ', values);
                data['hobby'] = JSON.stringify(values.hobby);

                $.ajax({
                    url: '/update',
                    data: data,
                    type: 'POST',
                    dataType: 'json',
                    success: (response) => {
                        if (response.state) {
                            success();
                            this.props.handleCheckLogin(true, response.userInfo);
                        }
                        else {
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
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.change != nextProps.form.hobby) {
            let hobby = [];
            for (var item in type_dict) {
                for (var item_2 in nextProps.userInfo.hobby) {
                    if (item == nextProps.userInfo.hobby[item_2]) {
                        hobby.push(item);
                        break;
                    }

                }
            }

            this.props.form.setFieldsValue({
                hobby: hobby
            });
        }
    }

    componentDidMount() {
        let hobby = [];
        for (var item in type_dict) {
            for (var item_2 in this.props.userInfo.hobby) {
                if (item == this.props.userInfo.hobby[item_2]) {
                    hobby.push(item);
                    break;
                }

            }
        }
        this.props.form.setFieldsValue({
            hobby: hobby
        });
    }


    render() {
        let list = [];

        for (var item in type_dict) {
            list.push(
                <Checkbox
                    key={item} value={item}>{type_dict[item]}</Checkbox>
            );
        }

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="兴趣爱好"
                >
                    {getFieldDecorator('hobby')(
                        <CheckboxGroup>
                            {list}
                        </CheckboxGroup>
                    )}
                </FormItem>

                <FormItem
                    wrapperCol={{span: 12, offset: 6}}
                >
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}
