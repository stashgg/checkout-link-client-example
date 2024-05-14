"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

const ORDER_COMPLETED_EVENT_NAME = "STASH_WINDOW_EVENT__PURCHASE_COMPLETE";
const CLOSE_WINDOW_EVENT_NAME =
  "STASH_WINDOW_EVENT__CLOSE_PURCHASE_SUCCESS_WINDOW";

export default function Home() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [hasOrderCompleted, setHasOrderCompleted] = useState(false);
  const [childWindow, setChildWindow] = useState<Window | null>(null);
  const orderStatus = hasOrderCompleted ? "Completed" : "Pending";
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const hasEventKey =
        typeof event.data === "object" &&
        event.data &&
        "eventName" in event.data;
      if (!hasEventKey) {
        return;
      }

      switch (event.data.eventName) {
        case ORDER_COMPLETED_EVENT_NAME:
          setHasOrderCompleted(true);
          break;
        case CLOSE_WINDOW_EVENT_NAME:
          childWindow?.close();
        default:
          console.log("Unsupported event name: ", event.data.eventName);
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [childWindow]);

  return (
    <main className={styles.main}>
      <button
        type="button"
        className={styles.button}
        onClick={async () => {
          try {
            const res = await fetch("/api/checkout-session", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
            });

            const data = await res.json();
            if (!data.url) {
              throw new Error("No URL returned from server");
            } else {
              setOrderId(data.id);
              setHasOrderCompleted(false);
              const child = window.open(data.url, "_blank");
              setChildWindow(child);
            }
          } catch (err: unknown) {
            console.error(err);
          }
        }}
      >
        Create checkout session on Stash
      </button>
      <div className={styles.content}>
        {orderId && <p>Active Order ID: {orderId}</p>}
        {orderId && <p>Order status: {orderStatus}</p>}
      </div>
    </main>
  );
}
