import { Component, OnInit, Input} from '@angular/core';

import { Team } from '../_models/index';
import { TeamService } from '../_services/index';

import { GameEntry } from '../_models/index';


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



  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
    this.awayTeam = this.teamService.getTeamFromID(this.gameentry.awayTeam.ID);
    this.homeTeam = this.teamService.getTeamFromID(this.gameentry.homeTeam.ID);
  }


}
