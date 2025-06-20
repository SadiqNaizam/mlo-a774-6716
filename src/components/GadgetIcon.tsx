import React from 'react';
import { Highlighter, type LucideProps } from 'lucide-react';

// Define the types of gadgets available
export type DoraemonGadget = 'anywhere-door' | 'take-kopter' | 'doraemon-bell' | 'small-light';

interface GadgetIconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'size'> {
  gadget: DoraemonGadget;
  size?: number | string;
  className?: string;
  lucideProps?: LucideProps; // For lucide-specific props when 'small-light' is chosen
}

const GadgetIcon: React.FC<GadgetIconProps> = (props) => {
  const { gadget, size = 24, className, lucideProps, ...restSvgProps } = props;

  console.log('GadgetIcon loaded for gadget:', gadget);

  const iconSize = typeof size === 'string' ? parseInt(size, 10) : size;

  switch (gadget) {
    case 'anywhere-door':
      return (
        <svg
          width={iconSize}
          height={iconSize * 1.5} // Doors are typically taller than wide
          viewBox="0 0 100 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Anywhere Door icon"
          role="img"
          {...restSvgProps}
        >
          <title>Anywhere Door</title>
          <rect width="100" height="150" rx="5" fill="#FFC0CB" /> {/* Pink door */}
          <rect x="10" y="10" width="80" height="130" rx="3" stroke="#A0522D" strokeWidth="3" fill="#FFB6C1" /> {/* Inner panel */}
          <circle cx="85" cy="75" r="6" fill="#FFD700" stroke="#DAA520" strokeWidth="1.5" /> {/* Gold doorknob */}
        </svg>
      );
    case 'take-kopter':
      return (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Take-Kopter icon"
          role="img"
          {...restSvgProps}
        >
          <title>Take-Kopter</title>
          {/* Propeller blades */}
          <ellipse cx="50" cy="30" rx="45" ry="12" fill="#ADD8E6" stroke="#87CEEB" strokeWidth="2"/>
          {/* Stick */}
          <rect x="45" y="25" width="10" height="50" fill="#F0E68C" stroke="#DEB887" strokeWidth="2"/>
          {/* Center hub */}
          <circle cx="50" cy="30" r="7" fill="#D2B48C" stroke="#8B4513" strokeWidth="1.5"/>
        </svg>
      );
    case 'doraemon-bell':
      return (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Doraemon's Bell icon"
          role="img"
          {...restSvgProps}
        >
          <title>Doraemon's Bell</title>
          {/* Bell body */}
          <circle cx="50" cy="50" r="40" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
          {/* Bell highlight */}
          <circle cx="50" cy="45" r="30" fill="#FFFACD" opacity="0.5" />
           {/* Horizontal lines */}
          <line x1="20" y1="58" x2="80" y2="58" stroke="#A0522D" strokeWidth="2.5" />
          <line x1="25" y1="65" x2="75" y2="65" stroke="#A0522D" strokeWidth="2.5" />
          {/* Small circle (clapper hole) */}
          <circle cx="50" cy="55" r="4" fill="#4A3B31" />
          {/* Clapper (visible part) */}
          <ellipse cx="50" cy="78" rx="10" ry="7" fill="#8B4513" stroke="#5C3317" strokeWidth="1"/>
        </svg>
      );
    case 'small-light': // Example using a lucide-react icon
      return (
        <Highlighter
          size={iconSize}
          className={className}
          aria-label="Small Light icon"
          role="img"
          {...lucideProps} // Pass lucide specific props here
        >
          <title>Small Light</title>
        </Highlighter>
      );
    default:
      // Fallback: render a generic placeholder or null
      // Ensuring the function returns a value in all cases.
      console.warn("Unknown gadget type:", gadget);
      return (
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className={className}
          aria-label="Placeholder icon"
          role="img"
          {...restSvgProps}
        >
          <title>Placeholder</title>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      );
  }
};

export default GadgetIcon;