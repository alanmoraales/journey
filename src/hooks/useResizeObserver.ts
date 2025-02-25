import { useEffect, useState, useRef, type RefObject } from "react";

interface UseResizeObserver<T extends HTMLElement> {
  size: {
    width: number;
    height: number;
  };
  ref?: RefObject<T>;
}

function useResizeObserver<T extends HTMLElement>(): UseResizeObserver<T> {
  const ref = useRef<T>(undefined);
  const [size, setSize] = useState<UseResizeObserver<T>["size"]>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return { size, ref: ref as RefObject<T> };
}

export default useResizeObserver;
