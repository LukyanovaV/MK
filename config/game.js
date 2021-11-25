import {player1, player2, HIT, ATTACK, logs} from './mode.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const {name:name1, hp: hp1} = player1;
const {name:name2, hp: hp2} = player2;

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className){
       $tag.classList.add(className); 
    }
    return $tag;
}

let getRandom = (x) => Math.floor(Math.random()*x)+1;

export default class Game{   

    createReloadButton(){
    const $reloadButton = createElement ('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadButton.appendChild($button);
    return $reloadButton;
}

    createPlayer({player, hp, name, img}){
    const $player = createElement('div', `player${player}`);
    const $progressbar = createElement('div','progressbar');
    const $character = createElement('div','character');
    const $life = createElement('div','life');
    const $name = createElement('div','name');

    $life.style.width = hp + '%' ;
    $name.innerText = name;

    const $img = createElement('img');
    $img.src = img;

    $arenas.appendChild($player);
    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);
    
    return $player;
    
}

    playerWin(name){
    const $winTitle = createElement('div', 'loseTitle');
    if(name){
        $winTitle.innerText = name + ' win';
    } else {
        $winTitle.innerText = 'draw';
    }
    
    return $winTitle;
}

    enemyAttack = () => {
    const hit = ATTACK [getRandom(3)-1];
    const defence = ATTACK [getRandom(3)-1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}
    playerAttack(){
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        
        if (item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }

        item.checked = false;
        
    }

    return attack;
}

    showResult(){
    if(hp1===0 || hp2===0) {
        $formFight.disabled = true;
    }
    
    if(hp1===0 && hp1 < hp2){
        $arenas.appendChild(playerWin(name2));
        generateLogs('end', player2, player1);
    } else if (hp2===0 && hp2 < hp1){
        $arenas.appendChild(playerWin(name1));
        generateLogs('end', player1, player2);
    } else if (hp1===0 && hp1===0) {
        $arenas.appendChild(playerWin());
        generateLogs('draw', player1, player2);
    }
}

    generateLogs(type, player1, player2){
    
    const block = logs[type];
    const time = (new Date()).getHours()+':'+(new Date()).getMinutes()+' ';
    let text;
    switch(type){
        case 'start':
            text = block.replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
        case 'end':
            let x = getRandom(block.length)-1;
            text = time + block[x].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);  
            break;
        case 'draw':
            text = time +block;
            break;
        default:
            text = time + block[getRandom(block.length)-1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);     

    }
    console.log(text);
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);

}

    action(){
    const enemy = this.enemyAttack();
    const player = this.playerAttack();

    if (player.hit === enemy.defence && enemy.hit === player.defence){
        this.generateLogs('draw', player1, player2);
    }
    else{ 
        if(player.hit === enemy.defence){
            this.generateLogs('defence', player1, player2);  
        }
        else{
           player2.changeHP(player.value);
           player2.renderHP();
           this.generateLogs('hit', player1, player2);
        }

        if(enemy.hit === player.defence){
            this.generateLogs('defence', player2, player1);  
        }
        else{
           player1.changeHP(enemy.value);
           player1.renderHP(); 
           this.generateLogs('hit', player2, player1);
        } 
    }
    this.showResult();
}
    start (){
    
    let click = () => this.action();
    $formFight.addEventListener('submit', function(e){
      e.preventDefault();
      click();
    });
    $arenas.appendChild(this.createPlayer(player1));
    $arenas.appendChild(this.createPlayer(player2));
    $arenas.appendChild(this.createReloadButton()).addEventListener('click', function(){
      window.location.reload();
    });
    this.generateLogs('start', player1, player2);
}

}
