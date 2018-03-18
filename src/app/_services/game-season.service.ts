import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';

import { GameSeason } from '../_models/index';


@Injectable()
export class GameSeasonService {

  season: GameSeason;
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

  constructor(private http: HttpClient) { }

  getGames() {
    this.http.get<GameSeason>('./assets/fake-backend.assets/data/2016_full_game_schedule.json')
    .subscribe(
        res => {
          this.season = res;
        },
        err => {
          console.log('Error occured');
    });
  }


}
