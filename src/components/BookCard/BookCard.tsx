import React from "react";
import styles from "./book-card.module.scss";
import { SimpleBook } from "@/util/Types";
import Image from "next/image";

type Props = {
  book: SimpleBook;
};

//! Figure out, do you want to use L or M size for the book cover
function BookCard({ book }: Props) {
  return (
    <div className={styles.bookCard}>
      <Image
        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
        alt={book.title}
        className={styles.bookCover}
        fill
        priority
      />
      <div className={styles.bookOverlay}>
        <h3>{book.title}</h3>
        <h4>
          Written by:{" "}
          {book.author_name && book.author_name.slice(0, 2).join(", ")}
        </h4>
      </div>
    </div>
  );
}

export default BookCard;
