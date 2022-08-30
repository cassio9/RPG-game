import characterData from "./data";
import Character from "./Character";
import "./style.css";

const monsterArray: string[] = ["spaceGuy", "rabbit", "darth"];
let isWaiting: boolean;

function getNewMonster(): {} {
  let opponent = monsterArray.shift();
  if (opponent == "spaceGuy") {
    const nextMonsterData = characterData["spaceGuy"];
    return nextMonsterData ? new Character(nextMonsterData) : {};
  }
  if (opponent == "rabbit") {
    const nextMonsterData = characterData["rabbit"];
    return nextMonsterData ? new Character(nextMonsterData) : {};
  }
  if (opponent == "darth") {
    const nextMonsterData = characterData["darth"];
    return nextMonsterData ? new Character(nextMonsterData) : {};
  }
  return {};
}

function endGame() {
  isWaiting = true;
  const endMessage =
    Hero.health === 0 && Monster.health === 0
      ? "No victors - all fighters are dead"
      : Hero.health > 0
      ? "Lego Batman Wins"
      : "Bad guys Wins";

  const endEmoji = Hero.health > 0 ? "🦇" : "☠️";
  setTimeout(() => {
    document.body.innerHTML = `
              <div class="end-game">
                  <h2>Game Over</h2> 
                  <h3>${endMessage}</h3>
                  <p class="end-emoji">${endEmoji}</p>
              </div>
              `;
  }, 1000);
}

const Hero = new Character(characterData.batman);
let Monster: any = getNewMonster();

document.getElementById("attack-button")?.addEventListener("click", () => {
  if (!isWaiting) {
    Hero.getDiceCount();
    Monster.getDiceCount();
    Hero.takeDamage(Monster.currentDiceScore);
    Monster.takeDamage(Hero.currentDiceScore);
    if (Hero.dead) {
      endGame();
    } else if (Monster.dead) {
      isWaiting = true;
      if (monsterArray.length > 0) {
        setTimeout(() => {
          Monster = getNewMonster();
          Monster.dead = false;
          render();
          isWaiting = false;
        }, 1000);
      } else {
        endGame();
      }
    }
    render();
  }
});

export default function render() {
  const heroEl = document.getElementById("hero")!;
  const monsterEl = document.getElementById("monster")!;
  heroEl.innerHTML = Hero.getCharacter();
  monsterEl.innerHTML = Monster.getCharacter();
}

render();
