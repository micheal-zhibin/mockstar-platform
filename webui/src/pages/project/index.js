import React, { Component } from 'react';

import './index.less';

export default class Project extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div class="cgi-list page-project">
                <div className="text-content">
                    <h2>代理详情</h2>
                    <ul>
                        <li>接口1</li>
                        <li>接口1</li>
                        <li>接口1</li>
                        <li>接口1</li>
                        <li>接口1</li>
                        <li>接口1</li>
                    </ul>
                </div>
                <div className="text-content">
                    <div className="left-side">
                        <h2>代理详情</h2>
                        <ul>
                            <li>接口1</li>
                            <li>接口1</li>
                            <li>接口1</li>
                            <li>接口1</li>
                            <li>接口1</li>
                            <li>接口1</li>
                        </ul>
                    </div>
                    <div className="right-side">
                        <h2>代理详情</h2>
                        <ul>
                            <li>接口1</li>
                            <li>接口1</li>
                            <li>接口1</li>
                            <li>接口1</li>
                            <li>接口1</li>
                            <li>接口1</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
