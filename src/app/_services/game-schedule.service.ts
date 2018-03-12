import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';

import { GameSchedule } from '../_models/index';


@Injectable()
export class GameScheduleService {
  constructor(private http: HttpClient) { }


  getGames() {
    return this.http.get<GameSchedule>('./assets/fake-backend.assets/data/2016_full_game_schedule.json');
  }


}
