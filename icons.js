// SVG weather icons
export const weatherIcons = {
  sunny: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="10" fill="#FDB813"/>
    <g stroke="#FDB813" stroke-width="3" stroke-linecap="round">
      <line x1="32" y1="8" x2="32" y2="14"/>
      <line x1="32" y1="50" x2="32" y2="56"/>
      <line x1="14.5" y1="14.5" x2="18.8" y2="18.8"/>
      <line x1="45.2" y1="45.2" x2="49.5" y2="49.5"/>
      <line x1="8" y1="32" x2="14" y2="32"/>
      <line x1="50" y1="32" x2="56" y2="32"/>
      <line x1="14.5" y1="49.5" x2="18.8" y2="45.2"/>
      <line x1="45.2" y1="18.8" x2="49.5" y2="14.5"/>
    </g>
  </svg>`,

  partlyCloudy: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="10" fill="#FDB813"/>
    <g stroke="#FDB813" stroke-width="2.5" stroke-linecap="round">
      <line x1="28" y1="8" x2="28" y2="13"/>
      <line x1="28" y1="43" x2="28" y2="48"/>
      <line x1="11" y1="11" x2="14.8" y2="14.8"/>
      <line x1="41.2" y1="41.2" x2="45" y2="45"/>
      <line x1="6" y1="28" x2="11" y2="28"/>
      <line x1="45" y1="28" x2="50" y2="28"/>
      <line x1="11" y1="45" x2="14.8" y2="41.2"/>
      <line x1="41.2" y1="15" x2="45" y2="11"/>
    </g>
    <path d="M54 42H28C23.6 42 20 38.4 20 34C20 29.6 23.6 26 28 26C29.1 26 31.1 26.2 32.1 26.5C33.8 23.3 37.1 21 41 21C46.2 21 50.5 24.8 51.5 29.7C52.4 29.5 53.2 29.4 54 29.4C58.4 29.4 62 33 62 37.4C62 42 58.4 42 54 42Z" fill="white"/>
  </svg>`,

  cloudy: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M52 44H22C16.5 44 12 39.5 12 34C12 28.5 16.5 24 22 24C23.3 24 24.5 24.2 25.7 24.6C27.8 20.6 32 18 36.8 18C43.2 18 48.4 22.6 49.8 28.5C50.8 28.2 51.9 28 53 28C58.5 28 63 32.5 63 38C63 44 58.5 44 53 44H52Z" fill="white"/>
  </svg>`,

  rainy: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M56 40H20C14.5 40 10 35.5 10 30C10 24.5 14.5 20 20 20C21.3 20 22.5 20.2 23.7 20.6C25.8 16.6 30 14 34.8 14C41.2 14 46.4 18.6 47.8 24.5C48.8 24.2 49.9 24 51 24C56.5 24 61 28.5 61 34C61 40 56.5 40 51 40H56Z" fill="white"/>
    <g stroke="#7EC8E3" stroke-width="2.5" stroke-linecap="round">
      <line x1="19" y1="46" x2="16" y2="54"/>
      <line x1="27" y1="46" x2="24" y2="54"/>
      <line x1="35" y1="46" x2="32" y2="54"/>
      <line x1="43" y1="46" x2="40" y2="54"/>
      <line x1="51" y1="46" x2="48" y2="54"/>
    </g>
  </svg>`,

  snowy: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g stroke="white" stroke-width="2.5" stroke-linecap="round">
      <line x1="32" y1="8" x2="32" y2="56"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <line x1="14" y1="14" x2="50" y2="50"/>
      <line x1="50" y1="14" x2="14" y2="50"/>
      <line x1="12" y1="24" x2="18" y2="28"/>
      <line x1="24" y1="12" x2="28" y2="18"/>
      <line x1="52" y1="24" x2="46" y2="28"/>
      <line x1="40" y1="12" x2="36" y2="18"/>
      <line x1="52" y1="40" x2="46" y2="36"/>
      <line x1="40" y1="52" x2="36" y2="46"/>
      <line x1="12" y1="40" x2="18" y2="36"/>
      <line x1="24" y1="52" x2="28" y2="46"/>
    </g>
  </svg>`,

  thunderstorm: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M56 40H20C14.5 40 10 35.5 10 30C10 24.5 14.5 20 20 20C21.3 20 22.5 20.2 23.7 20.6C25.8 16.6 30 14 34.8 14C41.2 14 46.4 18.6 47.8 24.5C48.8 24.2 49.9 24 51 24C56.5 24 61 28.5 61 34C61 40 56.5 40 51 40H56Z" fill="white"/>
    <path d="M31 40L39 40L35 48L43 48L31 66L35 49L27 49L31 40Z" fill="#FFD700"/>
  </svg>`,

  foggy: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g fill="#DBE4ED" stroke="none">
      <rect x="14" y="16" width="10" height="5" rx="3"/>
      <rect x="28" y="16" width="10" height="5" rx="3"/>
      <rect x="42" y="16" width="10" height="5" rx="3"/>
      <rect x="21" y="26" width="10" height="5" rx="3"/>
      <rect x="35" y="26" width="10" height="5" rx="3"/>
      <rect x="49" y="26" width="10" height="5" rx="3"/>
      <rect x="14" y="36" width="10" height="5" rx="3"/>
      <rect x="28" y="36" width="10" height="5" rx="3"/>
      <rect x="42" y="36" width="10" height="5" rx="3"/>
      <rect x="21" y="46" width="10" height="5" rx="3"/>
      <rect x="35" y="46" width="10" height="5" rx="3"/>
      <rect x="49" y="46" width="10" height="5" rx="3"/>
    </g>
  </svg>`,
};

// Function to create a thermometer (wide top, narrow bottom)
export function getThermometer(temp) {
  const isPositive = temp >= 0;
  const color = isPositive ? '#FFB88C' : '#7EC8E3';

  let clampedTemp = Math.max(-30, Math.min(40, temp));
  const percent = ((clampedTemp + 30) / 70) * 100;
  const fillPercent = Math.max(5, Math.min(95, percent));

  return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <g stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="50" r="10"/>
        <path d="M28 14 L28 42" stroke-width="3.5"/>
        <path d="M36 14 L36 42" stroke-width="3.5"/>
        <path d="M28 14 Q32 10 36 14" stroke-width="2.5"/>
      </g>
      <g fill="${color}">
        <circle cx="32" cy="50" r="8.5"/>
        <rect x="28.5" y="${14 + (95 - fillPercent) * 0.33}" width="7" height="${fillPercent * 0.33}" rx="3.5"/>
      </g>
    </svg>`;
}

// Function to get icon by weather code
export function getWeatherIcon(code, temp) {
  if ([1000].includes(code)) return weatherIcons.sunny;
  if ([1003].includes(code)) return weatherIcons.partlyCloudy;
  if ([1006, 1009].includes(code)) return weatherIcons.cloudy;
  if ([1180, 1183, 1186, 1189, 1192, 1195, 1063, 1072, 1150, 1153, 1168, 1171, 1240].includes(code)) return weatherIcons.rainy;
  if ([1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return weatherIcons.snowy;
  if ([1087, 1273, 1276].includes(code)) return weatherIcons.thunderstorm;
  if ([1030, 1135, 1147].includes(code)) return weatherIcons.foggy;
  return getThermometer(temp);
}