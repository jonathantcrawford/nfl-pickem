import { Component, Input, OnInit, Pipe, PipeTransform  } from '@angular/core';

import { Weather } from '../_models/index';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input() weather: Weather;

  constructor() {
  }

  ngOnInit() {
  }

}

@Pipe({
  name: 'tempConvert'
})
// The work of the pipe is handled in the tranform method with our pipe's class
export class TempConvertPipe implements PipeTransform {
  transform(value: number, args: any[]) {
    if ( value && !isNaN(value) && args[0] === 'f') {
      const temp = (9 / 5) * (value - 273) + 32;
      const places = args[1];
      return temp.toFixed(places) + ' F';
    }

    return;
  }
}
