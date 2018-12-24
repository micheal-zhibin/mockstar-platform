import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';

import LayoutHeader from './components/layout-header';

import Home from './pages/home';
import Project from './pages/project';
import Permission from './pages/permission';
import Wiki from './pages/wiki';

import './App.less';

export default class App extends Component {
    componentDidMount() {
        // 加载管理端的信息，包括配置等
        // this.props.dispatch(loadDetail());
    }

    render() {
        return (
            <Router>

                <Layout className="mockstar-container">

                    <LayoutHeader />

                    <Layout.Content>
                        <Switch>
                            <Route exact path={`/`} component={Home} />
                            <Route exact path={`/project`} component={Project} />
                            <Route exact path={`/permission`} component={Permission} />
                            <Route exact path={`/wiki`} component={Wiki} />
                        </Switch>
                    </Layout.Content>
                </Layout>

            </Router>
        );
    }
}