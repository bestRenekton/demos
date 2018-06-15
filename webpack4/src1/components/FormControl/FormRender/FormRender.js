import React, { PropTypes } from 'react';
import com from '../../../utils/com';

function FormRender({ FormBody, RootContainer, getFieldDecorator, ControlList, setValue }) {
    const RootList = FormBody.filter(a => a.container == RootContainer);
    const OtherList = FormBody.filter(a => a.container != RootContainer);
    return (
        <div>
            {
                RootList.map((C) => {
                    let pj = {
                        mode: 'middle',
                        container: C.container,
                        key: C.index,
                        index: C.index,
                        getFieldDecorator: getFieldDecorator,
                        isPreview: C.isPreview,
                        setValue: setValue,
                        itemValue: C.itemValue,
                        ...C.Data
                    };
                    if (C.Data.IsContainer)
                        pj = {
                            ...pj,
                            ControlList: ControlList,
                            panelBody: com.getCList(C.Id, OtherList),
                            panelChild: com.GetChildCList(C, OtherList),
                            //CurrentIndex: this.props.CurrentIndex
                        };
                    if (C.WrappedComponent)
                        return <C.WrappedComponent {...pj} />
                    else
                        return <C.Component {...pj} />
                })
            }
        </div>
    )
}
export default FormRender;