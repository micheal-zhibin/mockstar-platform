import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

import './index.less';

class LayoutHeader extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            activeMenu: '',
            isInit: false
        };
    }

    handleIsActive = (curMenu) => {
        if (!curMenu) {
            return;
        }
        // console.log('---handleIsActive---', curMenu);

        const map = {
            [`/`]: 'home',
            [`/project`]: 'project',
            [`/permission`]: 'permission',
            [`/wiki`]: 'wiki',
        };

        let newMenuId = map[curMenu.url];

        if (newMenuId && newMenuId !== this.state.activeMenu) {
            setTimeout(() => {
                this.setState({
                    activeMenu: newMenuId,
                    isInit: true
                });
            }, 0);
        }
    };

    render() {
        let { activeMenu } = this.state;

        return (
            <Layout.Header className="layout-header header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[activeMenu]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="home">
                        <NavLink to={`/`} isActive={this.handleIsActive}>首页</NavLink>
                    </Menu.Item>

                    <Menu.Item key="project">
                        <NavLink to={`/project`} isActive={this.handleIsActive}>项目</NavLink>
                    </Menu.Item>

                    <Menu.Item key="permission">
                        <NavLink to={`/permission`} isActive={this.handleIsActive}>权限</NavLink>
                    </Menu.Item>

                    <Menu.Item key="wiki">
                        <NavLink to={`/wiki`} isActive={this.handleIsActive}>wiki</NavLink>
                    </Menu.Item>

                </Menu>
            </Layout.Header>
        );
    }
}

export default LayoutHeader;