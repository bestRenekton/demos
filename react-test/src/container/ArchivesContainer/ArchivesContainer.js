import React, { Component } from 'react';
import styles from './ArchivesContainer.scss'
import Lists from '../../component/Lists/Lists'

export default class Archives extends Component{
    render(){
        return(
            <div className="wrapper">
                <div className={styles.main}>
                    <Lists type="archives"/>
                </div>
                <aside className={styles.aside}>
                    <p>aside</p>
                </aside>
            </div>
        )
    }
}



