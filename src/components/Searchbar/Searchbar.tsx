"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./search-bar.module.scss";
import { useRouter } from "next/navigation";

type Props = {};

function Searchbar({}: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <form className={styles.searchbar} onSubmit={handleSubmit}>
      <div className={styles.categoryComboBox}>All categories</div>
      <FaSearch className={styles.searchbarIcon} size={20} />
      <input
        type="text"
        placeholder="Find a book you'd like..."
        className={styles.searchbarInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.searchbarButton} type="submit">
        Search
      </button>
    </form>
  );
}

export default Searchbar;
