import { Pipe, PipeTransform } from '@angular/core';

import { Team } from '../_models/index';
import { GameSeason, GameEntry } from '../_models/index';


@Pipe({
  name: 'schedulePipe',
  pure: false
})
export class SchedulePipe implements PipeTransform {
  transform(season: GameSeason, teams: Team[], gameentrySchematic: GameEntry, teamSchematic: Team ): GameEntry[] {
    /***********************************************************************/
    // skip piping ransform parameters fail signature requirements
    if (!season || !teams || !gameentrySchematic || !teamSchematic) { return []; }


    /***********************************************************************/
    // filters out 'GameEntry'
    // by comparing every specification of the (gameEntrySchematic: 'GameEntry') to each 'GameEntry[]' index
    let filteredGameEntries: GameEntry[];
    filteredGameEntries = season.fullgameschedule.gameentry.filter(gamesThatMatch, gameentrySchematic);
    /***********************************************************************/
    function gamesThatMatch (game: GameEntry, i: number, arr: GameEntry[]) {
      let result = true;
      Object.keys(this)
      .forEach(specification => (
        (this[specification].toString() === game[specification].toString()) ? result : result = false ));
      return result;
    } // console.log(filteredGameEntries);


    /***********************************************************************/
    // filters out 'Team'
    // by comparing every specification of the (teamSchematic: 'Team') to each 'Team[]' index
    let filteredTeams: Team[];
    filteredTeams = teams.filter(teamsThatMatch, teamSchematic);
    /***********************************************************************/
    function teamsThatMatch (team: Team, i: number, arr: Team[]) {
      let result = true;
      Object.keys(this)
        .forEach(specification => (
          ((this[specification].toString() === 'Any')
          || (this[specification].toString() === team[specification].toString())) ? result : result = false ));
      return result;
    } // console.log(filteredTeams);


    /***********************************************************************/
    // for every game in the season,
    //  does the home or away team exist in the pre-filtered 'filteredTeams'?
    filteredGameEntries = filteredGameEntries.filter(matchingTeams);
    /***********************************************************************/
    function matchingTeams (g: GameEntry, index: any, array: GameEntry[]) {
      return  ((filteredTeams.some(teamWithThisIdExists, g.awayTeam.ID.toString())
              || filteredTeams.some(teamWithThisIdExists, g.homeTeam.ID.toString())) ? true : false);
    }
    function teamWithThisIdExists (t: Team, index: number, array: Team[]) {
      return (this === t.ID.toString());
    }

    return filteredGameEntries;
  }
}
