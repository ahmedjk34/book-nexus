import React from "react";
import styles from "./book-card.module.scss";
import { DetailedBook, SimpleBook } from "@/util/Types";
import Image from "next/image";
import { isDetailedBook, processBookAuthors } from "@/util/util";
import Link from "next/link";

type Props = {
  book: SimpleBook | DetailedBook;
};

function BookCard({ book }: Props) {
  console.log(book.key);
  return (
    <Link className={styles.bookCard} href={`/book/${book.key.split("/")[2]}`}>
      <Image
        src={`https://covers.openlibrary.org/b/id/${
          isDetailedBook(book) ? book.cover_id : book?.cover_i
        }-L.jpg`}
        alt={book.title}
        className={styles.bookCover}
        sizes="285px"
        fill
        priority
      />
      <div className={styles.noBookCoverOverlay}>No Book Cover Found</div>
      <div className={styles.bookOverlay}>
        <h3>{book.title}</h3>
        <h4>
          Written by:{" "}
          {isDetailedBook(book)
            ? processBookAuthors(book.authors)
            : processBookAuthors(book.author_name)}
        </h4>
      </div>
    </Link>
  );
}

export default BookCard;
