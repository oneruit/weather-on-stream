export default async function handler(req, res) {
  // Get query parameters: location query, language, and optional custom API key
  const q = req.query.q || "Корея,Сеул";
  const lang = req.query.lang || "ru";
  const customKey = req.query.key;

  // Use provided key or fall back to environment variable
  const apiKey = customKey || process.env.WEATHER_KEY;

  // Construct the WeatherAPI URL with all parameters
  const url =
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}&lang=${lang}`;

  try {
    // Fetch weather data from the external API
    const r = await fetch(url);

    // If the response is not OK, return fallback data
    if (!r.ok) {
      return res.status(200).json(getFallbackData(q));
    }

    // Parse the JSON response
    const data = await r.json();

    // Validate that the response contains required fields
    if (!data?.current?.condition?.code || !data?.location?.tz_id) {
      return res.status(200).json(getFallbackData(q));
    }

    // Cache the response for 10 minutes (600 seconds)
    res.setHeader("Cache-Control", "s-maxage=600");
    res.status(200).json(data);
  } catch (e) {
    // Log any errors and return fallback data
    console.log("Weather API error:", e.message);
    res.status(200).json(getFallbackData(q));
  }
}

// Fallback function that returns mock data when the API fails
function getFallbackData(query) {
  const now = new Date();
  const tz = "Europe/Moscow"; // Could be determined dynamically based on the query

  return {
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
    },
    is_fallback: true // Flag to indicate this is fallback data
  };
}