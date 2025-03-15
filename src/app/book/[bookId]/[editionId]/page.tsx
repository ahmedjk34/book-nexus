import { getFullBookInfo } from "@/util/API";
import { DetailedBook } from "@/util/Types";
import React from "react";
import styles from "../../../../styles/pages/book-page.module.scss";
import MainInfo from "./_components/MainInfo";

type Props = {
  params: Promise<{ bookId: string; editionId: string }>;
};

async function page({ params }: Props) {
  const { bookId, editionId } = await params;
  const book: DetailedBook = await getFullBookInfo(bookId, editionId);

  return (
    <div className={styles.bookPage}>
      <div className={styles.pageContainer}>
        {/*place holder data for the rating & reviews for now*/}
        <MainInfo
          title={book.title}
          cover_id={book.cover_id}
          authorsNames={book.authors_names}
          description={book.description}
          rating={4}
          numberOfRatings={2421}
          numberOfReviews={14}
        />
      </div>
    </div>
  );
}

export default page;
