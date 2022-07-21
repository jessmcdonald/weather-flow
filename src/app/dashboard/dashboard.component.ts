import { Component, OnInit } from '@angular/core';
import { weatherObject, WeatherService } from '../shared/weather.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userCurrentLatitude: number;
  public userCurrentLongitude: number;
  public currentLocationData$: Observable<weatherObject>;
  public locationsList: weatherObject[] = [];

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.setUsersCurrentLocation();
    this.setDefaultLocations();
  }


  public setUsersCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.userCurrentLatitude = position.coords.latitude;
      this.userCurrentLongitude = position.coords.longitude;
      this.currentLocationData$ = this.weatherService.getWeatherForLocation(this.userCurrentLatitude, this.userCurrentLongitude);
    });
  }

  public setDefaultLocations(): void {
    console.log(this.locationsList);
  }
}
