"use client";
import React from "react";
import styles from "../../../../../styles/pages/book-page.module.scss";
import { FaPen, FaPlus, FaArrowDown } from "react-icons/fa6";
import { VerticalBookImage } from "@/components";

type Props = {
  cover_id: number;
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
    <div>
      <div className={styles.heroSection}>
        <div className={styles.sideInfo}>
          <div className={styles.sideInfo}>
            <VerticalBookImage src={bookImageURL} alt={title} />
            <button>
              Want to Read <FaPen />
            </button>
            <button>
              Buy on Amazon USA <FaArrowDown />
            </button>
            <button>
              Add to Wishlist <FaPlus />
            </button>
          </div>
        </div>
        <div className={styles.mainInfo}></div>
      </div>
    </div>
  );
}

export default MainInfo;

{
  /*placeholder value for shop name*/
}
