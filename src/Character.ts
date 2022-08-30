import render from "./main";

class Character {
  diceHtml: any;
  diceCount: number | undefined;
  currentDiceScore!: number[];
  health!: number;
  dead: boolean;
  maxHealth: number;
  name: any;
  avatar!: string;
  constructor(data: object) {
    Object.assign(this, data);
    this.dead = false;
    this.maxHealth = this.health;
    this.diceHtml = new Array(this.diceCount)
      .fill(`<div class="dice"></div>`)
      .join("");
  }

  getHealthBarHtml() {
    const percent = (100 * this.health) / this.maxHealth;
    return `<div class="health-bar-outer">
                <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                        style="width:${percent}%;">
                </div>
            </div>`;
  }

  takeDamage(attackScoreArray: number[]) {
    const totalAttackScore = attackScoreArray.reduce(
      (total, num) => total + num
    );
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.dead = true;
      this.health = 0;
    }
  }

  getDiceCount(): void {
    this.currentDiceScore = new Array(this.diceCount)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1);
    this.diceHtml = this.currentDiceScore
      .map((elem: number) => `<div class="dice">${elem}</div>`)
      .join("");
    render();
  }

  getCharacter() {
    const healthBar = this.getHealthBarHtml();
    return `
              <div class="character-card">
                  <h4 class="name"> ${this.name} </h4>
                  <img class="avatar" src="${this.avatar}" />
                  <div class="health">health: <b> ${this.health} </b></div>
                  ${healthBar}
                  <div class="dice-container">
                      ${this.diceHtml}
                  </div>
              </div>`;
  }
}

export default Character;
