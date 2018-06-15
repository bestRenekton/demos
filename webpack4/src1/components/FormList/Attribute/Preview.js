import { Modal, Button, Form } from 'antd';
import styles from './Control.less'
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
        debugger
        const {
            getFieldDecorator,
            validateFieldsAndScroll,
            getFieldsError,
            isFieldTouched,
            getFieldError
        } = this.props.form;
        return (<div>
            <Button onClick={e => this.props.Preview()}>预览</Button>
            <Modal
                title="Preview"
                visible={this.props.PreviewShow}
                onOk={this.handleOk}
                onCancel={this.props.handleCancel}
                >
                <Form onSubmit={this.props.Submit} className="login-form">

                    {this.props.PreviewList.map(ele =>
                        <div key={ele.Id} className={styles.ControlWrapper}>
                            <div className={styles.ctrTitle}>
                                <span>{ele.Text}</span>
                                {ele.Attribute.Required ? <span className={styles.ctrTitReq}>*</span> : ""}
                            </div>
                            {ele.Attribute.Desc? <div className={styles.ctrDesc}> <span>{ele.Attribute.Desc}</span></div>:""}
                            <div>
                                <FormItem>
                                    {getFieldDecorator(ele.Id, {
                                        rules: [{
                                            required: ele.Attribute.Required,
                                            message: '请输入' + ele.Text,
                                            pattern: ele.Attribute.FormartValue,
                                        }],
                                    })(
                                        ele.Component
                                        )}
                                </FormItem>
                            </div>

                        </div>)}
                </Form>
            </Modal>
        </div>)
    }

}

export default Form.create()(Preview)