import { Row, Col, List, Collapse } from 'antd';
import { formulaList, formulaKeywords } from '../../Hint/Formulas';
import { UnControlled as CodeEditor } from 'react-codemirror2';
import * as cdm from 'codemirror';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('../../../components/Hint/Formula.js')
require('codemirror/addon/hint/show-hint.css');
require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/show-hint.js');
require('../../../components/Hint/Formula-hint.js')
import styles from './FormulaEditor.less';

class FormulaEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            desc: 'desc'
        };
    }
    formatFormula(editor) {
        let curFIL = this.props.curFIL;
        if (editor == undefined)
            editor = this.state.editor;
        editor.getAllMarks().forEach(function (e, i) {
            e.clear();
        });
        let marks = [];
        editor.eachLine(function (line) {
            let lineNum = editor.getLineNumber(line);
            let text = line.text;
            if (text.indexOf('\u2800') > -1) {
                let ary = text.split('\u2800');
                for (let i = 0, j = ary.length; i < j; i++) {
                    if (i % 2 == 1) {
                        let bg = 0;
                        for (let k = 0; k < i; k++) {
                            bg += ary[k].length + 1;
                        }
                        let ed = bg + ary[i].length + 1;
                        marks.push({ begin: { line: lineNum, ch: bg - 1 }, end: { line: lineNum, ch: ed }, id: ary[i] });
                    }
                }
            }
        });
        marks.forEach(function (e, i) {
            let sp = document.createElement('span');
            debugger
            sp.innerText = curFIL.filter(a => a.id == e.id)[0].title;
            sp.className = 'CodeMirror-FEle';
            editor.markText(e.begin, e.end, { replacedWith: sp });
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        let v = !(this.props.value === nextProps.value &&
            JSON.stringify(this.props.curFIL) == JSON.stringify(nextProps.curFIL) &&
            this.props.index == nextProps.index && this.state.desc == nextState.desc);
        if (v) {
            this.state.editor.preCursor = this.state.editor.getCursor()
        }
        return v;
        //return true;
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.index != prevProps.index && this.props.value != prevProps.value) {
            this.state.editor.setValue(this.props.value);
            this.state.editor.preCursor = undefined;
        }
        else if (this.state.editor.preCursor) {
            this.state.editor.setCursor(this.state.editor.preCursor);
        }
        this.formatFormula();
    }
    addFormulaElement(e) {
        let editor = this.state.editor;
        let doc = editor.getDoc();
        let cursor = doc.getCursor();
        let mark = '\u2800' + e.id + '\u2800';
        doc.replaceRange(mark, cursor);
        let sp = document.createElement('span');
        sp.innerText = e.title;
        sp.className = 'CodeMirror-FEle';
        let options = this.props.options
        if (options.relations == undefined)
            options.relations = [];
        if (options.relations.indexOf(e.id) == -1) {
            let r = options.relations;
            r.push(e.id);
            this.props.dispatch({
                type: 'formBuilder/setTempDataLinkerOptions',
                options: options
            });
        }
        this.formatFormula();
        editor.focus();
    }
    addFormulaFunction(e) {
        let editor = this.state.editor;
        this.addBrackets(editor, e.func);
        editor.focus();
    }
    addBrackets(editor, func) {
        let doc = editor.getDoc();
        let cursor = doc.getCursor();
        doc.replaceRange((func || '') + '()', cursor);
        cursor = doc.getCursor();
        cursor.ch--;
        doc.setCursor(cursor);
    }
    showDesc(e) {
        this.setState({
            desc: e
        });
        this.state.editor.focus();
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span="24">
                        <CodeEditor options={{
                            mode: 'formula',
                            theme: 'material',
                            lineNumbers: false,
                            lineWrapping: true,
                            autofocus: true
                        }}
                            value={this.state.value}
                            //value={this.props.value}
                            editorDidMount={((editor, next) => {
                                this.setState({
                                    editor: editor
                                });
                                this.props.init(editor, next);
                                this.formatFormula(editor);
                            }).bind(this)}
                            onChange={(editor, data, value) => {
                                if (formulaKeywords.indexOf(data.text[0]) > -1) {
                                    value += "()";
                                    this.addBrackets(editor);
                                }
                                this.setState({ value });
                                this.formatFormula();
                                editor.showHint({ completeSingle: false });
                            }}
                        />
                    </Col>
                </Row>
                <Row className={styles.row}>
                    <Col span="8" className={styles.col}>
                        <List
                            header='当前表单字段'
                            size='small'
                            bordered={true}
                            itemLayout="horizontal"
                            dataSource={this.props.curFIL}
                            renderItem={item => (
                                <List.Item className={styles.relation} key={item.id} value={item.id} onClick={e => { this.addFormulaElement.call(this, item) }}>
                                    {item.title}
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span="6" className={styles.col}>
                        <Collapse>
                            {formulaList.map((item) => {
                                let t = this;
                                return <Collapse.Panel key={item.groupName} header={item.groupName}>
                                    {
                                        item.groupList.map(function (g) {
                                            return <p key={g.func} onMouseEnter={e => { t.showDesc.call(t, g.desc) }} onClick={e => { t.addFormulaFunction.call(t, g) }}>{g.func}</p>
                                        })
                                    }
                                </Collapse.Panel>
                            })}
                        </Collapse>
                    </Col>
                    <Col span="10" className={styles.col}>
                        <p> {this.state.desc}</p>
                    </Col>
                </Row>
            </div>)
    }
}
export default FormulaEditor;