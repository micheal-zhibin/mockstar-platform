import React, { Component } from 'react';

import CgiList from '../../components/layout-cgi-list';
import { Row, Col, List } from 'antd';
import { NavLink } from 'react-router-dom';

import './index.less';

export default class Project extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="cgi-list page-project">
                <Row gutter={16}>
                    <Col span={4}>
                        <CgiList></CgiList>
                    </Col>
                    <Col span={20}>
                        <Row className="text-content">
                                 <List
                                    header="代理详情"
                                    size="middle"
                                    itemLayout="vertical"
                                >
                                    <List.Item key="home">
                                        <div>123</div>
                                    </List.Item>

                                    <List.Item key="project">
                                        <NavLink to={`/project`}>项目</NavLink>
                                    </List.Item>

                                    <List.Item key="permission">
                                        <NavLink to={`/permission`}>权限</NavLink>
                                    </List.Item>

                                    <List.Item key="wiki">
                                        <NavLink to={`/wiki`}>wiki</NavLink>
                                    </List.Item>

                                </List>
                        </Row>
                        <Row className="text-content">
                            <Col span={11} className="left-side">
                                <List
                                    header="修改历史"
                                    size="middle"
                                    itemLayout="vertical"
                                >
                                    <List.Item key="home">
                                        <NavLink to={`/`}>首页</NavLink>
                                    </List.Item>

                                    <List.Item key="project">
                                        <NavLink to={`/project`}>项目</NavLink>
                                    </List.Item>

                                    <List.Item key="permission">
                                        <NavLink to={`/permission`}>权限</NavLink>
                                    </List.Item>

                                    <List.Item key="wiki">
                                        <NavLink to={`/wiki`}>wiki</NavLink>
                                    </List.Item>

                                </List>
                            </Col>
                            <Col offset={2} span={11} className="right-side">
                                <List
                                    header="组合返回"
                                    size="middle"
                                    itemLayout="vertical"
                                >
                                    <List.Item key="home">
                                        <NavLink to={`/`}>首页</NavLink>
                                    </List.Item>

                                    <List.Item key="project">
                                        <NavLink to={`/project`}>项目</NavLink>
                                    </List.Item>

                                    <List.Item key="permission">
                                        <NavLink to={`/permission`}>权限</NavLink>
                                    </List.Item>

                                    <List.Item key="wiki">
                                        <NavLink to={`/wiki`}>wiki</NavLink>
                                    </List.Item>

                                </List>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
