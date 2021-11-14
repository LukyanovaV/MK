
const player1 = {
    name : 'Kitana',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon : ['sword'],

     
    attack : function(name) {
        console.log( name + 'Fight...')
    }

}

const player2 = {
    name : 'Scorpion',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon : ['sword'],
     
    attack : function(name) {
        console.log( name + 'Fight...')
    }

}
    function createPlayer(className, player){

    const $arenas = document.querySelector('.arenas');

    const $player = document.createElement('div');
    $player.className = className;
    
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');
    

    const $life = document.createElement('div');
    $life.className = 'life';
    $life.style.width = player.hp + '%' ;

    const $name = document.createElement('div');
    $name.className = 'name';
    $name.innerText = player.name;

    const $img = document.createElement('img');
    $img.src = player.img;

    $arenas.appendChild($player);
    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    
}

createPlayer('player1', player1);
createPlayer('player2', player2);
