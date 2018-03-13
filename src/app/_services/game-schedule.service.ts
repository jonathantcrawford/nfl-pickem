import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';

import { GameSeason } from '../_models/index';


@Injectable()
export class GameSeasonService {
  constructor(private http: HttpClient) { }


  getGames() {
    return this.http.get<GameSeason>('./assets/fake-backend.assets/data/2016_full_game_schedule.json');
  }


}
