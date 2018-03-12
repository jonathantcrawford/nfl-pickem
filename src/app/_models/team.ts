export class Team {

  public Stadium: Stadium;

  constructor(
    public Id: number,
    public Location: string,
    public Name: string,
    public Abbreviation: string,
    public Conference: string,
    public Division: string,
    public Logo: string
  ) {
    this.Stadium = new Stadium();
  }

  // fromJSON is used to convert an serialized version
  // of the User to an instance of the class
  static fromJSON(json: TeamJSON|string): Team {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Team.reviver);
    } else {
      // create an instance of the User class
      const team = Object.create(Team.prototype);
      // copy all the fields from the json object
      return Object.assign(team, json, {
        // convert fields that need converting
        Stadium: new Stadium(json.Stadium),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call User.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? Team.fromJSON(value) : value;
  }

  // toJSON is automatically used by JSON.stringify
  toJSON(): TeamJSON {
    // copy all fields from `this` to an empty object and return in
    return Object.assign({}, this, {
      // convert fields that need converting
      Stadium: this.Stadium.toString()
    });
  }

}

export class Stadium {
  constructor(
    public Name?: string,
    public Street?: string,
    public City?: string,
    public State?: string,
    public Zip?: string
  ) {
    this.Name = Name;
    this.Street = Name;
    this.City = City;
    this.State = State;
    this.Zip = Zip;
  }
}


// A representation of User's data that can be converted to
// and from JSON without being altered.
export interface TeamJSON {
  Id: number;
  Location: string;
  Name: string;
  Abbreviation: string;
  Conference: string;
  Division: string;
  Logo: string;
  Stadium: string;
}
