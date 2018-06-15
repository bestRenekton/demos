import React, { PropTypes } from 'react';
import {Form,Input,Modal} from 'antd';
const FormItem=Form.Item;
const formItemLayout={
	labelCol:{
		span:6,
	},
	wrapperCol:{
		span:14,
	}
}
const UserModal=({
	visible,
	item={},
	onOk,
	onCancel,
	form:{
    getFieldDecorator,
    validateFields,
    getFieldsValue,
	},
})=>{

function handelOk(){
	debugger
	validateFields((errors)=>{
		if(errors){
			return;
		}
		const data={...getFieldsValue(),Id:item.Id}
		onOk(data);
	})
}
function checkNumber(rule,value,callback){
	if(!value){
		callback(new Error('年龄未填写'));
	} 
	else if (!/^[\d]{1,2}$/.test(value)) {
      callback(new Error('年龄不合法'));
    } else {
      callback();
    }
}
const modalOpts={
	title:'添加用户',
	visible,
	onOk:handelOk,
	onCancel,
}

	return (
    <Modal {...modalOpts}>
          <Form horizontal>
              <FormItem 
                 label="姓名:"
                 hasFeedback
                 {...formItemLayout}
              >
              {getFieldDecorator('name',{
              		initialValue:item.name,
              		rules:[
              		{required:true,message:'名称未填写'},
              		],
              	})(
                  <Input type='text' />
              	)}
              </FormItem>
              <FormItem
                 label="年龄"
                 hasFeedback
                 {...formItemLayout}
              >
              {
              	getFieldDecorator('age',{
              		initialValue:item.age,
              		rules:[
                        {validator:checkNumber}
              		],
              	})(
                     <Input type="text" />
              	)
              }
              </FormItem>

              <FormItem
                 label="住址"
                 hasFeedback
                 {...formItemLayout}
              >
              {
              	getFieldDecorator('address',{
              		initialValue:item.address,
              		rules:[
                      {required:true,message:'不能为空'}
              		]
              	})(
                   <Input type="address"/>
              	)
              }
              </FormItem>
          </Form>
    </Modal>
		)
}
UserModal.propTypes={
	visible:PropTypes.any,
	onCancel:PropTypes.func
}
export default Form.create()(UserModal);