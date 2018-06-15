import { Tabs, Input, Button, Switch, Select } from 'antd';
import styles from './Attribute.less'
const TabPane = Tabs.TabPane;

//控件标题
function AttributeTitle(CurrentControl, TitleInputChange) {
    return (<div className={styles.attrItem}>
        <div className={styles.attrTitle}>
            <span className={styles.attrTitleName}>标题</span>
            <Button type="primary">{CurrentControl.TypeName}</Button>
        </div>
        <div >
            <Input value={CurrentControl.Text} onChange={ele => TitleInputChange(ele)} />
        </div>
    </div>)

}
//控件描述
function AttributeDesc(CurrentControl, DescInputChange){
 return (<div className={styles.attrItem}>
        <div className={styles.attrTitle}>
            <span className={styles.attrTitleName}>描述信息</span>
           
        </div>
        <div>
            <Input.TextArea value={CurrentControl.Attribute.Desc} onChange={ele => DescInputChange(ele)} />
        </div>
    </div>)
}
//文本格式
function AttributeFormat(CurrentControl,SetFormart) {
if(CurrentControl.Type!="SingleText")return "";
    return (<div className={styles.attrItem}>
        <div className={styles.attrTitle}>
            <span className={styles.attrTitleName}>格式</span>

        </div>
        <div>
            <Select defaultValue={CurrentControl.Attribute.FormartText} style={{ width: "100%" }}  onChange={e=>SetFormart(e)}>
                <Option value="none">无</Option>
                <Option value="Mobile">手机号码</Option>
                <Option value="IdCard">身份证号码</Option>
                <Option value="PostalCode">邮政编码</Option>
                <Option value="Email">邮箱</Option>
            </Select>
        </div>
    </div>)
}
//控件校验
function AttributeCheck(CurrentControl, SetSwitch) {
    return (<div className={styles.attrItem}>
        <div className={styles.attrTitle}>
            <span className={styles.attrTitleName}>校验</span>

        </div>
        <div>
            <Switch checked={CurrentControl.Attribute.Required} onChange={e => SetSwitch("Required", e)} />&nbsp;必填
        </div>
    </div>)
}
//操作权限
function AttributePower(CurrentControl, SetSwitch) {
    return (<div className={styles.attrItem}>
        <div className={styles.attrTitle}>
            <span className={styles.attrTitleName}>操作权限</span>

        </div>
        <div>
            <Switch checked={CurrentControl.Attribute.Visible} onChange={e => SetSwitch("Visible", e)} />&nbsp;可见
           <br />
            <div style={{ height: "5px" }}></div>
            <Switch checked={CurrentControl.Attribute.Editable} onChange={e => SetSwitch("Editable", e)} />&nbsp;可编辑
        </div>
    </div>)
}

function Attribute({
    CurrentControl,
    TitleInputChange,
    DescInputChange,
    SetSwitch,
    SetFormart

}) {
    debugger
    let ControlAttr = <div className={styles.ControllAttrWrapper}>
        {AttributeTitle(CurrentControl, TitleInputChange)}
        {AttributeDesc(CurrentControl,DescInputChange)}
        {AttributeFormat(CurrentControl,SetFormart)}
        {AttributeCheck(CurrentControl, SetSwitch)}
        {AttributePower(CurrentControl, SetSwitch)}
    </div>


    return (<div className={styles.attributeWrapper}>
        <Tabs defaultActiveKey="1">
            <TabPane tab="控件属性" key="1">
                {ControlAttr}
            </TabPane>
            <TabPane tab="表单属性" key="2">
                2

    </TabPane>

        </Tabs>
    </div>)
}

export default Attribute;