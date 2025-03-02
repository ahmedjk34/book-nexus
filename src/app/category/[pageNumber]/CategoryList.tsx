import React from "react";
import { getBooksBySubject } from "@/util/API";
import { convertFromSnakeToCapitalCase } from "@/util/util";
import styles from "../../../styles/pages/category-page.module.scss";
import { DetailedBook } from "@/util/Types";
import { BookCard } from "@/components";
import Link from "next/link";

export async function fetchBooksFromVariousCategories(bookSubjects: string[]) {
  const booksFromCategories = await Promise.all(
    bookSubjects.map(async (category) => {
      const books = await getBooksBySubject(category);
      return {
        category,
        books,
      };
    })
  );
  return booksFromCategories;
}
export async function CategoriesList({ categories }: { categories: string[] }) {
  const booksFromCategory = await fetchBooksFromVariousCategories(categories);
  return booksFromCategory.map((categoryObject) => (
    <div className={styles.categoryContainer} key={categoryObject.category}>
      <div className={styles.secondaryTitleContainer}>
        <h2>{convertFromSnakeToCapitalCase(categoryObject.category)}</h2>
        <Link href={`/search/?category=${categoryObject.category}`}>
          View More &gt;
        </Link>
      </div>
      <div className={styles.booksContainer}>
        {categoryObject.books.map((book: DetailedBook) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  ));
}
