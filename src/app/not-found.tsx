import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`appBackground ${styles.wrap}`}>
      <div className={styles.card}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.body}>
          Page in construction or not found. Please proceed to the nearest exit!
        </p>
        <Link href="/" className={styles.action}>
          Back home
        </Link>
      </div>
    </main>
  );
}
