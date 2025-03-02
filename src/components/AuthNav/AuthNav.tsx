import React from "react";
import styles from "./auth-nav.module.scss";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";

type Props = {
  isAuthenticated: boolean;
};

function AuthNav({ isAuthenticated }: Props) {
  return (
    <div className={styles.authNav}>
      {isAuthenticated ? (
        <div className={styles.authenticatedContainer}>
          <Image src="/user.jpg" alt="user" width={35} height={35} />
          <h4 className={styles.usernameContainer}>
            Ahmed Gharib <RiArrowDownSLine />
          </h4>
          <FaBell size={18} className={styles.bellIcon} />
        </div>
      ) : (
        <div className={styles.notAuthenticatedContainer}>
          <button className={styles.authButton}>Login</button>
          <button className={styles.authButton}>Signup</button>
        </div>
      )}
    </div>
  );
}

export default AuthNav;
