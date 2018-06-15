import styles from './Attribute.less'
import { Modal, Button, Form, Input } from 'antd';
import React from 'react';
const FormItem = Form.Item;
function CommomCtrol() {
    return function HocFactory(WrappedComponent) {
        return class extends React.Component {
            render() {
                const { index, getFieldDecorator, isPreview, ...data } = this.props;
                return (<div key={data.Id} className={styles.ControlWrapper}>
                    <div className={styles.ctrTitle}> <span>{data.Text}</span>
                        {data.Required ? <span className={styles.ctrTitReq}>*</span> : ""}</div>
                    {data.Desc ? <div className={styles.ctrDesc}> <span>{data.Desc}</span></div> : ""}
                    <div className={styles.ctrComponent}>
                     {
                         
                        !isPreview?<WrappedComponent {...this.props} />
                        :
                        <FormItem style={{ marginBottom: "0px", }}>
                        {getFieldDecorator(index, {
                            rules: [{
                                required: data.Required,
                                message: data.Text + "必填",
                            }],
                        })(
                            <div>
                                <WrappedComponent {...this.props} />
                            </div>
                            )}
                    </FormItem>
                     }
                        
                    </div>
                    {!isPreview ?
                        <div className={styles.Mask}>
                        </div> : ""}
                </div>)
            }
        }
    }
}
export default CommomCtrol;