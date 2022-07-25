import { weatherObject } from "../shared/models/weather.models";

export const mockWeatherObject: weatherObject = { 
    name: 'barcelona', 
    temp: 28, 
    temp_imp: 92,
    feels_like: 28, 
    feels_like_imp: 92,
    humidity: 45, 
    visibility: 1000, 
    pressure: 50,
    temp_max: 29,
    temp_min: 25,
    temp_min_imp: 87,
    temp_max_imp: 95,
    weather: 'cloudy',
    icon: '02d',
    weather_description: 'super cloudy',
    sunrise: new Date('2022-07-22T05:24:00'),
    sunset: new Date('2022-07-22T20:35:00'),
  };