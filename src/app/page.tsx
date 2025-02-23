import Hero from "./_homeComponents/Hero";
import styles from "../styles/pages/home-page.module.scss";
export default function Home() {
  return (
    <div className={styles.homePage}>
      <Hero />
    </div>
  );
}
