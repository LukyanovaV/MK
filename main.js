const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name  : 'Kitana',
    hp    : 100,
    img   : 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon : ['sword'],
    attack : function(name) {
        console.log( name + 'Fight...')
    }
}

const player2 = {
    player: 2,
    name  : 'Scorpion',
    hp    : 100,
    img   : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon : ['sword'],
    attack : function(name) {
        console.log( name + 'Fight...')
    }

}
    
function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className){
       $tag.classList.add(className); 
    }
    return $tag;
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

function changeHP(player){
    const $playerLife = document.querySelector('.player'+player.player + ' .life');
    x = Math.ceil(Math.random()*10);
    if(player.hp <= x){
        player.hp = 0;
    }
    else{
        player.hp -=x;}
    $playerLife.style.width = player.hp+'%';
    console.log('hp='+player.hp);    
}

function playerWin(name){
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' win';
    return $winTitle;
}

$randomButton.addEventListener('click', function(){
    y = Math.floor(Math.random()*2)+1;
    if (y===player1.player){
        changeHP(player1);
         if(player1.hp===0){
             $arenas.appendChild(playerWin(player2.name));
         }
    }
    else{
        changeHP(player2);
         if(player2.hp===0){
            $arenas.appendChild(playerWin(player1.name));
         }
    }


})
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
