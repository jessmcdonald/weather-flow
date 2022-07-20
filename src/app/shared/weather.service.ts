import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
  ) { }

  public getWeatherForCoords(lat: number, lon: number): Observable<any> {
    const baseUrlPath: string = "https://api.openweathermap.org/data/3.0/onecall";
    const openWeatherApiKey: string = '23a52deef379e7d6bca0f7b3239f7a3b'; // TODO move this to somewhere secure

    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', openWeatherApiKey);
    
    
    console.log(`${baseUrlPath}?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`);


    return this.http.get(baseUrlPath, {params});

  }
}
