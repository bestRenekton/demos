import React from 'react';
import styles from './Expression.less';
import pic from './Expression.png'
class Expression extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={styles.box}>
                <p className={styles.test}>this is a plugin! </p>
                {/* <img src={pic} alt="" /> */}
            </div>
        )
    }
}


//打包时使用
// module.exports = {
//     Test,
//     test2
// };

//预览时使用
export default Expression