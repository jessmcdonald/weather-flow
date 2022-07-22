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
  // let basicUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=23a52deef379e7d6bca0f7b3239f7a3b&q=Berlin';
  let httpClient: HttpClient;
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;
  // let weatherService: WeatherService;
  
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherService);
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // weatherService = new WeatherService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getWeatherForLocation and return weather object', () => {
    const city = 'Barcelona';

    service.getWeatherForLocation(undefined, undefined, city).subscribe((res) => {
      expect(res).toEqual(mockWeatherObject);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}&q=${city}`,
    });
    req.flush(mockWeatherObject);
  });

  it('should return expected weather info', () => {
    const testData: Data = mockWeatherObject;
    const testUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=23a52deef379e7d6bca0f7b3239f7a3b&lat=52.5481266&lon=13.4592726"
  
    httpClient.get<Data>(testUrl)
      .subscribe(data => {
        expect(data).toEqual(testData)
      });
      const req = httpController.expectOne(testUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
  });
});
