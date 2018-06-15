import React from 'react';
import { connect } from 'dva';
import { Button, Upload, Icon, message, Modal } from 'antd';
import com from '../../utils/com'
import config from '../../utils/config'
import CommomCtrol from './CommomCtrol.js'
import Title from '../../components/FormControl/Attribute/Title.js'
import Desc from '../../components/FormControl/Attribute/Desc.js'
import VerificationPic from '../../components/FormControl/Attribute/VerificationPic.js'
import OperationPower from '../../components/FormControl/Attribute/OperationPower.js'
import Formart from '../../components/FormControl/Attribute/Formart.js'
function initData() {
    let FormJson = new com.FormJson()
    FormJson.Type = "Picture";
    FormJson.TypeName = "图片";
    FormJson.Text = "图片";//标题
    FormJson.Multiple = false;//多张
    FormJson.PreviewVisible = false;
    FormJson.previewImage = "";
    return FormJson;
}
@CommomCtrol()
class PictureMiddel extends React.Component {
    Change(info) {
        let file = info.file;
        /*switch (file.status) {
            case "done":
            case "removed":
            debugger
                this.props.setValue(this.props.index, JSON.stringify(info.fileList));
                break;
        }*/
        if (file.status == 'done') {
            debugger
            this.props.setValue(this.props.index, JSON.stringify(info.fileList));
        }
    }
    beforeUpload(file) {
        const isJPG = file.type.indexOf('image') > -1;
        if (!isJPG) {
            message.error('只能上传图片!');
        }
        return isJPG;
    }
    Preview(file) {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { PreviewVisible: true, PreviewImage: file.url || file.thumbUrl, }
        });
    }
    PreviewCancel() {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { PreviewVisible: false }
        });
    }
    render() {
        var { ...data } = this.props;
        return (
            <div>
                <Upload defaultFileList={this.props.itemValue ? JSON.parse(this.props.itemValue) : []} listType="picture" onPreview={file => this.Preview(file)} beforeUpload={file => this.beforeUpload(file)} accept="image/png,image/gif,image/jpeg,image/tiff,image/x-ms-bmp,image/x-photo-cd,image/x-portablebitmap,image/x-portable-greymap,image/x-portable-pixmap,image/x-rgb" onChange={ele => this.Change(ele)} action={config.fileServer} multiple={data.Multiple}>
                    <Button>
                        <Icon type="picture" style={{ color: "#108ee9" }} /> 选择图片
                </Button>
                </Upload>
                <Modal visible={data.PreviewVisible} footer={null} onCancel={e => this.PreviewCancel()}>
                    <img alt="example" style={{ width: '100%' }} src={data.PreviewImage} />
                </Modal>
            </div>)
    }
}
class Picture extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { mode, ...data } = this.props;
        switch (mode) {
            case 'middle':
                return <PictureMiddel {...this.props} />;
            case 'right':
                return (

                    <div>
                        <Title {...this.props} />
                        <Desc {...this.props} />
                        <VerificationPic {...this.props} />
                        <OperationPower {...this.props} />

                    </div>)
            default:
                return <div>控件加载失败</div>;
        }
    }
}
export default {
    key: "Picture",
    name: "图片",
    ico: 'picture',
    Component: connect()(Picture),
    Data: initData
};