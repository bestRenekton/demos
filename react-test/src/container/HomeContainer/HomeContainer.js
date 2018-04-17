import React, { Component } from 'react';
import styles from './HomeContainer.scss'


export default class About extends Component{
    render(){
        return(
            <div className="wrapper">
                <div className={styles.main}>
                    <p>home</p>
                </div>
                <aside className={styles.aside}>
                    <p>aside</p>
                </aside>
            </div>
        )
    }
}



