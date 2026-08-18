import { getWeatherIcon, getThermometer } from './icons.js';

// Получение параметров из URL
const params = new URLSearchParams(window.location.search);
const query = params.get("q") || "Корея,Сеул";
const lang = params.get("lang") || "ru";

// Элемент для отображения погоды
const el = document.getElementById("weather");

// Состояние
let currentData = null;
let currentTz = null;
let isFading = false;

// Получение времени с учетом часового пояса
function getTimeParts() {
  if (!currentTz) return null;

  const parts = new Intl.DateTimeFormat("ru-RU", {
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

// Основная функция рендеринга
function render() {
  if (!currentData || !currentTz) return;

  const t = getTimeParts();
  if (!t) return;

  const sec = parseInt(t.second, 10);
  const temp = Math.floor(currentData.current.temp_c);
  const conditionText = currentData.current.condition.text;
  const locationName = currentData.location.name;
  const countryName = currentData.location.country;
  const isFallback = currentData.is_fallback || false;
  const iconHtml = getWeatherIcon(currentData.current.condition.code, temp);
  // Определяем класс для температуры
  const tempClass = temp >= 0 ? 'positive' : 'negative';
  
  // Формируем HTML
  el.innerHTML = `
    <div class="weather-icon">${iconHtml}</div>
    
    <div class="temperature ${tempClass}">${temp}°C</div>
    
    <div class="info-divider">
      <div class="info-column">
        <div class="place">${locationName}, ${countryName}</div>
        <div class="condition">${conditionText}</div>
      </div>
      <div class="info-column">
        <div class="time">
          <span>${t.hour}</span><span id="colon">:</span><span>${t.minute}</span>
        </div>
      </div>
    </div>
  `;

  // Анимация двоеточия на 59-й секунде
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

// Локальная заглушка
function useLocalFallback() {
  currentData = {
    location: {
      name: "Город",
      country: "Страна",
      tz_id: "Europe/Moscow"
    },
    current: {
      temp_c: 0,
      condition: {
        code: 1000,
        text: "Данные недоступны"
      }
    },
    is_fallback: true
  };
  currentTz = currentData.location.tz_id;
  render();
}

// Загрузка данных о погоде
async function loadWeather() {
  try {
    const r = await fetch(`/api/weather?q=${query}&lang=${lang}`);

    if (!r.ok) {
      console.log("weather fetch failed:", r.status);
      useLocalFallback();
      return;
    }

    const d = await r.json();

    if (!d?.current?.condition?.code || !d?.location?.tz_id) {
      console.log("weather invalid response:", d);
      useLocalFallback();
      return;
    }

    currentData = d;
    currentTz = d.location.tz_id;
    render();

  } catch (e) {
    console.log("weather error:", e);
    useLocalFallback();
  }
}

// Запуск часов с синхронизацией по секундам
function startClock() {
  const delay = 1000 - new Date().getMilliseconds();

  setTimeout(() => {
    render();
    setInterval(render, 1000);
  }, delay);
}

// Инициализация
startClock();
loadWeather();

// Обновление погоды каждую минуту
setInterval(loadWeather, 60000);