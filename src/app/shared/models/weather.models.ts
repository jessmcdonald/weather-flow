export interface weatherObject {
    name: string,
    feels_like: number,
    humidity: number,
    visibility: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number,
    weather: string,
    weather_description: string,
    sunrise: Date,
    sunset: Date,
  }
  
  export interface basicWeatherObject {
    name: string,
    temp: number,
    weather: string,
  }
  
  export enum Units {
    METRIC = "metric",
    IMPERIAL = "imperial",
  }