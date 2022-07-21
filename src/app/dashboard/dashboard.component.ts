import { Component, OnInit } from '@angular/core';
import { Units } from '../shared/models/weather.models';
import { WeatherService } from '../shared/weather.service';

interface basicWeatherObject {
    name: string,
    temp: number,
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public currentLat: number;
  public currentLon: number;
  public currentLocationWeather: basicWeatherObject;
  public locationsList: basicWeatherObject[] = [];
  public UnitsType = Units;
  public tempUnit: string;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.setUsersCurrentLocation();
    this.locationsList = this.weatherService.getDefaultLocationWeather();
    this.tempUnit = this.weatherService.getTempUnitString();
  }


  public setUsersCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLat = position.coords.latitude;
      this.currentLon = position.coords.longitude;
      this.setCurrentWeather();
    });
  }

  public setCurrentWeather(): void {
    this.weatherService.getBasicWeatherForLocation(this.currentLat, this.currentLon).subscribe(currentLocationObject => this.currentLocationWeather = currentLocationObject);
  }

  public setUnitsToDisplay(units: Units): void {
    this.weatherService.setUnitsToDisplay(units);
    this.setCurrentWeather();
    this.weatherService.setDefaultLocationWeather();
  }
}
