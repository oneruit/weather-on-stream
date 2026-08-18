// main.js
import { inject } from '@vercel/analytics';
import './style.css';
import { getWeatherIcon } from './icons.js';

inject({
  mode: 'production', // 'development', 'production'
  debug: false // true for debug
});

// Get parameters from URL
const params = new URLSearchParams(window.location.search);
const query = params.get("q") || "Корея,Сеул";
const lang = params.get("lang") || "ru";

// Weather display element
const el = document.getElementById("weather");

// State
let currentData = null;
let currentTz = null;
let isFading = false;

// Get time with timezone
function getTimeParts() {
  if (!currentTz) return null;

  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: currentTz
  }).formatToParts(new Date());

  const map = {};
  parts.forEach(p => map[p.type] = p.value);

  return map;
}

// Main render function
function render() {
  if (!currentData || !currentTz) return;

  const t = getTimeParts();
  if (!t) return;

  const sec = parseInt(t.second, 10);
  const temp = Math.floor(currentData.current.temp_c);
  const conditionText = currentData.current.condition.text;
  const locationName = currentData.location.name;
  const countryName = currentData.location.country;
  const conditionCode = currentData.current.condition.code;
  const iconHtml = getWeatherIcon(conditionCode, temp);

  // Debug logs
  console.debug('[Weather Debug]', {
    temp,
    conditionText,
    locationName,
    countryName,
    conditionCode
  });

  // Determine temperature class
  const tempClass = temp >= 0 ? 'positive' : 'negative';

  // Build HTML
  el.innerHTML = `
    <div class="weather-icon">${iconHtml}</div>
    
    <div class="temperature ${tempClass}">${temp}°C</div>
    
    <div class="info-divider">
      <div class="info-column">
        <div class="place">${locationName}, ${countryName}</div>
        <div class="condition">${conditionText}</div>
      </div>
      <div class="info-column time-column">
        <div class="time">
          <span>${t.hour}</span><span id="colon">:</span><span>${t.minute}</span>
        </div>
      </div>
    </div>
  `;

  // Colon animation on 59th second
  if (sec === 59 && !isFading) {
    isFading = true;
    const colonEl = document.getElementById("colon");

    if (colonEl) {
      setTimeout(() => {
        colonEl.classList.add("fade");
        setTimeout(() => {
          colonEl.classList.remove("fade");
          isFading = false;
        }, 500);
      }, 500);
    } else {
      isFading = false;
    }
  }
}

// Local fallback
function useLocalFallback() {
  console.log('[Weather] Using fallback data');
  currentData = {
    location: {
      name: "City",
      country: "Country",
      tz_id: "Europe/Moscow"
    },
    current: {
      temp_c: 0,
      condition: {
        code: 1000,
        text: "Data unavailable"
      }
    }
  };
  currentTz = currentData.location.tz_id;
  render();
}

// Load weather data
async function loadWeather() {
  try {
    const response = await fetch(`/api/weather?q=${query}&lang=${lang}`);

    if (!response.ok) {
      console.log('[Weather] Fetch failed:', response.status);
      useLocalFallback();
      return;
    }

    const data = await response.json();

    if (!data?.current?.condition?.code || !data?.location?.tz_id) {
      console.log('[Weather] Invalid response:', data);
      useLocalFallback();
      return;
    }

    currentData = data;
    currentTz = data.location.tz_id;
    render();

  } catch (error) {
    console.log('[Weather] Error:', error);
    useLocalFallback();
  }
}

// Start clock with second sync
function startClock() {
  const delay = 1000 - new Date().getMilliseconds();

  setTimeout(() => {
    render();
    setInterval(render, 1000);
  }, delay);
}

// Init
startClock();
loadWeather().catch(error => console.log('[Weather] Init error:', error));

// Update weather every minute
setInterval(loadWeather, 60000);