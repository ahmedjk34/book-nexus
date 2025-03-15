import React from "react";
import styles from "../../../../../styles/pages/book-page.module.scss";
import VerticalBookImage from "@/components/VerticalBookImage/VerticalBookImage";
type Props = {
  cover_id: string;
  title: string;
  authorsNames: string[];
  rating: number;
  numberOfRatings: number;
  numberOfReviews: number;
  description: string;
};

function MainInfo({ cover_id, title }: Props) {
  const bookImageURL = `https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`;

  return (
    <div className={styles.heroSection}>
      {/* <div className={styles.mainInfoOverlay}>
        <div />
        <div />
      </div> */}
      <div className={styles.sideInfo}>
        <VerticalBookImage src={bookImageURL} alt={title} />
      </div>
      <div className={styles.mainInfo}></div>
    </div>
  );
}

export default MainInfo;
