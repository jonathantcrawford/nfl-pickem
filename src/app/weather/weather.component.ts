import { Component, Input, OnInit } from '@angular/core';

import { Weather } from '../_models/index';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input()
  weather: Weather;

  constructor() {
  }

  ngOnInit() {
  }

}
