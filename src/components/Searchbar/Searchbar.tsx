"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./search-bar.module.scss";

type Props = {};

function Searchbar({}: Props) {
  return (
    <form className={styles.searchbar}>
      <div className={styles.categoryComboBox}>All categories</div>
      <FaSearch className={styles.searchbarIcon} size={20} />
      <input
        type="text"
        placeholder="Find a book you'd like..."
        className={styles.searchbarInput}
      />
      <button className={styles.searchbarButton} type="submit">
        Search
      </button>
    </form>
  );
}

export default Searchbar;
