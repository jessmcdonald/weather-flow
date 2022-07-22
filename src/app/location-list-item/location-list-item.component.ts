import { Component, Input} from '@angular/core';

@Component({
  selector: 'wf-location-list-item',
  templateUrl: './location-list-item.component.html',
  styleUrls: ['./location-list-item.component.scss']
})
export class LocationListItemComponent {

  @Input() locationName: string;
  @Input() currentTemp: number;
  @Input() tempUnit: string;

  constructor() { }

}
