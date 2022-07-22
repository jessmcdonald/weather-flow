import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Units, weatherObject } from '../shared/models/weather.models';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'wf-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public selectedLocation$: Observable<any>;
  public selectedLocation: weatherObject;
  public UnitsType = Units;
  public unitsToDisplay: Units;
  public tempUnit: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    this.setUnitsToDisplay();
    this.route.paramMap.subscribe( paramMap => {
      this.selectedLocation = this.weatherService.getWeatherByName((paramMap).get('id'));
    });
  }

  public setUnitsToDisplay(): void {
    this.unitsToDisplay = this.weatherService.getUnitsToDisplay();
    this.tempUnit = this.weatherService.getTempUnitString();
  }

  public goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

}
