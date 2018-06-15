import React, { PropTypes } from 'react'
import { Form, Input, Button, Select } from 'antd';
import styles from './Search.less';

const UserSearch = ({
    field,
    keyword,
    OnSearch,
    OnAdd,
    form: {
        getFieldDecorator,
		validateFields,
		getFieldsValue
    }
}) => {
    function handleSubmit(e) {
            e.preventDefault();
    	debugger
        
    	validateFields((errors)=>{
            debugger
    		if(!!errors){
    			return;
    		}
    		OnSearch(getFieldsValue())
    	})
     }
    return (
        <div className={styles.normal}>
             <div className={styles.search}>
                <Form layout="inline" onSubmit={handleSubmit}>
                    <Form.Item>
                       {
                            getFieldDecorator('field', {
                                initialValue: field || 'name'
                           })
                           (
                               <Select>
                                 <Select.Option value='name'>姓名</Select.Option>
                                 <Select.Option value='address'>地址</Select.Option>
                               </Select>
                           )
                       }
                    </Form.Item>
                    <Form.Item>
                       {
                           getFieldDecorator('keyword',{
                               initialValue:keyword||'',
                               rules:[{required:true,message:"请填写关键字！"}]
                           })
                           (
                                <Input type="text" />
                           )
                       }
                    </Form.Item>
                    <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">搜索</Button>
                </Form>

             </div>   
              <div className>
                <Button type="primary " ghost={true} onClick={OnAdd}>添加</Button>
               
              </div>
       </div>
       )
}

UserSearch.propTypes = {
    onSearch: PropTypes.func,
    onAdd: PropTypes.func,
    onTest: PropTypes.func,
    form: PropTypes.object.isRequired,

}
export default Form.create()(UserSearch);