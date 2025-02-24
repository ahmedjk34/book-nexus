import { getQuoteOfTheDay } from "@/util/API";
import React from "react";
import styles from "../../styles/pages/home-page.module.scss";
import Link from "next/link";
type Props = {};

async function QuoteOfTheDay({}: Props) {
  const todaysQuote = await getQuoteOfTheDay();
  return (
    <div className={styles.quoteOfTheDay}>
      <div className={styles.titleContainer}>
        <h2>Quote of the Day</h2>
        <Link href="/">Show More Quotes &gt;</Link>
      </div>
      <blockquote className={styles.quoteContainer}>
        <q>{todaysQuote.text}</q>
        <footer>
          -{todaysQuote.author} , {todaysQuote.book}
        </footer>
      </blockquote>
    </div>
  );
}

export default QuoteOfTheDay;
