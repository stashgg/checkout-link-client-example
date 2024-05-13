## Order Link Client Example

This repo contains an example of how to use the Order Link API client.

### Cross-window communication

The Stash order link window uses cross-window communication via the `postMessage` interface.

In order to leverage events sent from Stash, you must listen for the `message` event on the parent `window` object.

```typescript
const ORDER_COMPLETED_EVENT_NAME = "STASH_WINDOW_EVENT__PURCHASE_COMPLETE";

useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    const hasEventKey =
      typeof event.data === "object" && event.data && "eventName" in event.data;
    if (!hasEventKey) {
      return;
    }

    switch (event.data.eventName) {
      case ORDER_COMPLETED_EVENT_NAME:
        setHasOrderCompleted(true);
        break;
      default:
        console.log("Unsupported event name: ", event.data.eventName);
    }
  };
  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);
  };
}, []);
```

### Event payload

The `event.data` payload will contain an object with the following shape:

```typescript
interface Payload {
  eventName: string;
}
```

Event names returned from Stash will always be prefixed with `STASH_WINDOW_EVENT__`.

### Event names

The following event names are supported:

- `STASH_WINDOW_EVENT__PURCHASE_COMPLETE`: This event is sent when the user has completed their purchase.
