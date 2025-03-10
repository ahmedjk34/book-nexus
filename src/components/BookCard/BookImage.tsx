"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./book-card.module.scss";

const BookImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.imageContainer}>
      {isLoading && <div className={styles.imageLoadingOverlay}></div>}
      <Image
        src={src}
        alt={alt}
        className={styles.bookCover}
        sizes="285px"
        fill
        priority
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default BookImage;
