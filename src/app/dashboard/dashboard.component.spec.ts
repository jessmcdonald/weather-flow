import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Units } from '../shared/models/weather.models';
import { WeatherService } from '../shared/weather.service';
import { DashboardComponent } from './dashboard.component';
import { getTestScheduler } from 'jasmine-marbles';
import { mockWeatherObject } from '../testing/mockData';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  @Component({selector: 'wf-location-list-item'})
  class MockLocationListItemComponent {
    @Input() locationName: string;
    @Input() currentTemp: number;
    @Input() tempUnit: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, MockLocationListItemComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [WeatherService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display weather for users current location', fakeAsync(() => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.current-location-loading'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.current-location-list-item'))).toBeTruthy();
  }));

  it('should display weather for default locations', fakeAsync(() => {
    component.locationsList.push(mockWeatherObject);
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.default-location-list-item'))).toBeTruthy();
  }));

  it('should change the units when user changes preference', fakeAsync(() => {
    let active = fixture.debugElement.nativeElement.querySelector('.active');
    expect(active.innerHTML).toContain('metric');
    let button = fixture.debugElement.nativeElement.querySelector('.imperial-btn');
    button.click();
    tick();
    fixture.detectChanges();
    active = fixture.debugElement.nativeElement.querySelector('.active');
    expect(active.innerHTML).toContain('imperial');
  }));

});

