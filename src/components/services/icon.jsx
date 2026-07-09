export function ClockIcon({ size = 16, color = "#474746" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill = "none" xmlns="http://www.w3.org/2000/svg">
            <circle cx = "8" cy = "8" r = "6.5" stroke={color} strokeWidth="1.3"/>
            <path d = "M8 4.5V8L10.3 9.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export function ShieldIcon({ size = 16, color = "#474746"}) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d = "M8 1.5L13.5 3.5V7.5C13.5 11 11.2 13.3 8 14.5C4.8 13.3 2.5 11 2.5 7.5V3.5L8 1.5Z"
                stroke={color}
                strokeWidth="1.3"
                strokeLinejoin="round"
            />
            <path d="M5.7 8L7.3 9.6L10.3 6.3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export function GaugeIcon({ size = 18, color = "#ffffff" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12A6 6 0 1 1 14 12" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
            <path d="M8 12L10.5 7.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="8" cy="12" r="0.9" fill={color} />
        </svg>
    );
}

export function CartPlusIcon({ size = 18, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 2H3.5L5.4 11.5C5.5 12 6 12.5 6.5 12.5H14.5C15 12.5 15.5 12 15.6 11.5L17 4.5H4.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="16" r="1" fill={color} />
      <circle cx="14" cy="16" r="1" fill={color} />
    </svg>
  );
}

export function CloseIcon({ size = 20, color = "#2a1614" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5L15 15M15 5L5 15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 56, color = "#16a34a" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="26" stroke={color} strokeWidth="3" />
      <path d="M18 28.5L24.5 35L38 20" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const META_ICONS = {
  clock: ClockIcon,
  shield: ShieldIcon,
  gauge: GaugeIcon,
};
