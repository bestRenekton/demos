
import React, { PropTypes } from 'react'
import { Breadcrumb, Icon } from 'antd'
import styles from './main.less'


function Bread({ bread, location }) {
  var key = location.pathname.replace('/', '');
  var parent = [];
  //debugger
  for (let i = 0; i < bread.length; i++) {

    var b = bread[i];
    var bParent = b.parent;
    if (b.key === key) {

      for (let j = bParent.length - 1; j >= 0; j--) {
        parent.push(bParent[j]);
      }
      parent.push(b)
    }
  }
  const breads = parent.map(ele => <Breadcrumb.Item key={ele.key} >
    <Icon type={ele.icon} />
    <span>{ele.name}</span>
  </Breadcrumb.Item>)
  console.log("面包屑被渲染");
  return (<div className={styles.bread}>
    <Breadcrumb>
      <Breadcrumb.Item href="/"><Icon type="home" />
        <span>主页</span>
      </Breadcrumb.Item>
      {breads}
    </Breadcrumb>

  </div>)
}


export default Bread;