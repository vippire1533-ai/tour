import { useState, useEffect } from 'react';

const useDebounce = (value, debounceTime) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    let timer;
    if (value) {
      timer = setTimeout(() => {
        setDebounceValue(debounceValue);
      }, debounceTime);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
