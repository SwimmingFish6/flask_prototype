/**
 * Created by luxuhui on 2017/5/23.
 */
import React from 'react'
import {Layout, Modal} from 'antd'
import iScroll from "iscroll/build/iscroll-probe";
import NewsItem from "./news_item";

const {Content} = Layout;


export default class NewsDisplaylist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            items: [],
            visible: false,
            item: [],
            pullDownStatus: 3,
            pullUpStatus: 0,
            switchtype: true
        };

        this.page = 1;
        this.itemsChanged = false;

        this.pullDownTips = {
            // 下拉状态
            0: '下拉发起刷新',
            1: '继续下拉刷新',
            2: '松手即可刷新',
            3: '正在刷新',
            4: '刷新成功',
        };

        this.pullUpTips = {
            // 上拉状态
            0: '上拉发起加载',
            1: '松手即可加载',
            2: '正在加载',
            3: '加载成功',
        };

        this.isTouching = false;

        this.onScroll = this.onScroll.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);


        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    componentDidMount() {
        const options = {
            // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
            preventDefault: false,
            // 禁止缩放
            zoom: false,
            // 支持鼠标事件，因为我开发是PC鼠标模拟的
            mouseWheel: true,
            // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
            probeType: 3,
            // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
            bounce: true,
            // 展示滚动条
            scrollbars: true,
        };

        this.iScrollInstance = new iScroll('#newsContent', options);
        this.iScrollInstance.on('scroll', this.onScroll);
        this.iScrollInstance.on('scrollEnd', this.onScrollEnd);

        this.fetchItems(true);
    }

    componentWillReceiveProps(nextProps) {
        this.page = 1;
        this.state.type = nextProps.type;
        this.state.switchtype = true;
        this.fetchItems(true);
    }

    fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        var data = {"type": this.state.type, "page": this.page};

        $.ajax({
            url: '/get_list',
            data: data,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                if (isRefresh) {    // 刷新操作
                    if (this.state.pullDownStatus == 3 || this.state.switchtype) {
                        this.setState({
                            pullDownStatus: 4,
                            items: response.data,
                            switchtype: false
                        });
                        this.iScrollInstance.scrollTo(0, -1.5 * $(this.refs.PullDown).height(), 500);
                    }
                } else {    // 加载操作
                    if (this.state.pullUpStatus == 2) {
                        this.setState({
                            pullUpStatus: 0,
                            items: this.state.items.concat(response.data)
                        });
                    }
                }
                ++this.page;
                console.log(`fetchItems=effected isRefresh=${isRefresh}`);
            }
        });
    }

    showModal(e) {
        var item = this.state.items[e.currentTarget.getAttribute("data-index")];
        this.setState({
            item: item,
            visible: true
        });
    };

    handleOk(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    onTouchStart(ev) {
        this.isTouching = true;
    }

    onTouchEnd(ev) {
        this.isTouching = false;
    }

    onPullDown() {
        // 手势
        if (this.iScrollInstance.y >= 0) {
            this.state.pullDownStatus != 2 && this.setState({pullDownStatus: 2});
        } else {
            this.state.pullDownStatus != 1 && this.setState({pullDownStatus: 1});
        }
    }

    onPullUp() {
        // 手势
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
            this.state.pullUpStatus != 1 && this.setState({pullUpStatus: 1});
        } else {
            this.state.pullUpStatus != 0 && this.setState({pullUpStatus: 0});
        }
    }

    onScroll() {
        let pullDown = $(this.refs.PullDown);

        // 上拉区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            this.onPullDown();
        } else {
            this.state.pullDownStatus != 0 && this.setState({pullDownStatus: 0});
        }

        // 下拉区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
            this.onPullUp();
        }
    }

    onScrollEnd() {
        console.log("onScrollEnd" + this.state.pullUpStatus);

        let pullDown = $(this.refs.PullDown);

        // 滑动结束后，停在刷新区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            if (this.state.pullDownStatus <= 1) {   // 没有发起刷新,那么弹回去
                this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 200);
            } else if (this.state.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setState({pullDownStatus: 3});
                this.fetchItems(true);
            }
        }

        //滑动结束后，停在加载区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
            console.log(this.state.pullUpStatus);
            if (this.state.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setState({pullUpStatus: 2});
                this.fetchItems(false);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        this.itemsChanged = nextState.items !== this.state.items;
        return true;
    }

    componentDidUpdate() {
        // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
        if (this.itemsChanged) {
            this.iScrollInstance.refresh();
        }
        return true;
    }


    render() {
        let list = [];


        this.state.items.forEach((item, index) => {
            list.push(
                <li key={index}><a onClick={this.showModal} data-index={index}>
                    <NewsItem info={item}></NewsItem>
                </a></li>
            );
        });

        return (
            <Content id="newsContent">
                <ul id="listInside">
                    <p ref="PullDown" id="PullDown">{this.pullDownTips[this.state.pullDownStatus]}</p>
                    {list}
                    <p ref="PullUp" id="PullUp">{this.pullUpTips[this.state.pullUpStatus]}</p>

                    <Modal
                        title={<div style={{ fontSize:'20px',textAlign: 'center'}}>{this.state.item.news_title}</div>}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                        width="850px"
                    >
                        <div dangerouslySetInnerHTML={{__html: this.state.item.news_content}}>
                        </div>
                        <hr />
                        <div style={{textAlign: 'right', width: '100%'}}>新闻来源: {this.state.item.news_source} </div>
                        <div style={{textAlign: 'right', width: '100%'}}>发布日期: {this.state.item.news_date} </div>
                    </Modal>
                </ul>

            </Content>)
    }
}