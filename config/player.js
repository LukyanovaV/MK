export default class Player{
    constructor(props){
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
    }
   
    changeHP = (points) => {
        if(this.hp <= points){
            this.hp = 0;
        }
        else{
            this.hp -=points;} 
    }

    attack = () => {
        console.log( this.name + 'Fight...')
    }

    elHP = () => {
        return document.querySelector('.player'+this.player + ' .life');
    }

    renderHP = () =>{
        this.elHP().style.width = this.hp+'%';
    }

}
