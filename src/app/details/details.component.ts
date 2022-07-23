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
    this.weatherService.unitsToDisplay$.subscribe((value) => {
      this.unitsToDisplay = value;
    });
    this.weatherService.tempUnit$.subscribe((value) => {
      this.tempUnit = value;
    });
    this.route.paramMap.subscribe( paramMap => {
      this.selectedLocation = this.weatherService.getWeatherByName((paramMap).get('id'));
    });
  }

  public goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

}
