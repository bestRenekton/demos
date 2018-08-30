import React from 'react';
import styles from './Test.less';
import pic from './Test.png'
class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.box}>
                <p className={styles.test}>this is a plugin! </p>
                <img src={pic} alt="" />
            </div>
        )
    }
}
function test2() {
    console.log('plugin test2!');
}



//打包时使用
module.exports = {
    Test,
    test2
};

//预览时使用
// export default Test