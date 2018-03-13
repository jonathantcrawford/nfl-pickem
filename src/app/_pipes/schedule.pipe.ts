import { Pipe, PipeTransform } from '@angular/core';

import { Team  } from '../_models/index';
import { GameSeason, GameEntry } from '../_models/index';


@Pipe({
  name: 'schedulePipe',
  pure: false
})
export class SchedulePipe implements PipeTransform {
  transform(season: GameSeason, teams: Team[], gameentry: GameEntry, team: Team ): GameEntry[] {

    if (!season || !gameentry || !teams || !team) {
        return [];
    }

    // sort through an array of teams
    /*
    teams = teams.filter(t => (
    (team.Conference === t.Conference)
    && (team.Division === t.Division))
    ? true : false);
    */

   Object.keys(gameentry).forEach(property => {
      season.fullgameschedule.gameentry = season.fullgameschedule.gameentry
      .filter(g => ((gameentry[property] === g[property])
      ? true : false));
    });

    console.log(season.fullgameschedule.gameentry);


    Object.keys(team).forEach(property => {
      teams = teams
      .filter(t => ((team[property] === t[property])
      ? true : false));
    });

    console.log(teams);


    return season.fullgameschedule.gameentry;
  }
}


