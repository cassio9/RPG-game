var y=Object.defineProperty;var b=(a,e,n)=>e in a?y(a,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[e]=n;var i=(a,e,n)=>(b(a,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&o(m)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const h={batman:{name:"Batman",avatar:"./img/legoBatman.jpg",health:60,diceCount:3,currentDiceScore:[]},spaceGuy:{name:"Space Trooper",avatar:"./img/spaceGuy.jpg",health:30,diceCount:1,currentDiceScore:[]},rabbit:{name:"Crazy Rabbit",avatar:"./img/scaryRabbit.jpg",health:30,diceCount:2,currentDiceScore:[]},darth:{name:"Darth Vader",avatar:"./img/darthVader.jpg",health:20,diceCount:3,currentDiceScore:[]}};class l{constructor(e){i(this,"diceHtml");i(this,"diceCount");i(this,"currentDiceScore");i(this,"health");i(this,"dead");i(this,"maxHealth");i(this,"name");i(this,"avatar");Object.assign(this,e),this.dead=!1,this.maxHealth=this.health,this.diceHtml=new Array(this.diceCount).fill('<div class="dice"></div>').join("")}getHealthBarHtml(){const e=100*this.health/this.maxHealth;return`<div class="health-bar-outer">
                <div class="health-bar-inner ${e<26?"danger":""}" 
                        style="width:${e}%;">
                </div>
            </div>`}takeDamage(e){const n=e.reduce((o,t)=>o+t);this.health-=n,this.health<=0&&(this.dead=!0,this.health=0)}getDiceCount(){this.currentDiceScore=new Array(this.diceCount).fill(0).map(()=>Math.floor(Math.random()*6)+1),this.diceHtml=this.currentDiceScore.map(e=>`<div class="dice">${e}</div>`).join(""),u()}getCharacter(){const e=this.getHealthBarHtml();return`
              <div class="character-card">
                  <h4 class="name"> ${this.name} </h4>
                  <img class="avatar" src="${this.avatar}" />
                  <div class="health">health: <b> ${this.health} </b></div>
                  ${e}
                  <div class="dice-container">
                      ${this.diceHtml}
                  </div>
              </div>`}}const p=["spaceGuy","rabbit","darth"];let d;function v(){let a=p.shift();if(a=="spaceGuy"){const e=h.spaceGuy;return e?new l(e):{}}if(a=="rabbit"){const e=h.rabbit;return e?new l(e):{}}if(a=="darth"){const e=h.darth;return e?new l(e):{}}return{}}function f(){d=!0;const a=s.health===0&&c.health===0?"No victors - all fighters are dead":s.health>0?"Lego Batman Wins":"Bad guys Wins",e=s.health>0?"\u{1F987}":"\u2620\uFE0F";setTimeout(()=>{document.body.innerHTML=`
              <div class="end-game">
                  <h2>Game Over</h2> 
                  <h3>${a}</h3>
                  <p class="end-emoji">${e}</p>
              </div>
              `},1e3)}const s=new l(h.batman);let c=v();var g;(g=document.getElementById("attack-button"))==null||g.addEventListener("click",()=>{d||(s.getDiceCount(),c.getDiceCount(),s.takeDamage(c.currentDiceScore),c.takeDamage(s.currentDiceScore),s.dead?f():c.dead&&(d=!0,p.length>0?setTimeout(()=>{c=v(),c.dead=!1,u(),d=!1},1e3):f()),u())});function u(){const a=document.getElementById("hero"),e=document.getElementById("monster");a.innerHTML=s.getCharacter(),e.innerHTML=c.getCharacter()}u();
