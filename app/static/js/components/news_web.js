/**
 * Created by luxuhui on 2017/6/8.
 */
import React from 'react'
import {Layout, Affix} from 'antd';
import NewsFooter from './news_footer'
import NewsHeader from './news_header'
import NewsContent from './news_content'
import 'antd/dist/antd.css'

export default class NewsWeb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: false,
            userInfo: {},
        };

        this.sendUserInfo = this.sendUserInfo.bind(this);
    }

    sendUserInfo(loginState, userInfo) {
        this.setState({
            loginState: loginState,
            userInfo: userInfo
        });
    }



    render() {
        const {loginState, userInfo} = this.state;
        return (
            <Layout id="mainLayout">
                <Affix>
                    <NewsHeader sendUserInfo={this.sendUserInfo} searchNews={this.searchNews}></NewsHeader>
                </Affix>
                <NewsContent loginState={loginState} userInfo={userInfo}></NewsContent>
                <NewsFooter></NewsFooter>
            </Layout>
        )
    }
}
