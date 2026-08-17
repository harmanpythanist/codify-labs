import React from 'react';

// Clean, professional line-icon set (Feather-style) used across the whole
// site in place of emoji / animated icons. All icons share the same
// stroke width and proportions so they look consistent everywhere.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Svg = ({ size = 22, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...rest}>
    {children}
  </svg>
);

export const IconHome = (p) => (
  <Svg {...p}><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9a1 1 0 0 0 1 1H9v-5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V20h2.5a1 1 0 0 0 1-1v-9" /></Svg>
);

export const IconBriefcase = (p) => (
  <Svg {...p}><rect x="3" y="7.5" width="18" height="12" rx="2" /><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" /><path d="M3 12.5h18" /></Svg>
);

export const IconRocket = (p) => (
  <Svg {...p}><path d="M12 2c2.8 1.6 4.8 4.8 4.8 9 0 2-.5 3.8-1.3 5.2L12 19l-3.5-2.8C7.7 14.8 7.2 13 7.2 11c0-4.2 2-7.4 4.8-9Z" /><circle cx="12" cy="10.5" r="1.7" /><path d="M8.3 15.5 5 17.5l.7-4" /><path d="M15.7 15.5 19 17.5l-.7-4" /><path d="M9.5 19.5s.5 2 2.5 2 2.5-2 2.5-2" /></Svg>
);

export const IconGraduationCap = (p) => (
  <Svg {...p}><path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Z" /><path d="M6 11v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11" /><path d="M21 9v6" /></Svg>
);

export const IconLaptop = (p) => (
  <Svg {...p}><rect x="4" y="4.5" width="16" height="10.5" rx="1.4" /><path d="M2.5 19h19" /><path d="M9 19l.6-2h4.8l.6 2" /></Svg>
);

export const IconAward = (p) => (
  <Svg {...p}><circle cx="12" cy="9" r="5" /><path d="M9 13.3 8 21l4-2 4 2-1-7.7" /></Svg>
);

export const IconUsers = (p) => (
  <Svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c0-3 2.5-5.2 5.5-5.2S14.5 16 14.5 19" /><path d="M16 8.3a3 3 0 1 1 0 5.9" /><path d="M16.5 13.9c2.4.4 4 2.3 4 5.1" /></Svg>
);

export const IconPhone = (p) => (
  <Svg {...p}><path d="M5.5 4h3l1.3 4-2 1.4a11.5 11.5 0 0 0 5.8 5.8l1.4-2 4 1.3v3a1.4 1.4 0 0 1-1.5 1.4A16 16 0 0 1 4 5.5 1.4 1.4 0 0 1 5.5 4Z" /></Svg>
);

export const IconBrain = (p) => (
  <Svg {...p}><path d="M9 4.5A2.7 2.7 0 0 0 6.3 7.2 2.6 2.6 0 0 0 5 9.5a2.7 2.7 0 0 0 1 5.1c0 2.1 1.7 3.4 3.5 3.4" /><path d="M15 4.5a2.7 2.7 0 0 1 2.7 2.7A2.6 2.6 0 0 1 19 9.5a2.7 2.7 0 0 1-1 5.1c0 2.1-1.7 3.4-3.5 3.4" /><path d="M9.5 4.8V19" /><path d="M14.5 4.8V19" /></Svg>
);

export const IconMessage = (p) => (
  <Svg {...p}><path d="M4 5.5h16v10.5H9l-4 3.2v-3.2H4Z" /><path d="M8 9.5h8" /><path d="M8 12.5h5" /></Svg>
);

export const IconEye = (p) => (
  <Svg {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></Svg>
);

export const IconGlobe = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9Z" /></Svg>
);

export const IconZap = (p) => (
  <Svg {...p}><path d="M12.5 3 5 13.2h5.5L11 21l7.5-10.2H13l-.5-7.8Z" /></Svg>
);

export const IconBarChart = (p) => (
  <Svg {...p}><path d="M4 20V10" /><path d="M11 20V4" /><path d="M18 20v-7" /><path d="M3 20h18" /></Svg>
);

export const IconMonitor = (p) => (
  <Svg {...p}><rect x="3" y="4.5" width="18" height="12" rx="1.6" /><path d="M8.5 20.5h7" /><path d="M12 16.5v4" /></Svg>
);

export const IconSettings = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="3.2" /><path d="M12 3.5v2.3M12 18.2v2.3M4.9 6.9l1.6 1.6M17.5 15.5l1.6 1.6M3.5 12h2.3M18.2 12h2.3M4.9 17.1l1.6-1.6M17.5 8.5l1.6-1.6" /></Svg>
);

export const IconPalette = (p) => (
  <Svg {...p}><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7H16a4 4 0 0 0 4-4c0-4-3.6-7.2-8-7.2Z" /><circle cx="7.3" cy="12" r="1" fill="currentColor" /><circle cx="8.8" cy="8" r="1" fill="currentColor" /><circle cx="13" cy="6.8" r="1" fill="currentColor" /><circle cx="16.5" cy="9" r="1" fill="currentColor" /></Svg>
);

export const IconWrench = (p) => (
  <Svg {...p}><path d="M14.7 6.3a4 4 0 0 0-5.4 5l-6 6 2.4 2.4 6-6a4 4 0 0 0 5-5.4l-2.6 2.6-2.4-2.4Z" /></Svg>
);

export const IconTarget = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></Svg>
);

export const IconHandshake = (p) => (
  <Svg {...p}><path d="M2.5 12.5 6 9l3 1.6 3-2 3 2 3-1.6 3.5 3.5" /><path d="M6 9l4.5 4.5a1.6 1.6 0 0 0 2.3 0 1.6 1.6 0 0 0 0-2.3" /><path d="M12.5 13.5 14 15a1.5 1.5 0 0 0 2.1-2.1" /><path d="M15.8 11 17.5 12.7a1.5 1.5 0 0 0 2.1-2.1" /><path d="M2.5 12.5 5 17l2.3 1.5" /><path d="M21.5 12.5 19 17l-2.3 1.5" /></Svg>
);

export const IconTrendingUp = (p) => (
  <Svg {...p}><path d="M3 17 9.5 10.5 13.5 14.5 21 6" /><path d="M15.5 6H21v5.5" /></Svg>
);

export const IconRecycle = (p) => (
  <Svg {...p}><path d="M7 8.5 4.5 12.8 7 17" /><path d="M17 8.5h-6.5" /><path d="M13.5 4.7 17 8.5l-3.5 3.8" /><path d="M17 17H7.5" /><path d="M10.5 20.8 7 17l3.5-3.8" /><path d="M13.5 4.7 10 8.5" /></Svg>
);

export const IconLayers = (p) => (
  <Svg {...p}><path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5Z" /><path d="M3 12.5 12 17l9-4.5" /><path d="M3 16.5 12 21l9-4.5" /></Svg>
);

export const IconVideo = (p) => (
  <Svg {...p}><rect x="2.5" y="6" width="13" height="12" rx="1.6" /><path d="M15.5 10.2 21 7.5v9l-5.5-2.7" /></Svg>
);

export const IconMapPin = (p) => (
  <Svg {...p}><path d="M12 21s7-6.6 7-11.5a7 7 0 1 0-14 0C5 14.4 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.3" /></Svg>
);

export const IconCheck = (p) => (
  <Svg {...p}><path d="M4.5 12.5 9.5 17.5 19.5 6.5" /></Svg>
);

export const IconArrowRight = (p) => (
  <Svg {...p}><path d="M4.5 12h15" /><path d="M13.5 6l6 6-6 6" /></Svg>
);
