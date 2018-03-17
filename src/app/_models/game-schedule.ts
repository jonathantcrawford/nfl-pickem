import { Team } from './team';

export class GameSeason {
    public fullgameschedule?: FullGameSchedule;
    constructor() {
      this.fullgameschedule = new FullGameSchedule();
    }
  }
  export class FullGameSchedule {
    public gameentry?: (GameEntry)[] | null;
    constructor(
      public lastUpdatedOn?: string
    ) {
      this.gameentry = [];
    }
  }
  export class GameEntry {
    public awayTeam: Team;
    public homeTeam: Team;

    constructor(
      public id: string,
      public week: string,
      public scheduleStatus: string,
      public date: string,
      public time: string,
      public location: string,
      public originalDate?: null,
      public originalTime?: null,
      public delayedOrPostponedReason?: null,
    ) {
      this.awayTeam = new Team();
      this.homeTeam = new Team();
    }
  }
