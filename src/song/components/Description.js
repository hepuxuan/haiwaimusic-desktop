import React from 'react';
import styles from '../scss/description.scss';

export default function ({ song, singer }) {
  return (
    <div>
      <h3 className={styles.song}>{song}</h3>
      <div className={styles.singerName}>{singer}</div>
    </div>
  );
}
