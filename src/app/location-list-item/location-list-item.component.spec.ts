import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { getTestScheduler } from 'jasmine-marbles';
import { LocationListItemComponent } from './location-list-item.component';
import { UnitTypes } from '../shared/models/weather.models';
import { mockWeatherObject } from '../testing/mockData';

describe('LocationListItemComponent', () => {
  let component: LocationListItemComponent;
  let fixture: ComponentFixture<LocationListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationListItemComponent ],
      imports: [RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationListItemComponent);
    component = fixture.componentInstance;
    component.tempUnit = UnitTypes.metric;
    component.location = mockWeatherObject;
    fixture.detectChanges();
  });

  it('should initialise list item', () => {
    expect(component).toBeTruthy();
  });

  it('should display location name', () => {
    expect(fixture.debugElement.query(By.css('.list-item--location'))).toBeTruthy();
  })

  it('should display current temperature', () => {
    expect(fixture.debugElement.query(By.css('.list-item--temp'))).toBeTruthy();
  })
});
