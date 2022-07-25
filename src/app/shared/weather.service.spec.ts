import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { Data } from '@angular/router';
import { mockWeatherObject } from '../testing/mockData';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpController: HttpTestingController;
  let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=23a52deef379e7d6bca0f7b3239f7a3b';
  let httpClient: HttpClient;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetchWeatherForLocation and return weather object', () => {
    const city = 'Barcelona';

    service.fetchWeatherForLocation(undefined, undefined, city).subscribe((res) => {
      expect(res).toEqual(mockWeatherObject);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}&q=${city}`,
    });
    req.flush(mockWeatherObject);
  });

});
