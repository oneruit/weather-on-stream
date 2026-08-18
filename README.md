# Weather Overlay Widget

A minimalistic web widget for displaying weather and local time, designed for OBS, PRISM Live Studio, and streaming setups.

**Quick Start:** [Generate](https://weather-oneru.vercel.app/generate/) a link and paste it into your broadcasting application.

## Features

- Minimalistic design
- Displays current weather conditions
- Shows local time for the selected city
- Auto-updates every 10 minutes
- Customizable via URL parameters
- Easy to add as a browser source in OBS

## URL Parameters

The widget can be customized using GET parameters in the URL:

| Parameter | Description | Default Value | Example |
|-----------|-------------|---------------|---------|
| `q` | Location (city, country, or coordinates) | Korea,Seoul | `q=Moscow,Russia` or `q=55.75,37.62` |
| `lang` | Display language | ru | `lang=en`, `lang=ru`, `lang=uk` |
| `key` | WeatherAPI key (optional) | - | `key=your_api_key_here` |

## Usage Examples

### Basic Widget

https://weather-oneru.vercel.app/?q=New%20York&lang=en

### Widget with Coordinates

https://weather-oneru.vercel.app/?q=40.71916,-73.99738&lang=en

### Widget in Germany

https://weather-oneru.vercel.app/?q=Berlin&lang=de

### Widget with Custom API Key

https://weather-oneru.vercel.app/?q=東京都&lang=ja&key=your_api_key_here

## OBS Installation

1. Open OBS Studio
2. Add a new source: `Browser Source`
3. In the `URL` field, paste the generated link ([generate](https://weather-oneru.vercel.app/generate/))
4. Adjust the size to fit your needs
5. Enable `Refresh browser when scene becomes active` for automatic refreshing
6. Click `OK`

## PRISM Live Installation

1. Open PRISM Live Studio
2. Add a widget → `Web`
3. In the `URL` field, paste the generated link ([generate](https://weather-oneru.vercel.app/generate/))
4. Click Save
5. Add it to your scene
6. Adjust the size to fit your needs

## Technical Details

- **API**: WeatherAPI.com
- **Update Interval**: Every 10 minutes
- **Caching**: 10 minutes (s-maxage=600)

## Compatibility

- OBS Studio
- PRISM Live Studio
- XSplit Broadcaster
- Any web browser
- Mobile devices