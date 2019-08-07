import React from 'react';
import { connect } from 'react-redux'
import styles from  './AppHeader.module.scss'


const AppHeader: React.FC = (props) => {
  return (
    <div className={styles.header}>
      AppHeader
    </div>
  );
}
export default AppHeader
