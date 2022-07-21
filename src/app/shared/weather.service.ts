import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

// would move this to a seperate shared folder for models, since its such a small project it can stay here
export interface weatherObject {
  name: string,
  feels_like: number,
  humidity: number,
  pressure: number,
  temp: number,
  temp_max: number,
  temp_min: number,
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
  ) { }

  public getWeatherForLocation(lat?: number, lon?: number, city?: string): Observable<weatherObject> {
    const baseUrlPath: string = "https://api.openweathermap.org/data/2.5/weather";
    const openWeatherApiKey: string = '23a52deef379e7d6bca0f7b3239f7a3b'; // TODO move this to somewhere secure
    let params = new HttpParams()
      .set('units', 'metric') // TODO allow user to choose units
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
            feels_like: response.main.feels_like,
            humidity: response.main.humidity,
            pressure: response.main.pressure,
            temp: response.main.temp,
            temp_max: response.main.temp_max,
            temp_min: response.main.temp_min,
          } as weatherObject)
        )
      )
  }
}
