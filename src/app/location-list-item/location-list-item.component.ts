import { Component, Input} from '@angular/core';
import { UnitTypes } from '../shared/models/weather.models';

@Component({
  selector: 'wf-location-list-item',
  templateUrl: './location-list-item.component.html',
  styleUrls: ['./location-list-item.component.scss']
})
export class LocationListItemComponent {

  @Input() locationName: string;
  @Input() currentTemp: number;
  @Input() currentTempImp: number;
  @Input() tempUnit: UnitTypes;
  @Input() icon: string;
  @Input() weather: string;

  public UnitTypes = UnitTypes;

  constructor() {}

}
