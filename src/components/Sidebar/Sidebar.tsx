import React from "react";
import styles from "./side-bar.module.scss";
import sidebarItems from "./sidebarItems";
type Props = {};

function Sidebar({}: Props) {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Book Nexus</h2>
      <div className={styles.menu}>
        <h3>Menu</h3>
        <div className={styles.menuGroup}>
          {sidebarItems.slice(0, 5).map((item) => (
            <div key={item.title} className={styles.menuItem}>
              <div className={styles.iconContainer}>
                {React.createElement(item.icon)}
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
        <div className={styles.menuGroup}>
          {sidebarItems.slice(5).map((item) => (
            <div key={item.title} className={styles.menuItem}>
              <div className={styles.iconContainer}>
                {React.createElement(item.icon)}
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
