export class Tournament {
  nav: string = "Team                           | MP |  W |  D |  L |  P";
  teams: team[] = [];
  public tally(input: string): string {
    let resultado = this.nav + "\n";
    if (input == "") return this.nav;
    let arrayTeams: string[] = input.split(/\n/g);
    for (var j = 0; j < arrayTeams.length; j++) {
      let arrayPartido: string[] = arrayTeams[j].replace(/\n/g, ";").split(";").reverse();
      for (var k = 1; k < arrayPartido.length; k++) {
        if (!this.teams.map((object) => object.name).includes(arrayPartido[k]) && k != 0) this.teams.push(new team(arrayPartido[k]));
        if (arrayPartido[0] == "win") {
          if (k == 1) {
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].match += 1;
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].lose += 1;
          } else {
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].match += 1;
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].win += 1;
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].point += 3;
          }
        } else if (arrayPartido[0] == "draw") {
           this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].match += 1;
           this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].draw += 1;
           this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].point += 1;
        }else if(arrayPartido[0] == "loss"){
          if (k == 1) {
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].match += 1;
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].win += 1;
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].point += 3;
          } else {
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].match += 1;
            this.teams[this.teams.map((object) => object.name).indexOf(arrayPartido[k])].lose += 1;
          }
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
      resultado +=
        addSpace(name.name) +
        "|  " +
        name.match +
        " |  " +
        name.win +
        " |  " +
        name.draw +
        " |  " +
        name.lose +
        " |" +
        createPoints(name.point);
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
  constructor(name: string) {
    this.name = name;
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
