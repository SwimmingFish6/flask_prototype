/**
 * Created by luxuhui on 2017/5/19.
 */
import React from 'react'
import {Layout, Row, Col, Menu, Breadcrumb, Card, Icon} from 'antd'


export default class NewsItem extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <section className="newsCard">
                <Row>
                    <Col span={6}>
                        <img src={this.props.info.news_image}
                             alt="example"
                             width="100%"/>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={15} height="100%">
                        <Row>
                        <div className="news_title">
                            {this.props.info.news_title}
                        </div>
                        <div className="news_digest">
                            {this.props.info.news_digest}
                        </div>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <div className="news_type">
                                {this.props.info.news_type}
                            </div>
                            <div className="news_source">
                                {this.props.info.news_source}
                            </div>
                            <div className="news_date">
                                {this.props.info.news_date}
                            </div>
                        </Row>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </section>
        )
    }
}
