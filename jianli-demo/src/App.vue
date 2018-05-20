<template>
  <div id="app">
    <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
    <ResumeEditor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml"></ResumeEditor>
  </div>
</template>

<script>
  import StyleEditor from './components/StyleEditor'
  import ResumeEditor from './components/ResumeEditor'
  import './assets/reset.css'

  export default {
    name: 'app',
    components: {
      StyleEditor,
      ResumeEditor
    },
    data() {
      return {
        interval: 40,
        currentStyle: '',
        enableHtml: false,
        fullStyle: [
          `/* 本项目由vue框架制造！
*
* 大家好,我是杨岳涛，今天想用vue来写一个动态简历！
*
* 这张页面好无聊啊！我们加一点小东西如何？
* 
*/

/*首先,先来添加一下全局的动画效果！*/
* {
  transition: all .8s;
}
/* 白色背景太单调了，我们来点背景吧 */
html {
  /*    
  3，             
  2，             
  1 */
  background: rgb(0,43,54);
  color: rgb(222,222,222); 
}

/* 文字离边框太近了 */
.styleEditor {
  background: rgb(48, 48, 48);
  border: 1px solid #ccc;
  padding: .5em;  
  margin: .5em;
  overflow: auto;
  width: 40%; 
  height: 90vh;
}

/* 看着好像缺点什么，对了，代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* 加点 3D 效果呗 */
html{
  perspective: 1000px;
}
.styleEditor {
  transform:rotateY(-10deg) translate3d(120%,0,-100px);
}

/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
  position: fixed; left: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 45%; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* 好了，我开始写简历了 */


`,
          `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
`
          ,
          `
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`],
        currentMarkdown: '',
        fullMarkdown: `杨岳涛
----

前端工程师，现在在 [中建科联](http://www.520coc.cn/)任职。

技能
----

* 熟练使用vue,webpack,es6,node,Bootstrap，jq、easyui ,echarts、sass、mongoDB等
* 具有丰富的移动端网页开发经验，熟悉hbuilder，小程序等开发
* 桌面应用nw.js,electron的开发经验
* 有react,angular2，svg、canvas使用经验

工作经历
----

1. 四川方法数码科技有限公司2016.03 — 2017.02
2. 成都中建科联科技有限公司2017.03 — 至今

项目经验
----

* [个人博客 vue+node+mongodb](http://39.108.70.164/taoland/#/)
* [建筑行业通PC](http://www.520coc.cn/)
* [建筑行业通移动端](http://www.cdzjkl.com/share)
* 小程序---小程序搜索‘建筑行业通’
* [二十来个PC和WAP外包项目](http://site.foway.com/yangyuetao/my/index.html)


联系我
----

* 电话：18608031761


> 行路有良友，便是捷径。带上我吧，一起去看更大的世界！

`
      }
    },
    created() {
      this.makeResume()
    },

    methods: {
      makeResume: async function () {
        await this.progressivelyShowStyle(0)
        await this.progressivelyShowResume()
        await this.progressivelyShowStyle(1)
        await this.showHtml()
        await this.progressivelyShowStyle(2)
      },
      showHtml: function () {
        return new Promise((resolve, reject) => {
          this.enableHtml = true
          resolve()
        })
      },
      progressivelyShowStyle(n) {
        return new Promise((resolve, reject) => {
          let interval = this.interval
          let showStyle = (async function () {
            let style = this.fullStyle[n]
            if (!style) { return }
            // 计算前 n 个 style 的字符总数
            let length = this.fullStyle.filter((_, index) => index <= n).map((item) => item.length).reduce((p, c) => p + c, 0)
            let prefixLength = length - style.length
            if (this.currentStyle.length < length) {
              let l = this.currentStyle.length - prefixLength
              let char = style.substring(l, l + 1) || ' '
              this.currentStyle += char
              if (style.substring(l - 1, l) === '\n' && this.$refs.styleEditor) {
                this.$nextTick(() => {
                  this.$refs.styleEditor.goBottom()
                })
              }
              setTimeout(showStyle, interval)
            } else {
              resolve()
            }
          }).bind(this)
          showStyle()
        })
      },
      progressivelyShowResume() {
        return new Promise((resolve, reject) => {
          let length = this.fullMarkdown.length
          let interval = this.interval
          let showResume = () => {
            if (this.currentMarkdown.length < length) {
              this.currentMarkdown = this.fullMarkdown.substring(0, this.currentMarkdown.length + 1)
              let lastChar = this.currentMarkdown[this.currentMarkdown.length - 1]
              let prevChar = this.currentMarkdown[this.currentMarkdown.length - 2]
              if (prevChar === '\n' && this.$refs.resumeEditor) {
                this.$nextTick(() => this.$refs.resumeEditor.goBottom())
              }
              setTimeout(showResume, interval)
            } else {
              resolve()
            }
          }
          showResume()
        })
      }
    }
  }

</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    min-height: 100vh;
  }
  /* *{
    box-sizing: border-box;
  } */
</style>
