import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { Team } from '../_models/index';

import { Weather } from '../_models/index';
import { WeatherService } from '../_services/weather.service';



@Injectable()
export class TeamService {


  constructor(
    private http: HttpClient) {

    }

  getAll(): Observable<Array<Team>>  {
      return this.http.get<Array<Team>>('/api/teams');
  }

  getTeamWithID(id: Team['ID']): Observable<Team> {
    return this.getAll()
      .flatMap(teams => teams
        .filter(team => team.ID === id));
  }


}
