import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Season } from '../_models/index';



@Injectable()
export class SeasonService {


  constructor(private http: HttpClient) {}


  getSeason(): Observable<Season> {
    return this.http.get<Season>('/api/season');
  }


}
