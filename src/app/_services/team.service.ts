import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';

import { Team } from '../_models/index';



@Injectable()
export class TeamService {

  nflteams: Team[];

  conferences = [
    {selectionValue: 'Any', viewSelection: 'Any'},
    {selectionValue: 'AFC', viewSelection: 'AFC'},
    {selectionValue: 'NFC', viewSelection: 'NFC'}
  ];

  divisions = [
    {selectionValue: 'Any', viewSelection: 'Any'},
    {selectionValue: 'East', viewSelection: 'East'},
    {selectionValue: 'West', viewSelection: 'West'},
    {selectionValue: 'North', viewSelection: 'North'},
    {selectionValue: 'South', viewSelection: 'South'}
  ];

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>('./assets/fake-backend.assets/data/teams.json');
  }

  getZipsOfEachTeam(): string[] {
    if (!this.nflteams) { return []; }

    const zipsofeachteam = [];
    this.nflteams.forEach(team => {
      zipsofeachteam.push(team.Stadium.Zip);
    });
    return zipsofeachteam;
  }

  getTeamWithID(id: string): Team {
    return this.nflteams.find(function (nflteam) { return nflteam.ID === id; });
  }


}
