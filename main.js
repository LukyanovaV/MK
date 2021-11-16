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
    },
    changeHP : changeHP,
    elHP     : elHP,
    renderHP : renderHP
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
    changeHP : changeHP,
    elHP     : elHP,
    renderHP : renderHP

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

function getRandom(){
    return  Math.ceil(Math.random()*10);
}



$randomButton.addEventListener('click', function(){
    player1.changeHP(getRandom());
    player1.renderHP();
    player2.changeHP(getRandom());
    player2.renderHP();    

    if(player1.hp===0 || player2.hp===0) {
        $randomButton.disabled = true;
    }

    if(player1.hp===0 && player1.hp < player2.hp){
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp===0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp===0 && player1.hp===0) {
        $arenas.appendChild(playerWin());
    }

})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
$arenas.appendChild(createReloadButton()).addEventListener('click', function(){
 window.location.reload();
});