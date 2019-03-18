import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;


const commonFooter = React.memo(() => {
    return (
        <Footer tagName="footer">Footer</Footer>
    )
})

export default commonFooter