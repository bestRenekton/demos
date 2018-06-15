import { Modal, Button, Form, Input } from 'antd';
import styles from './Preview.less'
import com from '../../../utils/com';
import FormRender from '../FormRender/FormRender';
const FormItem = Form.Item;
class Preview extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    constructor(props) {
        super(props);
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            this.props.Ok(values)
        })
    }
    render() {
        const { getFieldDecorator, validateFieldsAndScroll, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
        const { FormBody, RootContainer, ControlList, setValue } = this.props;
        return (<div>
            <Modal title="预览" visible={this.props.PreviewShow} onOk={this.handleOk} onCancel={this.props.handleCancel}>
                <Form className="login-form">
                    <FormRender setValue={setValue} FormBody={FormBody} RootContainer={RootContainer} getFieldDecorator={getFieldDecorator} ControlList={ControlList} />
                </Form>
            </Modal>
        </div>)
    }
}
export default Form.create()(Preview)

 // {this.props.PreviewList.map(ele =>
                    //     <div key={ele.Id} className={styles.ControlWrapper}>
                    //         <div>
                    //             <FormItem style={{ marginBottom: "0px", }}>
                    //                 {getFieldDecorator(ele.Id, {
                    //                     rules: [{
                    //                         required: ele.Data.Required,
                    //                         message: ele.Data.Text + "必填",
                    //                     }],
                    //                 })(
                    //                     <div>
                    //                         <ele.Preview mode='middle' isPreview={true} {...ele.Data} index={ele.index} />
                    //                     </div>
                    //                     )}
                    //             </FormItem>
                    //         </div>
                    //     </div>)}