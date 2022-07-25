import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { weatherObject, Units, UnitTypes } from '../shared/models/weather.models';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'wf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, DoCheck, OnDestroy {

  public currentLat: number;
  public currentLon: number;
  public currentLocationWeather: weatherObject;
  public locationsList: weatherObject[] = [];
  public UnitsType = Units;
  public tempUnit: UnitTypes;
  public unitToDisplay: Units;
  public locationError: string;
  public notifier = new Subject<void>();

  constructor(
    private weatherService: WeatherService
  ) {}

  public ngOnInit(): void {
    this.setCurrentWeather();
    this.getUnits();
    this.locationsList = this.weatherService.getDefaultLocationWeather();
  }

  public ngDoCheck(): void {
    this.setCurrentWeather();
  }

  public ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

  public getUnits(): void {
    this.weatherService.displayUnits$.pipe(takeUntil(this.notifier)).subscribe((value) => {
      this.tempUnit = value;
      this.unitToDisplay = value.value;
    });
  }

  public setCurrentWeather(): void {
    this.currentLocationWeather = this.weatherService.getCurrentLocationWeather();
    if(!this.currentLocationWeather) {
      this.locationError = this.weatherService.getLocationError();
    }
  }

  public setUnitsToDisplay(units: Units): void {
    this.weatherService.setUnitsToDisplay(UnitTypes[units]);
  }
}
