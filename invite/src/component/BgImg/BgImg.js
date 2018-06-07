import React from 'react';
import styles from './BgImg.scss'

const BgImg = ({ src, animate }) => {
    return (
        <img
            src={src}
            alt={"背景图"}
            className={animate ? `${styles.img} ${styles.img_animate}` : `${styles.img}`}
            // style={{ opacity: opacity }}
        />
    )
}

export default BgImg;

