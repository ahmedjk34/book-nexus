import { CategoriesList } from "./CategoryList";
import React from "react";
import styles from "../../../styles/pages/category-page.module.scss";
import Link from "next/link";
import { bookSubjects } from "@/util/staticData";
import { redirect } from "next/navigation";

async function Page({ params }: { params: Promise<{ pageNumber: string }> }) {
  const pageNumber = Number((await params).pageNumber);

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 4) {
    redirect("/category/1");
  }

  return (
    <div className={styles.categoryPage}>
      <h1 className={styles.pageTitle}>Book Category</h1>
      <CategoriesList
        categories={bookSubjects.slice((pageNumber - 1) * 4, pageNumber * 4)}
      />
      <div className={styles.pagination}>
        <Link href={`/category/${pageNumber - 1}`}>
          <button disabled={pageNumber === 1}>&lt; Previous</button>
        </Link>
        <Link href={`/category/${pageNumber + 1}`}>
          <button disabled={pageNumber === 4}>Next &gt;</button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
