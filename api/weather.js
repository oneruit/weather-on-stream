export default async function handler(req, res) {

  const q = req.query.q || "Корея,Сеул";
  const lang = req.query.lang || "ru";
  const customKey = req.query.key;
  
  // Используем переданный ключ или ключ из переменных окружения
  const apiKey = customKey || process.env.WEATHER_KEY;

  const url =
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}&lang=${lang}`;

  try {
    const r = await fetch(url);
    if (!r.ok) {
      return res.status(200).json(getFallbackData(q));
    }

    const data = await r.json();
    if (!data?.current?.condition?.code || !data?.location?.tz_id) {
      return res.status(200).json(getFallbackData(q));
    }

    res.setHeader("Cache-Control", "s-maxage=600");
    res.status(200).json(data);
  } catch (e) {
    console.log("Weather API error:", e.message);
    res.status(200).json(getFallbackData(q));
  }
}

// Функция заглушки
function getFallbackData(query) {
  const now = new Date();
  const tz = "Europe/Moscow"; // или определите по запросу
  
  return {
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
}