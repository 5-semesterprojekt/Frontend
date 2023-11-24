import { useEffect, useRef } from 'react';

// Source: https://www.robinwieruch.de/react-hook-detect-click-outside-component/
const useOutsideClick = (callback: () => void) => {
  const ref = useRef<any>();
  const ref2 = useRef<any>();

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target) && ((ref2.current && !ref2.current.contains(event.target)) || !ref2.current)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [callback, ref]);

  return [ref, ref2];
};

export default useOutsideClick;
