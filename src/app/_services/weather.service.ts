import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';

import { Weather } from '../_models/index';



@Injectable()
export class WeatherService {

  weatherlocations:  Weather[] = [];

  constructor(private http: HttpClient) { }


  getWeatherAtLocations(zips: string[]) {
    zips.forEach(zip => {
      this.http.get<Weather>('/api/weather/' + zip)
      .subscribe(
        res => {
          this.weatherlocations[zip] = res;
        },
        err => {
          console.log('Error occured');
      });

    });

  }

  getWeatherAt(zip: string): Weather {
    return this.weatherlocations[zip];
  }


}
