import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Units, UnitTypes, weatherObject } from './models/weather.models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private currentLocationWeather: weatherObject;
  private defaultLocationsWeather: weatherObject[] = [];
  private defaultLocations = ['Berlin', 'London', 'Hong Kong'];
  private currentLat: number;
  private currentLon: number;
  private locationError: string;
  readonly displayUnits$ = new BehaviorSubject<UnitTypes>(UnitTypes.metric);

  constructor(
    private http: HttpClient
  ) {
    this.setUsersCurrentLocation();
    this.setDefaultLocationWeather();
   }

  public fetchWeatherForLocation(lat?: number, lon?: number, city?: string): Observable<any>{
    const baseUrlPath: string = "https://api.openweathermap.org/data/2.5/weather";
    const openWeatherApiKey: string = '23a52deef379e7d6bca0f7b3239f7a3b'; // TODO move this to somewhere secure
    let params = new HttpParams()
      .set('units', Units.METRIC)
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
          feels_like_imp: this.toFarenheit(response.main.feels_like.toFixed(0)),
          humidity: response.main.humidity,
          visibility: response.visibility / 1000,
          pressure: response.main.pressure,
          temp: response.main.temp.toFixed(0),
          temp_max: response.main.temp_max.toFixed(0),
          temp_min: response.main.temp_min.toFixed(0),
          temp_imp: this.toFarenheit(response.main.temp.toFixed(0)),
          temp_max_imp: this.toFarenheit(response.main.temp_max.toFixed(0)),
          temp_min_imp: this.toFarenheit(response.main.temp_min.toFixed(0)),
          weather: response.weather[0].main,
          weather_description: response.weather[0].description,
          icon: response.weather[0].icon,
          sunrise: this.getCorrectTimeToDisplay(response.sys.sunrise, response.timezone),
          sunset: this.getCorrectTimeToDisplay(response.sys.sunset, response.timezone),
        } as weatherObject)
      ),
      catchError((error) => {
        this.locationError = error.message;
        return throwError(() => new Error(error.message));
      })
    )
  }

  public setUnitsToDisplay(units: UnitTypes): void {
    this.displayUnits$.next(units);
  }

  public setDefaultLocationWeather(): void {
    this.defaultLocationsWeather = [];
    this.defaultLocations.forEach(location => 
      this.fetchWeatherForLocation(undefined, undefined, location).subscribe(basicWeather => this.defaultLocationsWeather.push(basicWeather))
    );
  }

  public getDefaultLocationWeather(): weatherObject[] {
    return this.defaultLocationsWeather;
  }

  public setUsersCurrentLocation(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLon = position.coords.longitude;
        this.setCurrentLocationWeather();
      },
      (error) => {
        console.log(error.code);
        switch(error.code) {
          case 1:
            this.locationError = "You chose not to share your location, hope the weather is nice wherever you are!";
            break;
          case 3:
            this.locationError = "Sorry! geolocation timed out, we could not locate you"
            break;
          case 2:
          default:
            this.locationError = "Sorry! Geolocation failed or the network cannot be reached"
            break;
          }
      }, options);

    } else {
      this.locationError = "Sorry! Your browser does not support geolocation"
    }
  }

  public setCurrentLocationWeather(): void {
    this.fetchWeatherForLocation(this.currentLat, this.currentLon).subscribe(currentLocationObject => {
      this.currentLocationWeather = currentLocationObject;
    });
  }

  public getCurrentLocationWeather(): weatherObject {
    return this.currentLocationWeather;
  }

  public getWeatherByName(name: string): weatherObject | undefined {
    if(this.defaultLocationsWeather.find(item => item.name === name)) {
      return this.defaultLocationsWeather.find(item => item.name === name);
    } else {
      if(this.currentLocationWeather) {
        if(this.currentLocationWeather.name === name) {
          return this.currentLocationWeather;
        }
      }
    }
    return;
  }

  public getLocationError(): string {
    return this.locationError;
  }

  public getCorrectTimeToDisplay(time: number, timezone: number): Date {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const returnDate = new Date((time + timezone) * 1000)
    return this.addOffset(offset / 60, returnDate);
  }

  public addOffset(numOfHours: number, date = new Date()): Date {
    date.setHours(date.getHours() + numOfHours);
    console.log(date, 'new one');
    return date;
  }

  public toFarenheit(celcius: number): number {
    return celcius * 9 / 5 + 32;
  }

}
