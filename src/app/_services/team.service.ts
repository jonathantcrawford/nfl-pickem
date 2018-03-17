import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';

import { Team } from '../_models/index';


@Injectable()
export class TeamService {

  nflteams: Team[];

  constructor(private http: HttpClient) {
    this.getTeams();
  }

  getTeams() {
    this.http.get<Team[]>('./assets/fake-backend.assets/data/teams.json')
    .subscribe(
      res => {
        this.nflteams = res;
      },
      err => {
        console.log('Error occured');
      });
  }

  getTeamFromID(id: string): Team {
    return this.nflteams.find(function (nflteam) { return nflteam.ID === id; });
  }


}
