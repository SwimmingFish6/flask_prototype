/**
 * Created by luxuhui on 2017/5/12.
 */
import React from 'react'
import {Layout, Row, Col, Menu} from 'antd'

export default class NewsFooter extends React.Component {


    render() {
        return (
            <Layout className="footer" id="footer">
                <Row style={{ color: "#D5D5D5"}}>
                    <Col span={2}></Col>
                    <Col span={10}>
                        <Row>
                            狗扑——最新闻的新闻网站
                        </Row>
                        <Row>
                            作者：一天到晚游泳的鱼
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row>
                            课外学习
                        </Row>
                        <Row>
                            <ul>
                                <li><a href="http://www.softwareengineerinsider.com/">Software Engineer Insider</a></li>
                                <li><a href="http://www.tutorialspoint.com/cmmi/">SEI CMMI Tutorial</a></li>
                            </ul>
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row>
                            友情链接
                        </Row>
                        <Row>
                            <ul>
                                <li><a href="http://10.202.78.13/">浙江大学现代教务管理系统</a></li>
                                <li><a href="http://cspo.zju.edu.cn/redir.php?catalog_id=2">计算机科学与技术学院办公网</a></li>
                            </ul>
                        </Row>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col span={9}></Col>
                    <Col span={6}>
                        <div id="displayList">
                            <ul style={{float: 'left'}}>
                                <li span={2}>
                                    <a href="#" title="Twitter Profile">
                                        <span className="icon fa fa-twitter"></span>
                                    </a>
                                </li>
                                <li span={2}>
                                    <a href="#" title="Facebook Profile">
                                        <span className="icon fa fa-facebook"></span>
                                    </a>
                                </li>
                                <li span={2}>
                                    <a href="#" title="Linkedin Profile">
                                        <span className="icon fa fa-linkedin"></span>
                                    </a>
                                </li>
                                <li span={2}>
                                    <a href="#" title="Github Profile">
                                        <span className="icon fa fa-github"></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Google Profile">
                                        <span className="icon fa fa-google"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={9}></Col>
                </Row>
                <Row>
                    <p id="copyRight">
                        Copyright &copy;2017 Xuhui Lu. All Rights Reserved.
                    </p>
                </Row>
            </Layout>
        )
    }
}
