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
    FormJson.Type = "Annex";
    FormJson.TypeName = "附件";
    FormJson.Text = "附件";//标题
    FormJson.Multiple = false;//多
    FormJson.FileList = [];
    FormJson.PreviewVisible = false;
    FormJson.previewImage = "";
    return FormJson;
}
@CommomCtrol()
class AnnexMiddel extends React.Component {
    Change(info) {
        let file = info.file;
        switch (file.status) {
            case "done":
                break;
            case "removed":
                break;
        }
        this.props.setValue(this.props.index, JSON.stringify(info.fileList));
    }

    render() {
        var { ...data } = this.props;
        return (
            <div>
                <Upload defaultFileList={this.props.itemValue ? JSON.parse(this.props.itemValue) : []} action={config.fileServer} onChange={ele => this.Change(ele)} multiple={data.Multiple}>
                    <Button><Icon type="upload" style={{ color: "#108ee9" }} /> 选择文件</Button>
                </Upload>
            </div>)
    }
}
class Annex extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { mode, ...data } = this.props;
        switch (mode) {
            case 'middle':
                return <AnnexMiddel {...this.props} />;
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
    key: "Annex",
    name: "附件",
    ico: 'upload',
    Component: connect()(Annex),
    Data: initData

};