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

export const IconArrowLeft = (p) => (
  <Svg {...p}><path d="M19.5 12h-15" /><path d="M10.5 6l-6 6 6 6" /></Svg>
);

export const IconChevronDown = (p) => (
  <Svg {...p}><path d="M6 9.5l6 6 6-6" /></Svg>
);

export const IconMenu = (p) => (
  <Svg {...p}><path d="M3.5 6.5h17" /><path d="M3.5 12h17" /><path d="M3.5 17.5h17" /></Svg>
);

export const IconClose = (p) => (
  <Svg {...p}><path d="M5.5 5.5l13 13" /><path d="M18.5 5.5l-13 13" /></Svg>
);

export const IconImage = (p) => (
  <Svg {...p}><rect x="3" y="4.5" width="18" height="15" rx="2" /><circle cx="8.5" cy="10" r="1.6" /><path d="M3.5 17l4.8-4.6a1.7 1.7 0 0 1 2.3 0L16 17.5" /><path d="M14.2 14.6l1.9-1.8a1.7 1.7 0 0 1 2.3 0l2.1 2" /></Svg>
);

export const IconMail = (p) => (
  <Svg {...p}><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M3 7l8.1 5.6a1.6 1.6 0 0 0 1.8 0L21 7" /></Svg>
);

export const IconExternal = (p) => (
  <Svg {...p}><path d="M13.5 4.5H19.5V10.5" /><path d="M19 5l-8 8" /><path d="M18 14.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V7.5A1.5 1.5 0 0 1 6 6h3.5" /></Svg>
);

export const IconAlert = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5" /><path d="M12 16.3v.2" /></Svg>
);

export const IconSpinner = (p) => (
  <Svg {...p}><path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" /></Svg>
);

export const IconDownload = (p) => (
  <Svg {...p}><path d="M12 4v11" /><path d="M7.5 10.5 12 15l4.5-4.5" /><path d="M4.5 19.5h15" /></Svg>
);

// Brand marks — these are solid glyphs, so they opt out of the shared stroke.
export const IconInstagram = ({ size = 22, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.43.42.7.83.92 1.4.17.42.37 1.03.42 2.2.06 1.28.07 1.66.07 4.88s0 3.6-.07 4.88c-.05 1.17-.25 1.78-.42 2.2a3.9 3.9 0 0 1-.92 1.4c-.42.43-.83.7-1.4.92-.42.17-1.03.37-2.2.42-1.28.06-1.66.07-4.88.07s-3.6 0-4.88-.07c-1.17-.05-1.78-.25-2.2-.42a3.9 3.9 0 0 1-1.4-.92 3.9 3.9 0 0 1-.92-1.4c-.17-.42-.37-1.03-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.88c.05-1.17.25-1.78.42-2.2.22-.58.48-1 .92-1.4A3.9 3.9 0 0 1 5 2.7c.42-.17 1.03-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.16 0-3.5 0-4.74.07-1.14.05-1.76.24-2.17.4-.55.22-.94.47-1.35.88-.4.4-.66.8-.87 1.35-.16.4-.35 1.03-.4 2.17C2.4 8.5 2.4 8.84 2.4 12s0 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.87 1.35.41.4.8.66 1.35.87.41.16 1.03.35 2.17.4 1.24.07 1.58.07 4.74.07s3.5 0 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.87.4-.41.66-.8.87-1.35.16-.41.35-1.03.4-2.17.07-1.24.07-1.58.07-4.74s0-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.87-1.35 3.6 3.6 0 0 0-1.35-.87c-.41-.16-1.03-.35-2.17-.4C15.5 4 15.16 4 12 4Zm0 3.03a4.97 4.97 0 1 1 0 9.94 4.97 4.97 0 0 1 0-9.94Zm0 8.2a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46Zm6.33-8.4a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" />
  </svg>
);

export const IconLinkedin = ({ size = 22, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.2 21V9.4h3.56V21H3.2Zm6.03 0V9.4h3.41v1.58h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45V21h-3.55v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.19 1.48-2.19 3v5.8H9.23Z" />
  </svg>
);

export const IconWhatsapp = ({ size = 22, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const IconSearch = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="M15.8 15.8 20.5 20.5" /></Svg>
);

export const IconBookOpen = (p) => (
  <Svg {...p}><path d="M12 6.8S10.2 5 6.8 5H3.5v12.5h3.6c3 0 4.9 1.5 4.9 1.5s1.9-1.5 4.9-1.5h3.6V5h-3.3C13.8 5 12 6.8 12 6.8Z" /><path d="M12 6.8V19" /></Svg>
);

export const IconLock = (p) => (
  <Svg {...p}><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /><path d="M12 14.5v2.5" /></Svg>
);

export const IconUnlock = (p) => (
  <Svg {...p}><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 7.7-1.5" /><path d="M12 14.5v2.5" /></Svg>
);

export const IconFlask = (p) => (
  <Svg {...p}><path d="M10 3.5h4" /><path d="M10.5 3.5v6L5.4 17.8A2 2 0 0 0 7.1 21h9.8a2 2 0 0 0 1.7-3.2L13.5 9.5v-6" /><path d="M7.6 14.5h8.8" /></Svg>
);
