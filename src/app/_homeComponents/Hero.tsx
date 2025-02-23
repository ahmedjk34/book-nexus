import React from "react";
import styles from "../../styles/pages/home-page.module.scss";
import { Searchbar } from "@/components";
import BookRecommendations from "./BookRecommendations";
type Props = {};

function Hero({}: Props) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroOverlay}>
        <div></div>
        <div></div>
      </div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Discover</h1>
        <Searchbar />
        <BookRecommendations />
      </div>
    </div>
  );
}

export default Hero;
