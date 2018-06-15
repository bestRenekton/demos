import {Input} from 'antd';
import styles from './Control.less'


function Control({
    ControlList,
    ControlClick
}){

const cont=ControlList.map(ele=><div key={ele.Id} className={styles.ControlWrapper} onClick={e=>ControlClick(ele)}>
       <div className={styles.ctrTitle}> <span>{ele.Text}</span></div>
         {ele.Attribute.Desc? <div className={styles.ctrDesc}> <span>{ele.Attribute.Desc}</span></div>:""}
       <div className={styles.ctrComponent}> {ele.Component}</div>
</div>)
return (<div>
    {cont}
</div>)
}

export default Control;