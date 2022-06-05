/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import styles from './style.module.css';

const Tab = (props) => {
  const { headerOptions, onTabChange } = props;
  const [selectedTab, setSelectedTab] = useState(headerOptions[0]);

  const getHeader = () =>
    headerOptions.map((item) => {
      const klass =
        selectedTab.id === item.id
          ? `${styles.tabHeaderitem} ${styles.selectedTabHeader}`
          : styles.tabHeaderitem;
      return (
        <div key={item.id} className={klass} onClick={() => {setSelectedTab(item); onTabChange(item)}}>
          {item.label}
        </div>
      );
    });

  return (
      <div className={styles.tabHeaderContainer}>{getHeader()}</div>
  );
};

export default Tab;
