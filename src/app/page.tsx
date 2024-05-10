"use client";

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <button type="button" className={styles.button} onClick={() => {}}>Create checkout session on Stash</button>
    </main>
  );
}
