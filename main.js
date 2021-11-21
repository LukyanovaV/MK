const $arenas = document.querySelector('.arenas');
const $blockTitle = createElement('div', 'loseTitle');
// const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name  : 'Kitana',
    hp    : 100,
    img   : 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon : ['sword'],
    attack : function(name) {
        console.log( name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHP
}

const player2 = {
    player: 2,
    name  : 'Scorpion',
    hp    : 100,
    img   : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon : ['sword'],
    attack : function(name) {
        console.log( name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHP

}
    
function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className){
       $tag.classList.add(className); 
    }
    return $tag;
}
function createReloadButton(){
    const $reloadButton = createElement ('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadButton.appendChild($button);
    return $reloadButton;
}

function createPlayer(player){

    const $player = createElement('div', 'player'+player.player);
    const $progressbar = createElement('div','progressbar');
    const $character = createElement('div','character');
    const $life = createElement('div','life');
    const $name = createElement('div','name');

    $life.style.width = player.hp + '%' ;
    $name.innerText = player.name;

    const $img = createElement('img');
    $img.src = player.img;

    $arenas.appendChild($player);
    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);
    
    return $player;
    
}

function changeHP(points){
    if(this.hp <= points){
        this.hp = 0;
    }
    else{
        this.hp -=points;} 
}

function elHP(){
    return $playerLife = document.querySelector('.player'+this.player + ' .life');
}

function renderHP(){
    this.elHP().style.width = this.hp+'%';
}

function playerWin(name){
    const $winTitle = createElement('div', 'loseTitle');
    if(name){
        $winTitle.innerText = name + ' win';
    } else {
        $winTitle.innerText = 'draw';
    }
    
    return $winTitle;
}

function playerBlock(name){
    if(name){
        $blockTitle.innerText = name + ' blocked';
    } else {
        $blockTitle.innerText = '';
    }
    
    return $blockTitle;
}

function getRandom(x){
    return  Math.floor(Math.random()*x)+1;
}

function enemyAttack(){
    const hit = ATTACK [getRandom(3)-1];
    const defence = ATTACK [getRandom(3)-1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    playerBlock();
    const enemy = enemyAttack();

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

    if(player1.hp===0 || player2.hp===0) {
        $formFight.disabled = true;
    }

    if (attack.hit === enemy.defence && enemy.hit === attack.defence){

    }
    else{ 
        if(attack.hit === enemy.defence){
           $arenas.appendChild(playerBlock(player2.name));
        }
        else{
           player2.changeHP(attack.value);
           player2.renderHP(); 
        }

        if(enemy.hit === attack.defence){
           $arenas.appendChild(playerBlock(player1.name));
        }
        else{
           player1.changeHP(enemy.value);
           player1.renderHP(); 
        } 
    }   
    
    if(player1.hp===0 && player1.hp < player2.hp){
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp===0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp===0 && player1.hp===0) {
        $arenas.appendChild(playerWin());
    }
})

//$randomButton.addEventListener('click', function(){
//    player1.changeHP(getRandom());
//    player1.renderHP();
//    player2.changeHP(getRandom());
//    player2.renderHP();    
//
//    if(player1.hp===0 || player2.hp===0) {
//        $randomButton.disabled = true;
//    }
//
//    if(player1.hp===0 && player1.hp < player2.hp){
//        $arenas.appendChild(playerWin(player2.name));
//    } else if (player2.hp===0 && player2.hp < player1.hp){
//        $arenas.appendChild(playerWin(player1.name));
//    } else if (player1.hp===0 && player1.hp===0) {
//        $arenas.appendChild(playerWin());
//    }
//
//})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
$arenas.appendChild(createReloadButton()).addEventListener('click', function(){
 window.location.reload();
});