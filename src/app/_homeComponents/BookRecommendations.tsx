import React from "react";
import styles from "../../styles/pages/home-page.module.scss";
import Link from "next/link";
import { getPopularBooks } from "@/util/API";
import { SimpleBook } from "@/util/Types";
import BookCard from "@/components/BookCard/BookCard";
type Props = {};

async function BookRecommendations({}: Props) {
  const books: SimpleBook[] = await getPopularBooks();
  return (
    <div className={styles.bookRecommendations}>
      <div className={styles.titleContainer}>
        <h2>Book Recommendations</h2>
        <Link href="/">View More &gt;</Link>
      </div>
      <div className={styles.bookContainer}>
        {books.map((book, index) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BookRecommendations;
