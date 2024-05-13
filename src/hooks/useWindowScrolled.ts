import { useEffect, useState } from "react";

function useWindowScrolled({ triggerAt = 0 }: { triggerAt?: number }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > triggerAt) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, [window.scrollY]);

  return { scrolled };
}
export default useWindowScrolled;
