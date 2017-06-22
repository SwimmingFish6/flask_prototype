/**
 * Created by luxuhui on 2017/5/13.
 */

import React from 'react'
import {Layout, Row, Col, Menu, Icon, Input} from 'antd'
import NewsModal from './news_modal'

const Search = Input.Search;
const {Header} = Layout;

export default class NewsHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 's1',
            loginVisible: false,
            loginState: false,
            userInfo: ''
        };
        this.showLoginModal = this.showLoginModal.bind(this);
        this.setLoginState = this.setLoginState.bind(this);
    }

    showLoginModal(e) {
        this.setState({
            loginVisible: true,
        });
    }

    setLoginState(loginState,userInfo) {
        this.setState({
            loginState: loginState,
            userInfo: userInfo,
            nickname: userInfo.nickname,
            loginVisible: false
        });
        this.props.sendUserInfo(loginState, userInfo);
    }



    render() {
        const {loginState, userInfo} = this.state;

        var nickname;

        if(loginState)
            nickname = userInfo.nickname;
        else
            nickname = "登录/注册";


        return (
            <Layout>
                <Header className="header">
                    <Row>
                        <Col span={5}>
                            <div id="logo">
                                <img alt="logo" src="./static/img/logo2.png"/>
                                <span>狗扑新闻</span>
                            </div>
                        </Col>
                        <Col span={5}>
                            <Search placeholder="请输入搜索关键字"
                                    style={{width: '100%'}}
                                    onSearch={value => console.log(value)}
                                    className="searchInput"
                            />
                        </Col>
                        <Col span={4}></Col>
                        <Col span={10}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                style={{lineHeight: '64px'}}
                                selectedKeys={[this.state.current]}
                            >
                                <Menu.Item style={{float: 'right'}}>
                                    <a onClick={this.showLoginModal}><span id="login"><Icon
                                        type="user"/><span>{nickname}</span></span></a>
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <NewsModal
                    visible={this.state.loginVisible}
                    setLoginState={this.setLoginState}
                    >
                </NewsModal>
            </Layout>
        )
    }
}