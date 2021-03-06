import React, { Component, createRef } from "react";

import style from "./codeEditor.css";

const CodeEditor = class extends Component {

    constructor(props) {
        super(props);

        const { lineHeight, value } = this.props;

        this.state = {
            editorValue: value || "",
            lineHeight: lineHeight || 20
        };

        this.editor = createRef();
        this.gutter = createRef();
    }

    componentDidMount() {
        this.drawLineNumbers();
    }

    onEditorChange() {
        this.drawLineNumbers();
        this.setState({ editorValue: this.editor.current.value });

        const { onChange } = this.props;

        // Propagate update
        if (onChange) {
            onChange(this.editor.current.value);
        }
    }

    // Deal with the tab key: we don't want to loose focus on the
    // textarea but insert a tab character instead
    onEditorKeyDown(event) {
        const editor = this.editor.current;
        if (event.keyCode === 9) {
            event.preventDefault();
            const { selectionStart, selectionEnd, value } = editor;
            editor.value = `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`;
            editor.selectionStart = selectionStart + 1;
            editor.selectionEnd = selectionStart + 1;
        }
    }

    onEditorScroll() {
        this.adjustGutterPosition();
    }

    getLineCount() {
        const { editorValue } = this.state;
        return editorValue.split("\n").length;
    }

    drawLineNumbers() {
        const { lineHeight } = this.state;
        let lines = Math.floor(this.getLineCount());
        if (!lines) {
            lines = 1;
        }

        return [...Array(lines).keys()].map(index => (
            <div
                key={index}
                style={{ height: lineHeight }}
                className={style.vcenter}
            >
                <span>{index + 1}</span>
            </div>
        ));
    }

    adjustGutterPosition() {
        this.gutter.current.scrollTop = this.editor.current.scrollTop;
    }

    render() {
        const { editorValue, lineHeight } = this.state;
        return (
            <div className={style["editor-container"]}>
                <div className={style.numbers} ref={this.gutter}>
                    {this.drawLineNumbers()}
                </div>
                <div className={style.expand}>
                    <textarea
                        ref={this.editor}
                        value={editorValue}
                        style={{
                            lineHeight: `${lineHeight}px`,
                            whiteSpace: "pre",
                            overflowWrap: "normal",
                            overflowY: "scroll"
                        }}
                        className={style["editor-area"]}
                        onKeyDown={ev => this.onEditorKeyDown(ev)}
                        onChange={() => this.onEditorChange()}
                        onScroll={() => this.onEditorScroll()}
                    />
                </div>
            </div>
        );
    }

};

export { CodeEditor };
