import { Component, DoCheck, OnInit } from '@angular/core';
import { weatherObject, Units } from '../shared/models/weather.models';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'wf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, DoCheck {

  public currentLat: number;
  public currentLon: number;
  public currentLocationWeather: weatherObject;
  public locationsList: weatherObject[] = [];
  public UnitsType = Units;
  public tempUnit: string;

  constructor(
    private weatherService: WeatherService
  ) {}

  public ngOnInit(): void {
    this.setCurrentWeather();
    this.locationsList = this.weatherService.getDefaultLocationWeather();
    this.tempUnit = this.weatherService.getTempUnitString();
  }

  public ngDoCheck(): void {
    this.setCurrentWeather();
  }

  public setCurrentWeather(): void {
    this.currentLocationWeather = this.weatherService.getCurrentLocationWeather();
  }

  public setUnitsToDisplay(units: Units): void {
    this.weatherService.setUnitsToDisplay(units);
    this.setCurrentWeather();
    this.weatherService.setDefaultLocationWeather();
  }
}
