import { Component, OnInit, Input} from '@angular/core';



import { GameEntry } from '../_models/index';

import { Team } from '../_models/index';
import { TeamService } from '../_services/index';

import { Weather } from '../_models/index';
import { WeatherService } from '../_services/index';


@Component({
  selector: 'app-game-entry',
  templateUrl: './game-entry.component.html',
  styleUrls: ['./game-entry.component.css']
})
export class GameEntryComponent implements OnInit {


  @Input()
  gameentry: GameEntry;

  awayTeam: Team;
  homeTeam: Team;

  weather: Weather;



  constructor(
    private teamService: TeamService,
    private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.awayTeam = this.teamService.getTeamWithID(this.gameentry.awayTeam.ID);
    this.homeTeam = this.teamService.getTeamWithID(this.gameentry.homeTeam.ID);

    this.weather = this.weatherService.getWeatherAt(this.homeTeam.Stadium.Zip);
  }


}
