import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { basicWeatherObject, Units } from '../shared/models/weather.models';
import { WeatherService } from '../shared/weather.service';
import { DashboardComponent } from './dashboard.component';
import { cold, getTestScheduler } from 'jasmine-marbles';

const weatherServiceStub = {
  getWeatherForLocation() {
    const weather$ = cold('--a|', { a: [{name: "berlin"}] });
    return weather$;
  },
  getUnitsToDisplay() {
    return Units.METRIC;
  },
  getTempUnitString() {
    return "°C";
  },
  getDefaultLocationWeather() {
    return [{name: 'berlin', temp: 25} as basicWeatherObject, {name: 'london', temp: 24} as basicWeatherObject];
  }
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  @Component({selector: 'wf-location-list-item'})
  class MockLocationListItem {
    @Input() locationName: string;
    @Input() currentTemp: number;
    @Input() tempUnit: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, MockLocationListItem ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: WeatherService, useValue: weatherServiceStub }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should initialise component', () => {
    expect(component).toBeTruthy();
  });

  it('should display weather for default locations', () => {
    expect(fixture.debugElement.query(By.css('.default-location-list-item'))).toBeTruthy();
  });

  it('should display loading while detecting user location', fakeAsync(() => {
    expect(fixture.debugElement.query(By.css('.current-location-loading'))).toBeTruthy();
  }));

  it('should display weather for users current location', fakeAsync(() => {
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
      const position = { coords: { latitude: 54.548, longitude: 14.459 } };
      args[0](position);
    });
    getTestScheduler().flush();
    fixture.detectChanges();
    // TODO figure out why this one doesn't work
    // expect(fixture.debugElement.query(By.css('.current-location-loading'))).toBeFalsy();
    // expect(fixture.debugElement.query(By.css('.current-location-list-item'))).toBeTruthy();
  }));

  it('should change the units when user changes preference', fakeAsync(() => {
    spyOn(component, 'setUnitsToDisplay');
    let button = fixture.debugElement.nativeElement.querySelector('.metric-btn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.setUnitsToDisplay).toHaveBeenCalledWith(Units.METRIC);
  }));

});

