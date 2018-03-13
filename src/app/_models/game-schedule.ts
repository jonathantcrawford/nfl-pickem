export class GameSchedule {
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
    public awayTeam: AwayTeamOrHomeTeam;
    public homeTeam: AwayTeamOrHomeTeam;

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
      this.awayTeam = new AwayTeamOrHomeTeam();
      this.homeTeam = new AwayTeamOrHomeTeam();
    }
  }
  export class AwayTeamOrHomeTeam {
    constructor(
      public ID?: string,
      public City?: string,
      public Name?: string,
      public Abbreviation?: string
    ) {}

  }
