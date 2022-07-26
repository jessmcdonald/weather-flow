import { Component, Input} from '@angular/core';
import { UnitTypes, weatherObject } from '../shared/models/weather.models';

@Component({
  selector: 'wf-location-list-item',
  templateUrl: './location-list-item.component.html',
  styleUrls: ['./location-list-item.component.scss']
})
export class LocationListItemComponent {
  @Input() location: weatherObject;
  @Input() tempUnit: UnitTypes;
  @Input() icon: string;
  @Input() weather: string;
  @Input() currentLocation: boolean;

  public UnitTypes = UnitTypes;

  constructor() {}

}
