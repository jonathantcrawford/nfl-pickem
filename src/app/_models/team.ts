export class Team {

  public Stadium: Stadium;

  constructor(
    public ID?: string,
    public Location?: string,
    public Name?: string,
    public Abbreviation?: string,
    public Conference?: string,
    public Division?: string,
    public Logo?: string
  ) {
    this.Stadium = new Stadium();
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


