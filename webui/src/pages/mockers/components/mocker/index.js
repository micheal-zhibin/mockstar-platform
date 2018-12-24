import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { AsyncClient } from 'mockstar-client';

import { ajax } from '../../../../business/db';

import { loadMocker, loadMockerReadme, setMockerActiveModule, setMockerDisable, addMocker } from '../../data/data-mocker';
import { loadMockerList } from '../../data/data-mocker-list';

import MockerBreadcrumb from './display-breadcrumb';
import MockerDetail from './display-detail';
import MockerShowResult from './display-show-result';
import MockerSwitcher from './display-action';
import MockerProxyTips from './display-proxy-tips';
import MockModuleList from './display-mock-module-list';
import MockerReadme from './display-readme';
import MockerMenu from './display-menu';
import AddMocker from './display-add-mocker';

import { getNamespace } from '../../../../custom';

import './index.less';

class Mocker extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalShowData: null,
            isShowAdd: false
        };
    }

    componentDidMount() {
        console.log('Mocker componentDidMount', this.props);

        let { mockerName, namespace } = this.props.match.params;

        // 加载这个 mocker 的信息
        this.props.loadMocker(mockerName, namespace);
        this.props.loadMockerReadme(mockerName, namespace);

        // 加载所有的 mocker，主要是为了菜单展示
        this.props.loadMockerList(namespace);
    }

    getMockServerHost() {
        const { localServerConfig } = this.props;

        // hostname 应该与页面一致
        const hostname = window.location.hostname;

        // 如果是本地服务，则需要更换端口号为服务端返回的端口号。
        // 例如本地调试的页面是 127.0.0.1:3000 而 mock server 是 127.0.0.1:9527
        const port = (hostname === 'localhost' || hostname === '127.0.0.1') ? localServerConfig.port : window.location.port;

        // 有端口的时候一定要记得设置端口
        return hostname + (port ? `:${port}` : '');
    }

    handlePreviewResult = (query) => {
        const { mockerItem } = this.props;

        let actualURL = mockerItem.config.route;

        // 获得 host
        let host = this.getMockServerHost();

        if (mockerItem.config.plugin !== 'async') {
            // 如果有指定的host，则使用指定的host
            if (host && (actualURL.indexOf(host) < 0)) {
                let namespace = getNamespace();
                let url = (actualURL.indexOf('/') === 0) ? actualURL : '/' + actualURL;
                let fullPath = (namespace ? `/${namespace}` : '') + url;
                actualURL = `http://${host}${fullPath}`;
            }

            ajax({
                method: mockerItem.config.method,
                url: actualURL,
                data: query
            })
                .then((data) => {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log(`url=${actualURL}`, query, data);
                    }

                    this.handleModalShow(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            let asyncClient = new AsyncClient(`http://${host}`);

            asyncClient.request(actualURL, query)
                .then((data) => {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log(`url=${actualURL}`, query, data);
                    }

                    this.handleModalShow(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    handleActive = (name) => {
        let { namespace } = this.props.match.params;
        this.props.setMockerActiveModule(this.props.mockerItem.name, name, namespace);
    };

    handleModalShow = (data) => {
        this.setState({
            modalShowData: data
        });
    };

    handleModalHide = () => {
        this.setState({
            modalShowData: null
        });
    };

    handleModalEmitPush = (data) => {
        console.log('--push---', data);
        const { mockerItem } = this.props;

        // 获得 host
        let host = this.getMockServerHost();

        let asyncClient = new AsyncClient(`http://${host}`);

        asyncClient.emit('emitStub', {
            route: mockerItem.config.route,
            name: mockerItem.config.name,
            activeModule: mockerItem.config.activeModule,
            result: data
        });
    };

    handleDisable = () => {
        let { namespace } = this.props.match.params;
        this.props.setMockerDisable(this.props.mockerItem.name, !this.props.mockerItem.config.disable, namespace);
    };

    handleRefresh = (mockerName) => {
        let { namespace } = this.props.match.params;
        // 加载这个 mocker 的信息
        this.props.loadMocker(mockerName, namespace);
        this.props.loadMockerReadme(mockerName, namespace);
    };

    handlerShowAddMocker = (isShowAdd) => {
        this.setState({
            isShowAdd
        })
        if (!isShowAdd) {
            let { mockerName } = this.props.match.params;
            // 加载所有的 mocker，主要是为了菜单展示
            this.handleRefresh(mockerName);
        }
    };

    handleAddMocker = (cgiName, mockerName, namespace, content) => {
        this.props.addMocker(cgiName, mockerName, namespace, content)
    };

    render() {
        const { isLoaded, mockerItem, readme, match, mockerListInfo } = this.props;
        const { modalShowData, isShowAdd } = this.state;
        const mockServerHost = this.getMockServerHost();

        return (
            <Layout className="mockers-mocker">
                <Layout.Sider className="mocker-sider" width="300">
                    <MockerMenu mockerListInfo={mockerListInfo} match={match} refresh={this.handleRefresh} />
                </Layout.Sider>

                <Layout className="mocker-content">
                    <MockerBreadcrumb name={mockerItem.name} match={match} />

                    {
                        isLoaded ? (
                            <div>
                                <MockerSwitcher
                                    isDisabled={mockerItem.config.disable}
                                    activeModule={mockerItem.config.activeModule}
                                    previewResult={this.handlePreviewResult.bind(this, null)}
                                    updateDisable={this.handleDisable}
                                    addMockers={this.handlerShowAddMocker.bind(this, true)}
                                />

                                <MockerProxyTips
                                    isDisabled={mockerItem.config.disable}
                                    mockerItem={mockerItem}
                                    mockServerHost={mockServerHost}
                                />

                                <MockerDetail
                                    mockerItem={mockerItem}
                                />

                                <MockModuleList
                                    isLoaded={isLoaded}
                                    mockerItem={mockerItem}
                                    previewResult={this.handlePreviewResult}
                                    updateActive={this.handleActive}
                                />

                                <MockerShowResult
                                    data={modalShowData}
                                    mockerItem={mockerItem}
                                    onHide={this.handleModalHide}
                                    onEmitPush={this.handleModalEmitPush}
                                />

                                <AddMocker
                                    data={isShowAdd}
                                    mockerItem={mockerItem}
                                    onHide={this.handlerShowAddMocker.bind(this, false)}
                                    namespace={this.props.match.params.namespace}
                                    onSubmit={this.handleAddMocker}
                                />

                                <MockerReadme htmlContent={readme} />

                            </div>
                        ) : (
                            <div>加载中...</div>
                        )
                    }
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const { mockerInfo, mockerListInfo, detailInfo } = state;

    return {
        isLoaded: mockerInfo.isLoaded,
        mockerItem: mockerInfo.data,
        readme: mockerInfo.readme,
        mockerListInfo: mockerListInfo,
        localServerConfig: detailInfo.config,
        hostname: detailInfo.hostname
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadMockerList(namespace) {
            return dispatch(loadMockerList(namespace));
        },

        loadMocker(mockerName, namespace) {
            return dispatch(loadMocker(mockerName, namespace));
        },

        loadMockerReadme(mockerName, namespace) {
            return dispatch(loadMockerReadme(mockerName, namespace));
        },

        setMockerActiveModule(mockerName, mockModuleName, namespace) {
            return dispatch(setMockerActiveModule(mockerName, mockModuleName, namespace));
        },

        setMockerDisable(mockerName, value, namespace) {
            return dispatch(setMockerDisable(mockerName, value, namespace));
        },

        addMocker(cgiName, mockerName, namespace, content) {
            return dispatch(addMocker(cgiName, mockerName, namespace, content));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mocker);


