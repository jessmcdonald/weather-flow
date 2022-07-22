import { ComponentFixture, TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DetailsComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WeatherService } from '../shared/weather.service';
import { Units } from '../shared/models/weather.models';
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
  }
};

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: WeatherService, useValue: weatherServiceStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should initialise details', () => {
    expect(component).toBeTruthy();
  });

  it('should display all temperature info', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.detail--temp'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.detail--feelslike'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.detail--hitemp'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.detail--lotemp'))).toBeTruthy();
  });

  it('should navigate back to dashboard when button clicked', fakeAsync(() => {
    spyOn(component, 'goToDashboard');
    let button = fixture.debugElement.nativeElement.querySelector('.back-btn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.goToDashboard).toHaveBeenCalled();
  }));
});
