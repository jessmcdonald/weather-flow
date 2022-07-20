import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userCurrentLatitude: number|undefined = undefined;
  public userCurrentLongitude: number|undefined = undefined;
  public data$: Observable<any>|undefined = undefined;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.setUsersCurrentLocation();
  }


  public setUsersCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.userCurrentLatitude = position.coords.latitude;
      this.userCurrentLongitude = position.coords.longitude;
      this.data$ = this.weatherService.getWeatherForCoords(this.userCurrentLatitude, this.userCurrentLongitude);
      console.log(this.data$);
    });
  }

}
