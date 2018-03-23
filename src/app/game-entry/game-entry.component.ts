import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { GameEntry } from '../_models/index';
import { Team } from '../_models/index';
import { Weather } from '../_models/index';

import { TeamService } from '../_services/index';
import { WeatherService } from '../_services/index';


@Component({
  selector: 'app-game-entry',
  templateUrl: './game-entry.component.html',
  styleUrls: ['./game-entry.component.css']
})
export class GameEntryComponent implements OnInit {

  awayTeamPrediction = 'inactive';
  homeTeamPrediction = 'inactive';
  @Input() gameentry: GameEntry;
  awayTeam: Observable<Team>;
  homeTeam: Observable<Team>;
  weather: Observable<Weather>;


  constructor(
    private teamService: TeamService,
    private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.awayTeam = this.teamService.getTeamWithID(this.gameentry.awayTeam.ID);
    this.homeTeam = this.teamService.getTeamWithID(this.gameentry.homeTeam.ID);
    this.homeTeam
      .subscribe(team => this.weather = this.weatherService.getStadiumWeather(team));
  }


  picked(pick: Team) {
    this.awayTeamPrediction = pick.ID === this.gameentry.awayTeam.ID ? 'winner' : 'loser';
    this.homeTeamPrediction = pick.ID === this.gameentry.homeTeam.ID ? 'winner' : 'loser';
  }


}
