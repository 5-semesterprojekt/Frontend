import { useEffect, useRef } from 'react';

// Source: https://www.robinwieruch.de/react-hook-detect-click-outside-component/
const useOutsideClick = (callback: () => void) => {
  const ref = useRef<any>();

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [callback, ref]);

  return ref;
};

export default useOutsideClick;
