class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/background.png");
        //this.load.image("ship", "assets/ship.png");
        //this.load.image("ship2", "assets/ship2.png");
        //this.load.image("ship3", "assets/ship3.png");

        this.load.spritesheet("ship","assets/spritesheet/shipsprite.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("ship2","assets/spritesheet/ship2sprite.png",{
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet("ship3","assets/spritesheet/ship3sprite.png",{
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("explosion","assets/spritesheet/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("power-up","assets/spritesheet/power-up.png",{
            frameWidth: 16,
            frameWidth:16
        });
    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame")
    }
}