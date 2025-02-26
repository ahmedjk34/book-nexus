"use client";
import React from "react";
import Link from "next/link";
import styles from "./side-bar.module.scss";
import sidebarItems from "./sidebarItems";
import { usePathname } from "next/navigation";
type Props = {};

function Sidebar({}: Props) {
  const path = usePathname(); // Get the current path using usePathname()
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Book Nexus</h2>
      <div className={styles.menu}>
        <h3>Menu</h3>
        <div className={styles.menuGroup}>
          {sidebarItems.slice(0, 7).map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className={`${styles.menuItem} ${
                path === item.link ? styles.active : ""
              }`}
            >
              <div className={styles.iconContainer}>
                {React.createElement(item.icon)}
              </div>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
        <div className={styles.menuGroup}>
          {sidebarItems.slice(7).map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className={`${styles.menuItem} ${
                path === item.link ? styles.active : ""
              }`}
            >
              <div className={styles.iconContainer}>
                {React.createElement(item.icon)}
              </div>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
