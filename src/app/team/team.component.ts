import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Team } from '../_models/index';



@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input()
  team: Team;


  @Output() picked = new EventEmitter();


  constructor() {

  }

  ngOnInit() {
  }


  pick() {
    this.picked.emit(this.team);
  }

}
