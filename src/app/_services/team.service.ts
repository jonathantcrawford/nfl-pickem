import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';

import { Team } from '../_models/index';


@Injectable()
export class TeamService {
  constructor(private http: HttpClient) {
  }

  getTeams() {
    return this.http.get<Team[]>('./assets/fake-backend.assets/data/teams.json');
  }

}
