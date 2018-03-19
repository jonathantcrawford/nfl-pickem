import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';

import { Weather } from '../_models/index';


@Injectable()
export class ServerService {


  constructor(private http: HttpClient) { }

  getWeather(zip: string): Observable<Weather> {
    return this.http.get<Weather>('/server/weather/' + zip);
  }



}
