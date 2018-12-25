import React, { Component } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import './index.less';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editorState: null
        }
    }

    async componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        // const htmlContent = await fetchEditorContent()
        const htmlContent = '';
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
        this.setState({
          editorState: BraftEditor.createEditorState(htmlContent)
        })
      }
    
    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        console.log(htmlContent)
        // const result = await saveEditorContent(htmlContent)
    }
    
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    render() {
        const { editorState } = this.state;
        return (
            <div className="page-home text-content">
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                />
            </div>
        );
    }
}
