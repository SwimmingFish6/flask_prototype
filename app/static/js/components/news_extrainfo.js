/**
 * Created by luxuhui on 2017/6/6.
 */
import React from 'react'
import {Layout, Row, Col, Card, Modal} from 'antd'


export default class NewsExtraInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            loginState: props.loginState,
            receivedNew: false,
            receiveRe: false,
            userInfo: props.userInfo,
            reVisible: false,
            reItem: [],
            newVisible: false,
            newItem: [],
            showType: true
        });

        this.showReModal = this.showReModal.bind(this);
        this.showNewModal = this.showNewModal.bind(this);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    showReModal(e) {
        var item = this.state.reItems[e.currentTarget.getAttribute("data-index")];
        this.setState({
            reItem: item,
            reVisible: true,
            showType: false
        });
    }

    showNewModal(e) {
        var item = this.state.newItems[e.currentTarget.getAttribute("data-index")];
        this.setState({
            newItem: item,
            newVisible: true,
            showType: true
        });
    }

    handleOk(e) {
        console.log(e);
        this.setState({
            reVisible: false,
            newVisible: false,
        });
    }

    handleCancel(e) {
        console.log(e);
        this.setState({
            reVisible: false,
            newVisible: false,
        });
    }

    componentWillMount() {
        $.ajax({
            url: '/get_new',
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                this.setState({
                    newItems: response.data,
                    receivedNew: true
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loginState: nextProps.loginState,
            userInfo: nextProps.userInfo
        });

        if (nextProps.loginState) {
            var data = {};
            data['email'] = nextProps.userInfo['email'];

            $.ajax({
                url: '/recommend',
                data: data,
                type: 'GET',
                dataType: 'json',
                success: (response) => {
                    this.setState({
                        reItems: response.data,
                        receiveRe: true
                    });
                    console.log(this.state.reItem)
                }
            });

        }
    }


    render() {
        let reList = [];
        let newList = [];
        let item;
        let visible;

        if (this.state.showType) {
            item = this.state.newItem;
            visible = this.state.newVisible;
        }
        else {
            item = this.state.reItem;
            visible = this.state.reVisible;
        }

        if (this.state.receivedNew) {
            this.state.newItems.forEach((item, index) => {
                newList.push(
                    <li key={index}><a data-index={index} onClick={this.showNewModal}>
                        <span>[{item['news_type']}]&nbsp;{item['news_title']}</span>
                    </a></li>
                );
            });
        }


        if (this.state.loginState && this.state.receiveRe) {
            let judge=-1;
            this.state.reItems.forEach((item, index) => {
                judge=index;
                reList.push(
                    <li key={index}><a data-index={index} onClick={this.showReModal}>
                        <span>[{item['news_type']}]&nbsp;{item['news_title']}</span>
                    </a></li>
                );
            });
            if (judge==-1)
                reList.push(
                    <span style={{fontSize: '20px'}} key="default-prompt">快来定制你自己推荐模块吧(๑•̀ㅂ•́)و✧</span>
                )
        }
        else
            reList.push(
                <span style={{fontSize: '20px'}} key="default-prompt">客官请先登录啦~</span>
            );
        return (
            <div id="infoArea">
                <Row>
                    <Card title="为您推荐" bordered={false}>
                        <ul>
                            {reList}
                        </ul>
                    </Card>
                </Row>
                <Row> <Card title="最新新闻" bordered={false} id="recommendNews">
                    <ul>
                        {newList}
                    </ul>
                </Card>
                </Row>
                <Modal
                    title={<div style={{fontSize: '20px', textAlign: 'center'}}>{item.news_title}</div>}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width="850px"
                >
                    <div dangerouslySetInnerHTML={{__html: item.news_content}}>
                    </div>
                    <hr />
                    <div style={{textAlign: 'right', width: '100%'}}>新闻来源: {item.news_source} </div>
                    <div style={{textAlign: 'right', width: '100%'}}>发布日期: {item.news_date} </div>
                </Modal>

            </div>
        )
    }
}
