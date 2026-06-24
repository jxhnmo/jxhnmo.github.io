import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`appBackground ${styles.wrap}`}>
      <p>404</p>
      <h1>Page not found</h1>
      <p>
        Page in construction or not found. Please proceed to the nearest exit!
      </p>
      <Link href="/">Back home</Link>
    </main>
  );
}
