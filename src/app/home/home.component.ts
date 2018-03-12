import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import { Team  } from '../_models/index';
import { TeamService } from '../_services/index';


import { GameSchedule  } from '../_models/index';
import { GameScheduleService } from '../_services/index';



@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    teams: Team[];
    games: GameSchedule;


    constructor(
        private userService: UserService,
        private teamService: TeamService,
        private gameScheduleService: GameScheduleService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadTeams();
        this.loadGames();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    loadTeams() {
        this.teamService.getTeams()
        .subscribe(
            res => {
              this.teams = res;
            },
            err => {
              console.log('Error occured');
            });
    }

    loadGames() {
        this.gameScheduleService.getGames()
        .subscribe(
            res => {
              this.games = res;
            },
            err => {
              console.log('Error occured');
            });
    }

}
