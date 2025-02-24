import Hero from "./_homeComponents/Hero";
import styles from "../styles/pages/home-page.module.scss";
import BookCategory from "./_homeComponents/BookCategory";
import QuoteOfTheDay from "./_homeComponents/QuoteOfTheDay";
export default function Home() {
  return (
    <div className={styles.homePage}>
      <Hero />
      <BookCategory />
      <QuoteOfTheDay />
    </div>
  );
}
