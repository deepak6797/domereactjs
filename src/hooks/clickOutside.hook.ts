import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  visible: boolean,
  setVisible: (val: boolean) => void,
) => {
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!ref.current) return;

      if (!visible || (ref.current && ref.current.contains(target as Node))) {
        return;
      }
      setVisible(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setVisible, visible]);
};
