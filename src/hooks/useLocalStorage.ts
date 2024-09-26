import { useState, useEffect, Dispatch, SetStateAction } from "react";

type ReturnType<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): ReturnType<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
