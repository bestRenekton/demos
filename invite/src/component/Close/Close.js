import React from 'react';
import close from './img/close.png'
import styles from './Close.scss'

const Close = ({ history }) => {
    let back = () => {
        history.go(-1);
    }

    return (
        <img src={close} className={styles.close} onClick={() => { back() }} alt="关闭" />
    )
}

export default Close;