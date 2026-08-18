// generate/main.js
import './style.css';
import L from 'leaflet';
import { translations } from './translations.js';

// ===== LANGUAGE MANAGEMENT =====
let currentLang = 'en';

// Функция для смены языка
function setLanguage(lang) {
  currentLang = lang;

  // Обновляем текст на странице
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      if (key === 'apiKeyHint') {
        el.innerHTML = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // Обновляем плейсхолдеры
  const locationInput = document.getElementById('location');
  const locationEnInput = document.getElementById('locationEn');
  const apiKeyInput = document.getElementById('apiKey');
  const apiKeyEnInput = document.getElementById('apiKeyEn');

  if (lang === 'ru') {
    locationInput.style.display = 'block';
    if (locationEnInput) locationEnInput.style.display = 'none';
    apiKeyInput.style.display = 'block';
    if (apiKeyEnInput) apiKeyEnInput.style.display = 'none';
    locationInput.placeholder = translations.ru.locationPlaceholder;
    apiKeyInput.placeholder = translations.ru.apiKeyPlaceholder;
  } else {
    locationInput.style.display = 'none';
    if (locationEnInput) locationEnInput.style.display = 'block';
    apiKeyInput.style.display = 'none';
    if (apiKeyEnInput) apiKeyEnInput.style.display = 'block';
    if (locationEnInput) locationEnInput.placeholder = translations.en.locationPlaceholder;
    if (apiKeyEnInput) apiKeyEnInput.placeholder = translations.en.apiKeyPlaceholder;
  }

  // Обновляем активную кнопку
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Обновляем HTML язык
  document.documentElement.lang = lang;

  // Перегенерируем ссылку
  generateLink();
}

// Функция получения значения поля ввода с учетом языка
function getInputValue(id) {
  const ruInput = document.getElementById(id);
  const enInput = document.getElementById(id + 'En');

  if (currentLang === 'ru') {
    return ruInput ? ruInput.value : '';
  } else {
    return enInput ? enInput.value : (ruInput ? ruInput.value : '');
  }
}

// Функция установки значения поля ввода с учетом языка
function setInputValue(id, value) {
  const ruInput = document.getElementById(id);
  const enInput = document.getElementById(id + 'En');

  if (ruInput) ruInput.value = value;
  if (enInput) enInput.value = value;
}

// ===== MAP =====
// Initialize map on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initial coordinates (Moscow)
  const defaultLat = 55.7558;
  const defaultLng = 37.6173;

  const map = L.map('map', {
    attributionControl: false
  }).setView([defaultLat, defaultLng], 10);

  // OpenStreetMap layer without attribution
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
  }).addTo(map);

  // Marker that will move on click
  let marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map);

  // Function to update the input field
  function updateLocationFromCoords(lat, lng) {
    setInputValue('location', `${lat.toFixed(5)},${lng.toFixed(5)}`);
    // Auto-generate link when coordinates change
    generateLink();
  }

  // Update field on map click
  map.on('click', function(e) {
    const { lat, lng } = e.latlng;
    marker.setLatLng([lat, lng]);
    updateLocationFromCoords(lat, lng);
  });

  // Update field when marker is dragged
  marker.on('dragend', function(e) {
    const pos = marker.getLatLng();
    updateLocationFromCoords(pos.lat, pos.lng);
  });

  // If user manually enters coordinates, move the marker
  const locationInputs = [document.getElementById('location'), document.getElementById('locationEn')];
  locationInputs.forEach(input => {
    if (input) {
      input.addEventListener('change', function() {
        const val = getInputValue('location').trim();
        const parts = val.split(',').map(s => parseFloat(s.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          const lat = parts[0];
          const lng = parts[1];
          map.setView([lat, lng], 10);
          marker.setLatLng([lat, lng]);
        }
        generateLink();
      });

      input.addEventListener('input', function() {
        generateLink();
      });
    }
  });

  // Initialize language
  setLanguage('en');

  // Initialize field on load
  updateLocationFromCoords(defaultLat, defaultLng);
});

// ===== LINK GENERATION =====
function generateLink() {
  const location = getInputValue('location') || translations[currentLang].defaultLocation || 'Москва,Россия';
  const lang = document.getElementById('language').value || 'ru';
  const apiKey = getInputValue('apiKey').trim();

  let link = window.location.origin + '?q=' + encodeURIComponent(location) + '&lang=' + lang;

  if (apiKey) {
    link += '&key=' + encodeURIComponent(apiKey);
  }

  const linkElement = document.getElementById('generatedLink');
  if (linkElement) {
    linkElement.href = link;
    linkElement.textContent = link;
  }

  // Ensure the result is visible
  const resultContainer = document.getElementById('resultContainer');
  if (resultContainer) {
    resultContainer.classList.remove('hidden');
  }
}

// ===== COPY LINK =====
function copyLink() {
  const linkElement = document.getElementById('generatedLink');
  if (!linkElement) return;

  const link = linkElement.textContent;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link).then(() => {
      showCopyFeedback(true);
    }).catch(() => {
      fallbackCopy(link);
    });
  } else {
    fallbackCopy(link);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showCopyFeedback(true);
  } catch (err) {
    showCopyFeedback(false);
  }
  document.body.removeChild(textarea);
}

function showCopyFeedback(success) {
  const btn = document.querySelector('.btn-success');
  if (!btn) return;

  const originalText = btn.textContent;
  btn.textContent = success ? translations[currentLang].copied : translations[currentLang].copyError;
  btn.style.backgroundColor = success ? '#4CAF50' : '#f44336';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.backgroundColor = '';
  }, 2000);
}

// ===== AUTO-GENERATE ON PARAMETER CHANGE =====
// Generate when language changes
document.addEventListener('DOMContentLoaded', function() {
  const languageSelect = document.getElementById('language');
  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      generateLink();
    });
  }

  // Generate when API key changes
  const apiKeyInputs = [document.getElementById('apiKey'), document.getElementById('apiKeyEn')];
  apiKeyInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', function() {
        generateLink();
      });
      input.addEventListener('change', function() {
        generateLink();
      });
    }
  });

  // Language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      setLanguage(this.dataset.lang);
    });
  });
});

// Делаем функции глобальными для onclick в HTML
window.generateLink = generateLink;
window.copyLink = copyLink;