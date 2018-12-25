import React, { Component } from 'react';
import { Layout, List } from 'antd';
import { NavLink } from 'react-router-dom';

import './index.less';

class LayoutHeader extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <List
                theme="dark"
                header="cgi列表"
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
        );
    }
}

export default LayoutHeader;