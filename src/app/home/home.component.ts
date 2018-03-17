import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import { Team  } from '../_models/index';
import { TeamService } from '../_services/index';

import { GameSeason  } from '../_models/index';
import { GameSeasonService } from '../_services/index';




@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    season: GameSeason;

    selectedWeek = 1;
    weeks = [
        {selectionValue: 1, viewSelection: 'Week 1'},
        {selectionValue: 2, viewSelection: 'Week 2'},
        {selectionValue: 3, viewSelection: 'Week 3'},
        {selectionValue: 4, viewSelection: 'Week 4'},
        {selectionValue: 5, viewSelection: 'Week 5'},
        {selectionValue: 6, viewSelection: 'Week 6'},
        {selectionValue: 7, viewSelection: 'Week 7'},
        {selectionValue: 8, viewSelection: 'Week 8'},
        {selectionValue: 9, viewSelection: 'Week 9'},
        {selectionValue: 10, viewSelection: 'Week 10'},
        {selectionValue: 11, viewSelection: 'Week 11'},
        {selectionValue: 12, viewSelection: 'Week 12'},
        {selectionValue: 13, viewSelection: 'Week 13'},
        {selectionValue: 14, viewSelection: 'Week 14'},
        {selectionValue: 15, viewSelection: 'Week 15'},
        {selectionValue: 16, viewSelection: 'Week 16'},
        {selectionValue: 17, viewSelection: 'Week 17'}
      ];

      selectedConference = 'Any';
      conferences = [
        {selectionValue: 'Any', viewSelection: 'Any'},
        {selectionValue: 'AFC', viewSelection: 'AFC'},
        {selectionValue: 'NFC', viewSelection: 'NFC'}
      ];

      selectedDivision = 'Any';
      divisions = [
        {selectionValue: 'Any', viewSelection: 'Any'},
        {selectionValue: 'East', viewSelection: 'East'},
        {selectionValue: 'West', viewSelection: 'West'},
        {selectionValue: 'North', viewSelection: 'North'},
        {selectionValue: 'South', viewSelection: 'South'}
      ];


    constructor(
        private userService: UserService,
        private teamService: TeamService,
        private gameScheduleService: GameSeasonService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadGames();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    loadGames() {
        this.gameScheduleService.getGames()
        .subscribe(
            res => {
              this.season = res;
            },
            err => {
              console.log('Error occured');
            });
    }

}

// + week form model
//      + displays team info
//      + displays team logos
//      + displays weather info
//      + animate selection
//      + resets on page load || new week selection
//      + alert when form submitted || form is invalid

// + retrieve weather data save it to back end
//      + getWeather using weather service
