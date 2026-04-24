import { useEffect } from "react";
import { useLocation } from "react-router";
import { useLenis } from "lenis/react";

/**
 * ScrollHandler handles:
 * 1. Scrolling to top on route change.
 * 2. Scrolling to hash elements (anchors) when the hash in the URL changes.
 * Integrates with Lenis for smooth transitions.
 */
export default function ScrollHandler() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (hash) {
      // Small timeout to ensure the element is rendered if we just switched pages
      const timeoutId = setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          lenis.scrollTo(targetElement, { 
            offset: -100, // Adjust for fixed header height
            duration: 1.5
          });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      // If no hash, scroll to top on page change
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash, lenis]);

  return null;
}
