"use client";
import React from "react";
import styles from "../styles/pages/loading-page.module.scss";

type Props = {};

function Loading() {
  return (
    <div className={styles.loadingScreen}>
      <h1>Loading</h1>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loading;
