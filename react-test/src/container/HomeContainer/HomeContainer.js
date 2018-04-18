import React, { Component } from 'react';
import styles from './HomeContainer.scss'
import Lists from '../../component/Lists/Lists'

export default class About extends Component{
    render(){
        return(
            <div className="wrapper">
                <div className={styles.main}>
                    <Lists type="home"/>
                    <Lists type="archives"/>
                </div>
                <aside className={styles.aside}>
                    <p>aside</p>
                </aside>
            </div>
        )
    }
}



