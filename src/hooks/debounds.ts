import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 300): string {
  const [deboubced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return deboubced;
}
