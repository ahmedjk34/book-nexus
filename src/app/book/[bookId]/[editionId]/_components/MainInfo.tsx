"use client";
import React, { useState, useRef, useEffect } from "react";
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

function MainInfo({
  cover_id,
  title,
  authorsNames,
  rating,
  numberOfRatings,
  numberOfReviews,
  description,
}: Props) {
  const [isAuthorsExpanded, setIsAuthorsExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const containerHeight =
        descriptionRef.current.parentElement?.offsetHeight || 0;
      const descriptionHeight = descriptionRef.current.scrollHeight;

      if (descriptionHeight >= containerHeight * 0.5) {
        setShouldCollapse(true);
      }
    }
  }, [description]);

  return (
    <div className={styles.bookPage}>
      <div className={styles.pageContainer}>
        <div className={styles.heroSection}>
          <div className={styles.sideInfo}>
            <VerticalBookImage
              src={`https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`}
              alt={title}
            />
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
          <div className={styles.mainInfo}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.authorsContainer}>
              <span>{authorsNames.slice(0, 3).join(", ")}</span>
              {authorsNames.length > 3 && (
                <div
                  onClick={() => setIsAuthorsExpanded(!isAuthorsExpanded)}
                  className={styles.showMore}
                >
                  {isAuthorsExpanded ? "Show less" : "Show more..."}
                </div>
              )}
            </div>
            <div className={styles.descriptionContainer}>
              <p
                ref={descriptionRef}
                className={
                  isDescriptionExpanded ? styles.expanded : styles.collapsed
                }
              >
                {description}
              </p>
              {shouldCollapse && (
                <div
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  className={styles.toggleDescription}
                >
                  {isDescriptionExpanded ? "Show less" : "Show more..."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
