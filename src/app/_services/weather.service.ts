import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';

import { Team } from '../_models/index';
import { Weather } from '../_models/index';


@Injectable()
export class WeatherService {


  constructor(private http: HttpClient) { }


  getStadiumWeather(team: Team): Observable<Weather> {
    return this.http.get<Weather>('/api/weather/' + team.Stadium.Zip);
  }

}
