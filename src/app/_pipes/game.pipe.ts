import { Pipe, PipeTransform } from '@angular/core';

import { GameSchedule, GameEntry  } from '../_models/index';


@Pipe({
  name: 'gamePipe',
  pure: false
})
export class GamePipe implements PipeTransform {
  transform(items: GameEntry[], filter: GameEntry): any {
    if (!items || !filter) {
        return items;
    }

    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => (parseInt(item.week, 10) === parseInt(filter.week, 10)) ? true : false);

  }
}
