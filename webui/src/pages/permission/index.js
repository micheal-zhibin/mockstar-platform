import React, { Component } from 'react';
import { Row, Col, List } from 'antd';
import { NavLink } from 'react-router-dom';

import './index.less';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="page-home text-content">
                <Row className="text-content">
                    <List
                        header="Project members"
                        size="small"
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
                    <List
                        header="Group members"
                        size="small"
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
            </div>
        );
    }
}
