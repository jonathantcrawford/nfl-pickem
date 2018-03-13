import { Pipe, PipeTransform } from '@angular/core';

import { Team  } from '../_models/index';
import { GameSchedule, GameEntry } from '../_models/index';


@Pipe({
  name: 'teamPipe',
  pure: false
})
export class TeamPipe implements PipeTransform {
  transform(items: Team[], filter: Team): Team[] {
    if (!items || !filter) {
      return items;
    }

    // HERE // add 'any' conditional before filtering teams

    items = items.filter(item => (
      (item.Conference === filter.Conference)
      && (item.Division === filter.Division)) ? true : false);

    return items;
  }
}


