import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Units, UnitTypes, weatherObject } from '../shared/models/weather.models';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'wf-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public selectedLocation: weatherObject | undefined;
  public UnitsType = Units;
  public unitsToDisplay: UnitTypes;
  public tempUnit: Units;
  public notifier = new Subject<void>();
  public UnitTypes = UnitTypes;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    this.getUnits();
    this.route.paramMap.pipe(takeUntil(this.notifier)).subscribe( paramMap => {
      this.selectedLocation = this.weatherService.getWeatherByName((paramMap).get('id'));
    });
  }

  public getUnits(): void {
    this.weatherService.displayUnits$.pipe(takeUntil(this.notifier)).subscribe((value) => {
      this.tempUnit = value.value;
      this.unitsToDisplay = value;
    });
  }

  public goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

}
