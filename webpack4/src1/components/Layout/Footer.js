import React from 'react';
import config from '../../utils/config';
import styles from './main.less';
const Foot = () => <div className={styles.footerW}>
    {config.footerText}
</div>
export default Foot;