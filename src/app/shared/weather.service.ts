import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { basicWeatherObject, Units, weatherObject } from './models/weather.models';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private unitsToDisplay: Units = Units.METRIC;
  private defaultLocationsWeather: basicWeatherObject[] = [];
  private defaultLocations = ['Berlin', 'London', 'Hong Kong'];

  constructor(
    private http: HttpClient
  ) {
    this.setDefaultLocationWeather();
   }

  public getWeatherForLocation(lat?: number, lon?: number, city?: string): Observable<weatherObject>{
    const baseUrlPath: string = "https://api.openweathermap.org/data/2.5/weather";
    const openWeatherApiKey: string = '23a52deef379e7d6bca0f7b3239f7a3b'; // TODO move this to somewhere secure
    let params = new HttpParams()
      .set('units', this.unitsToDisplay) // TODO allow user to choose units
      .set('appid', openWeatherApiKey);;
    if(lat && lon) {
      params = params.append('lat', lat).append('lon', lon)
    } else if (city) {
      params = params.append('q', city)
    }

    return this.http.get<any>(baseUrlPath, {params}).pipe(
      map(
        response => ({
          name: response.name,
          feels_like: response.main.feels_like.toFixed(0),
          humidity: response.main.humidity,
          visibility: response.visibility / 1000,
          pressure: response.main.pressure,
          temp: response.main.temp.toFixed(0),
          temp_max: response.main.temp_max.toFixed(0),
          temp_min: response.main.temp_min.toFixed(0),
          weather: response.weather[0].main,
          weather_description: response.weather[0].description,
          sunrise: new Date(response.sys.sunrise * 1000),
          sunset: new Date(response.sys.sunset * 1000),
        } as weatherObject)
      )
    )
  }

  public getBasicWeatherForLocation(lat?: number, lon?: number, city?: string): Observable<basicWeatherObject> {
    const baseUrlPath: string = "https://api.openweathermap.org/data/2.5/weather";
    const openWeatherApiKey: string = '23a52deef379e7d6bca0f7b3239f7a3b'; // TODO move this to somewhere secure
    let params = new HttpParams()
      .set('units', this.unitsToDisplay)
      .set('appid', openWeatherApiKey);;
    if(lat && lon) {
      params = params.append('lat', lat).append('lon', lon)
    } else if (city) {
      params = params.append('q', city)
    }

    return this.http.get<any>(baseUrlPath, {params}).pipe(
      map(
        response => ({
          name: response.name,
          temp: response.main.temp.toFixed(0),
          weather: response.weather[0].main,
        } as basicWeatherObject)
      )
    )
  }

  public setUnitsToDisplay(units: Units): void {
    this.unitsToDisplay = units;
  }

  public getUnitsToDisplay(): Units {
    return this.unitsToDisplay;
  }

  public setDefaultLocationWeather(): void {
    for(let i = 0; i < this.defaultLocations.length; i++) {
      this.getBasicWeatherForLocation(undefined, undefined, this.defaultLocations[i]).subscribe(basicWeather => this.defaultLocationsWeather.push(basicWeather));
    }
  }

  public getDefaultLocationWeather(): basicWeatherObject[] {
    return this.defaultLocationsWeather;
  }

  public getTempUnitString(): string {
    switch(this.unitsToDisplay) {
      case Units.METRIC:
        return "°C"
        break;
      case Units.IMPERIAL:
        return "°F"
        break;
    } 
  }
}
