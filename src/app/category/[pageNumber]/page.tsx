import React from "react";
import styles from "../../../styles/pages/category-page.module.scss";
import { convertFromSnakeToCapitalCase } from "@/util/util";
import Link from "next/link";
import { getBooksBySubject } from "@/util/API";
import { BookCard } from "@/components";
import { bookSubjects } from "@/util/staticData";
import { redirect } from "next/navigation";

async function Page({ params }: { params: Promise<{ pageNumber: string }> }) {
  const pageNumber = Number((await params).pageNumber);
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 4) {
    redirect("/category/1");
  }
  const renderCategory = async (category: string) => {
    const booksFromCategory = await getBooksBySubject(category);
    return (
      <div className={styles.categoryContainer}>
        <div className={styles.secondaryTitleContainer}>
          <h2>{convertFromSnakeToCapitalCase(category)}</h2>
          <Link href="/">View More &gt;</Link>
        </div>
        <div className={styles.booksContainer}>
          {booksFromCategory.map((book: any) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className={styles.categoryPage}>
      <h1 className={styles.pageTitle}>Book Category</h1>
      {bookSubjects
        .slice((pageNumber - 1) * 4, pageNumber * 4)
        .map((category) => {
          return renderCategory(category);
        })}
    </div>
  );
}

export default Page;
