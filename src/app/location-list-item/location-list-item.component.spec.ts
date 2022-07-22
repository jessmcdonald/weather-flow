import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { LocationListItemComponent } from './location-list-item.component';

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
