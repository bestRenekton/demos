'use strict';

(function () {
    class Avatar extends HTMLElement {
        constructor() {
            super();
            this.name = this.getAttribute('name');
            this.year = this.getAttribute('year');
            this.alertName = this.getAttribute('alertName');

            const wrapper = document.createElement('div');
            wrapper.innerHTML = `
                <style>
                    .avatar {
                        border:1px solid #eee;
                        width:100px;
                        padding:10px;
                    }
                    .name,.year{
                        margin:0 0 5px;
                    }
                </style>
                <div class="avatar">
                    <p class="name" id="name">${this.name}</p>
                    <p class="year">${this.year}</p>
                </div>
            `;

            const shadow = this.attachShadow({ mode: 'open' });
            shadow.appendChild(wrapper);
            this.nameEl = this.shadowRoot.getElementById('name');
        }


        
        connectedCallback() {//元素首次被插入文档DOM时触发
            this._bindEvent();
        }
        //其它生命周期
        //disconnectedCallback-----元素从文档DOM中删除时触发
        //adoptedCallback-----元素被移动到新的文档时触发
        //attributeChangedCallback-----元素增加、删除、修改自身属性时触发



        _bindEvent() {
            this.nameEl.addEventListener('click', () => {
                eval(this.alertName + '(this.name )');
            }, false);
        }

    }

    customElements.define('my-avatar', Avatar);//custom element 的名称中必须要有短横线
})();