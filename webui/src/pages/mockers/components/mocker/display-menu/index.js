import React, { Component } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';

import './index.less';

class MockerMenu extends Component {
    constructor(props, context) {
        super(props, context);

    }

    handleClick = ({ item, key }) => {
        if (this.props.match.params.mockerName !== key) {
            this.props.history.push(this.props.match.path.replace(/:mockerName/gi, key).replace(/:namespace/gi, this.props.match.params.namespace));

            // 通知右侧重新刷新
            this.props.refresh(key);
        }
    };

    render() {
        let { mockerListInfo, match } = this.props;
        if (!mockerListInfo.isLoaded) {
            return null;
        }

        let { mockerName } = match.params;

        return (
            <div className="mocker-menu">
                <Menu
                    defaultSelectedKeys={[mockerName]}
                    selectedKeys={[mockerName]}
                    // style={{ width: '300px' }}
                    onClick={this.handleClick}
                >

                    {
                        mockerListInfo.list.map((item) => {
                            return (
                                <Menu.Item key={item.name} className={item.config.plugin + ' ' + item.config.method}>
                                    {item.name}
                                </Menu.Item>
                            );
                        })
                    }

                </Menu>
            </div>
        );
    }
}

export default withRouter(MockerMenu);