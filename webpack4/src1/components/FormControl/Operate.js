import React, { PropTypes } from 'react';
import { Menu, Icon, Button, Input, div } from 'antd';
import { Link } from 'dva/router';
import styles from './Operate.less';
//
function Operate({ Preview, Save, IsSubmitting, FormTitle, dispatch }) {
    function SetTitle(e) {
        dispatch({
            type: 'formBuilder/setTitle',
            FormTitle: e.target.value,
        })
    }

    return (
        <div className={styles.operate}>
            <div className={styles.left}>
                <Input placeholder="表单名称" value={FormTitle} onChange={e => SetTitle(e)} prefix={<Icon type="bars" />} />
            </div>
            <div className={styles.right}>
                <Button onClick={ele => Preview()} className={styles.eye} icon="eye">预览</Button>
                <Button onClick={ele => Save()} type="primary" loading={IsSubmitting} icon="save">保存</Button>
            </div>
        </div>
    )
}
export default Operate;