import React, { Component } from 'react';
import axios from 'axios'
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import df from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

import styles from './DetailArticle.scss';
import { webUrl } from "../../public/js/public"


export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
            content:''
        }
    }
    componentWillMount(e) {
        let id = this.props.match.params.id;

        axios.get(webUrl + 'api/articleDetail/' + id)
            .then(
                (res) => {
                    this.setState({
                        article: res.data,
                        content: res.data.content
                    })
                    this.smde.value(this.state.content);
                    
                    console.log(this.smde.isPreviewActive())
                    // this.title = article.title;
                    // this.date = article.date;
                    // this.content = article.content;
                    // this.gist = article.gist;
                    // this.category = article.category;
                }
            ).catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.smde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autofocus: true,
            autosave: true,
            previewRender: function (plainText) {
                return marked(plainText, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        return highlight.highlightAuto(code).value;
                    }
                });
            },
        })
    }
    handleChange(event) {
        this.setState({content: event.target.value});
      }
    render() {
        let content = this.state.content;
        console.log()

        return (
            <div>
                <textarea id="editor"
                 onChange={this.handleChange}>
                 </textarea>
            </div>
        )
    }
}