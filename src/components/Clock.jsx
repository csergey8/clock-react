import React from 'react';
import styles from './Clock.module.scss';

const Clock = ({ time }) => {
    return (
        <div className={styles.clock}>
           {time}
        </div>
    )
}

export default Clock;
