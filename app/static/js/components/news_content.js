/**
 * Created by luxuhui on 2017/5/14.
 */
import React from 'react'
import {Layout, Menu, Breadcrumb, Card, Icon, Modal} from 'antd'
import NewsDisplaylist from "./news_displaylist";
import NewsExtraInfo from "./news_extrainfo"

const {Sider, Content} = Layout;


export default class NewsContent extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                collapsed: false,
                type: "news",
                loginState: props.state,
            };
        this.toggle = this.toggle.bind(this);
        this.switchType = this.switchType.bind(this);
    }

    switchType(e) {
        var type = e.currentTarget.getAttribute("data-type");
        this.setState({
            type: type,
        });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            loginState: nextProps.loginState,
            userInfo: nextProps.userInfo
        })
    }


    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {


        return (
            <Layout id="contentLayout">
                <Sider width={200}
                       trigger={null}
                       style={{background: 'rgba(255,255,255, 0.0)'}}
                       collapsible
                       collapsed={this.state.collapsed}
                       id="siderLayout"
                >
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        id="siderMenu"
                    >
                        <Menu.Item><Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        </Menu.Item>
                        <Menu.Item><a href="#/news" data-type="news" onClick={this.switchType}><i className="fa fa-eye"></i><span
                            className="nav-text">新闻观察</span></a></Menu.Item>
                        <Menu.Item><a href="#/sports" data-type="sports" onClick={this.switchType}><i className="fa fa-soccer-ball-o"></i><span
                            className="nav-text">体育</span></a></Menu.Item>
                        <Menu.Item><a href="#/ent" data-type="ent" onClick={this.switchType}><i className="fa fa-coffee"></i><span
                            className="nav-text">娱乐</span></a></Menu.Item>
                        <Menu.Item><a href="#/war" data-type="war" onClick={this.switchType}><i className="fa fa-plane"></i><span
                            className="nav-text">军事</span></a></Menu.Item>
                        <Menu.Item><a href="#/economy" data-type="economy" onClick={this.switchType}><i className="fa fa-rmb"></i><span
                            className="nav-text">财经</span></a></Menu.Item>
                        <Menu.Item><a href="#/car" data-type="car" onClick={this.switchType}><i className="fa fa-car"></i><span
                            className="nav-text">汽车</span></a></Menu.Item>
                        <Menu.Item><a href="#/tech" data-type="tech" onClick={this.switchType}><i className="fa fa-cog"></i><span
                            className="nav-text">科技</span></a></Menu.Item>
                        <Menu.Item><a href="#/mobile" data-type="mobile" onClick={this.switchType}><i className="fa fa-tablet"></i><span
                            className="nav-text">手机</span></a></Menu.Item>
                        <Menu.Item><a href="#/digit" data-type="digit" onClick={this.switchType}><i className="fa fa-laptop"></i><span
                            className="nav-text">数码</span></a></Menu.Item>
                        <Menu.Item><a href="#/lady" data-type="lady" onClick={this.switchType}><i className="fa fa-female"></i><span
                            className="nav-text">女性</span></a></Menu.Item>
                        <Menu.Item><a href="#/edu" data-type="edu" onClick={this.switchType}><i className="fa fa-book"></i><span
                            className="nav-text">教育</span></a></Menu.Item>
                        <Menu.Item><a href="#/health" data-type="health" onClick={this.switchType}><i className="fa fa-heart"></i><span
                            className="nav-text">健康</span></a></Menu.Item>
                        <Menu.Item><a href="#/home" data-type="home" onClick={this.switchType}><i className="fa fa-bed"></i><span
                            className="nav-text">家居</span></a></Menu.Item>
                        <Menu.Item><a href="#/tour" data-type="tour" onClick={this.switchType}><i className="fa fa-flag"></i><span
                            className="nav-text">旅游</span></a></Menu.Item>
                        <Menu.Item><a href="#/house" data-type="house" onClick={this.switchType}><i className="fa fa-institution"></i><span
                            className="nav-text">房产</span></a></Menu.Item>
                        <Menu.Item><a href="#/child" data-type="child" onClick={this.switchType}><i className="fa fa-child"></i><span
                            className="nav-text">亲子</span></a></Menu.Item>
                    </Menu>
                </Sider>
                <Layout id="displayLayout">
                    <NewsDisplaylist type={this.state.type}></NewsDisplaylist>
                </Layout>
                <Layout id="infoLayout">
                    <NewsExtraInfo loginState={this.state.loginState} userInfo={this.state.userInfo}></NewsExtraInfo>
                </Layout>
            </Layout>
        )
    }
}
