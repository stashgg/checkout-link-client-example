"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {useEffect, useState} from "react";

const ORDER_COMPLETED_EVENT_NAME = "STASH_WINDOW_EVENT__PURCHASE_COMPLETE";

export default function Home() {
    const [orderId, setOrderId] = useState<string | null>(null);
const [hasOrderCompleted, setHasOrderCompleted] = useState(false);
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const hasEventKey = "eventName" in event.data;
            if (!hasEventKey) {
                return;
            }
            console.log("event.data: ", event.data);
switch (event.data.eventName) {
    case ORDER_COMPLETED_EVENT_NAME:
        setHasOrderCompleted(true);
    default:
        console.log('Unsupported event name: ', event.data.eventName);
}

        };
        window.addEventListener("message", handleMessage);

        return () => {
           window.removeEventListener("message", handleMessage);
        }
    }, []);

    return (
        <main className={styles.main}>
          <button type="button" className={styles.button} onClick={async () => {
              try {
                  const res = await fetch("/api/checkout-session", {
                      method: "POST",
                      headers: {
                        'content-type': 'application/json',
                      }
                  });
                  const data = await res.json();
                  console.log("data: ", data);
                  if (!data.url) {
                      throw new Error("No URL returned from server");
                  } else {
                      window.open(`http://localhost:4000/iosdemo-test/order/${data.id}`, "_blank");
                  }
              } catch (err: unknown) {
                  console.error(err);
              }

          }}>Create checkout session on Stash</button>

        </main>
  );
}
