class Scene2 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    create(){
        this.add.text(20,20,"Playing game",{font: "25px Arial", fill: "yellow"});
    }
}