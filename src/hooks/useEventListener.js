import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const DEFAULT_DEBOUNCE_TIMEOUT = 100;

export default function useEventListener ({
  target,
  event,
  onEvent,
  debounceOnEvent = false,
  fireOnLoad = false
}) {
  if (!target) {
    throw new Error(`useEventListener - Must have target defined: ${target}`);
  }

  if (typeof event !== 'string') {
    throw new Error(
      `useEventListener - Listener event must be string: ${event}`
    );
  }

  /**
   * handleEvent
   * @description Fires when the event listener is triggered
   */

  function handleEvent (e) {
    if (typeof onEvent === 'function') {
      onEvent(e);
    }
  }

  const [debouncedHandleEvent] = useDebouncedCallback(
    handleEvent,
    DEFAULT_DEBOUNCE_TIMEOUT
  );

  useEffect(() => {
    if (typeof target === 'undefined') return;

    const handler =
      debounceOnEvent !== false ? debouncedHandleEvent : handleEvent;

    window.addEventListener(event, handler);

    if (fireOnLoad === true) {
      handler({
        target
      });
    }

    return () => {
      window.removeEventListener(event, handler);
    };
  }, [target, event, onEvent, debounceOnEvent, fireOnLoad]);
}
