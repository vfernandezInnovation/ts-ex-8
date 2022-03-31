export class Tournament {
  nav: string = "Team                           | MP |  W |  D |  L |  P";
  teams: team[] = [];
  public tally(input: string): string {
    let resultado = this.nav + "\n";
    if (input == "") return this.nav;
    input = input.replace(/\n/g, ";");
    let arrayTeams: string[] = input.split(";");
    for (var i = arrayTeams.length - 1; i >= 0; i -= 3) {
      if (arrayTeams[i] == "win") {
        if (!this.teams.map((object) => object.name).includes(arrayTeams[i - 1]))this.teams.push(new team(arrayTeams[i - 1], 1, 0, 0, 1, 0));
        else {
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 1])].match += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 1])].lose += 1;
        }
        if (!this.teams.map((object) => object.name).includes(arrayTeams[i - 2]))this.teams.push(new team(arrayTeams[i - 2], 1, 1, 0, 0, 3));
        else {
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 2])].match += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 2])].win += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 2])].point += 3;
        }
      }
      if (arrayTeams[i] == "draw") {
        if (!this.teams.map((object) => object.name).includes(arrayTeams[i - 2]))this.teams.push(new team(arrayTeams[i - 2], 1, 0, 1, 0, 1));
        else {
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 2])].match += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 2])].draw += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 2])].point += 1;
        }
        if (!this.teams.map((object) => object.name).includes(arrayTeams[i - 1]))this.teams.push(new team(arrayTeams[i - 1], 1, 0, 1, 0, 1));
        else {
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 1])].match += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 1])].draw += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 1])].point += 1;
        }
      }
      if (arrayTeams[i] == "loss") {
        if (!this.teams.map((object) => object.name).includes(arrayTeams[i - 1]))this.teams.push(new team(arrayTeams[i - 1], 1, 1, 0, 0, 3));
        else {
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 1])].match += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 1])].win += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 1])].point += 3;
        }
        if (!this.teams.map((object) => object.name).includes(arrayTeams[i - 2]))this.teams.push(new team(arrayTeams[i - 2], 1, 0, 0, 1, 0));
        else {
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 2])].match += 1;
          this.teams[this.teams.map((object) => object.name).indexOf(arrayTeams[i - 2])].lose += 1;
        }
      }
    }
    this.teams.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.teams.sort((a, b) => {
      if (a.point == b.point) return 0;
      if (a.point < b.point) return 1;
      return -1;
    });
    this.teams.forEach((name, index, array) => {
      resultado += name.build();
      array.length - 1 == index ? (resultado += "") : (resultado += "\n");
    });
    return resultado;
  }
}
class team {
  name: string = "";
  match: number = 0;
  win: number = 0;
  draw: number = 0;
  lose: number = 0;
  point: number = 0;
  constructor( name: string, match: number, win: number, draw: number, lose: number, point: number) {
    this.name = name;
    this.match = match;
    this.win = win;
    this.draw = draw;
    this.lose = lose;
    this.point = point;
  }
  public build(): string {
    return (addSpace(this.name) + "|  " + this.match + " |  " + this.win + " |  " + this.draw + " |  " + this.lose + " |" + createPoints(this.point));
  }
}
function addSpace(name: string): string {
  for (var i = name.length; i < 31; i++) {
    name += " ";
  }
  return name;
}
function createPoints(n: number) {
  let resutlado: string = n + "";
  for (let i = (n + "").length; i < 3; i++) {
    resutlado = " " + resutlado;
  }
  return resutlado;
}
