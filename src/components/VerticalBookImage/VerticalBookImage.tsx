"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./vertical-book-image.module.scss";

const VerticalBookImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInViewport, setIsInViewport] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect(); // Stop observing once in viewport
        }
      },
      { rootMargin: "100px", threshold: 0.5 } // Start loading slightly before it's visible
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imageRef} className={styles.imageContainer}>
      {isLoading && <div className={styles.imageLoadingOverlay}></div>}
      <Image
        src={src}
        alt={alt}
        className={styles.bookCover}
        sizes="285px"
        fill
        onLoad={() => setIsLoading(false)}
        loading={isInViewport ? "lazy" : "eager"}
      />
    </div>
  );
};

export default VerticalBookImage;
