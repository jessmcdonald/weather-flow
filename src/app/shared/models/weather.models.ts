export interface weatherObject {
    name: string,
    feels_like: number,
    feels_like_imp: number,
    humidity: number,
    visibility: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number,
    temp_imp: number,
    temp_max_imp: number,
    temp_min_imp: number,
    weather: string,
    weather_description: string,
    sunrise: Date,
    sunset: Date,
    icon: string,
  }
  
  export enum Units {
    METRIC = "metric",
    IMPERIAL = "imperial",
  }