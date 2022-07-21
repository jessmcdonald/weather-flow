import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'location-list-item',
  templateUrl: './location-list-item.component.html',
  styleUrls: ['./location-list-item.component.scss']
})
export class LocationListItemComponent implements OnInit {

  @Input() locationName: string;
  @Input() currentTemp: number;
  @Input() tempUnit: string;

  constructor() { }

  ngOnInit(): void {
  }

}
