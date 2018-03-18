import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import { GameSeason  } from '../_models/index';
import { GameSeasonService } from '../_services/index';

import { Team  } from '../_models/index';
import { TeamService } from '../_services/index';


import { Weather  } from '../_models/index';
import { WeatherService } from '../_services/index';





@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    selectedWeek = 1;
    selectedConference = 'Any';
    selectedDivision = 'Any';


    constructor(
        private userService: UserService,
        private gameSeasonService: GameSeasonService,
        private teamService: TeamService,
        private weatherService: WeatherService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.gameSeasonService.getGames();

        this.teamService.getTeams()
        .subscribe(
            res => {
                this.teamService.nflteams = res;
                console.log(this.teamService.getZipsOfEachTeam());
                this.weatherService.getWeatherAtLocations(this.teamService.getZipsOfEachTeam());
            },
            err => {
                console.log('Error occured');
            });
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

}

// + week form model
//      + animate selection
//      + resets on page load || new week selection
//      + alert when form submitted || form is invalid
