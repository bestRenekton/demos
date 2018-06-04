import React, { Component } from 'react';
import styles from './BgImg.scss'

const BgImg = ({ src, animate }) => {
    return (
        <img
            src={src}
            className={animate ? `${styles.img} ${styles.img_animate}` : `${styles.img}`}
            // style={{ opacity: opacity }}
        />
    )
}

export default BgImg;