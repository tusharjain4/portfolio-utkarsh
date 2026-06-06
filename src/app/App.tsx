import { useEffect, useRef } from 'react';
import PortfolioWebsiteForAnIndividualDesigner from '../imports/PortfolioWebsiteForAnIndividualDesigner/PortfolioWebsiteForAnIndividualDesigner';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Find all sections by their data-name attributes
    const heroSection = container.querySelector('[data-name="Personal or Company Website Home Page Title Section"]');
    const worksSection = container.querySelector('[data-name="Portfolio About Section"]');
    const skillsSection = worksSection?.nextElementSibling; // The skills section is the next Portfolio About Section

    // Find navigation links
    const navLinks = container.querySelectorAll('[data-name="pageLinks"] p');
    const scrollExplore = container.querySelector('[data-name="Personal or Company Website Home Page Title Section"]')?.querySelector('p[class*="underline"]');

    // Scroll to section helper
    const scrollToSection = (element: Element | null | undefined) => {
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Add click handlers to navigation
    if (navLinks.length >= 3) {
      // Home link
      navLinks[0].addEventListener('click', () => scrollToSection(heroSection));
      navLinks[0].classList.add('cursor-pointer');

      // Work link
      navLinks[1].addEventListener('click', () => scrollToSection(worksSection));
      navLinks[1].classList.add('cursor-pointer');

      // About link
      navLinks[2].addEventListener('click', () => scrollToSection(skillsSection));
      navLinks[2].classList.add('cursor-pointer');
    }

    // Add click handler to "Scroll to explore"
    if (scrollExplore) {
      scrollExplore.addEventListener('click', () => scrollToSection(worksSection));
      scrollExplore.classList.add('cursor-pointer');
    }

    // Add custom styles for hover effects
    const style = document.createElement('style');
    style.textContent = `
      [data-name="pageLinks"] p {
        transition: all 0.2s ease;
        cursor: pointer;
      }
      [data-name="pageLinks"] p:hover {
        color: #21279D !important;
        text-decoration: underline;
      }
      [data-name="Personal or Company Website Home Page Title Section"] p[class*="underline"] {
        cursor: pointer;
        transition: color 0.2s ease;
      }
      [data-name="Personal or Company Website Home Page Title Section"] p[class*="underline"]:hover {
        color: #21279D !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div ref={containerRef} className="size-full overflow-auto">
      <PortfolioWebsiteForAnIndividualDesigner />
    </div>
  );
}
