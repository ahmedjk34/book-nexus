"use client";
import React, { useState } from "react";
import styles from "../../styles/pages/home-page.module.scss";
import { bookSubjects } from "@/util/staticData";
import Image from "next/image";
import { convertFromSnakeToCapitalCase } from "@/util/util";

type Props = {};

function BookCategory({}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateSlide = () => {
    if (currentSlide + 1 >= 4) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const renderSubjects = (start: number, end: number, slideIndex: number) => {
    return (
      <div
        className={`${styles.categoriesSlide} ${
          currentSlide === slideIndex ? styles.active : styles["fade-out"]
        }`}
      >
        {bookSubjects.slice(start, end).map((subject, index) => (
          <div key={index + subject} className={styles.category}>
            <Image
              width={180}
              height={240}
              priority
              alt={subject}
              src={`/static_books/${subject}.jpg`}
            />
            <h4>{convertFromSnakeToCapitalCase(subject)}</h4>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.bookCategory}>
      <div className={styles.titleContainer}>
        <h2>Book Category</h2>
        <button type="button" onClick={(e) => updateSlide()}>
          Browse Other Categories &gt;
        </button>
      </div>
      {renderSubjects(0, 4, 0)}
      {renderSubjects(4, 8, 1)}
      {renderSubjects(8, 12, 2)}
      {renderSubjects(12, bookSubjects.length, 3)}
    </div>
  );
}

export default BookCategory;
