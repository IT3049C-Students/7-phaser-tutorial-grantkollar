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
        this.load.spritesheet("player","assets/spritesheet/player.png",{
            frameWidth: 16,
            frameHeight:24
        });
    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame")

        this.anims.create({
            key:"ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key:"ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key:"ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key:"explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key:"red",
            frames: this.anims.generateFrameNumbers("power-up",{
                start:0,
                end:1
            }),
            frameRate:20,
            repeat:-1
        })
        this.anims.create({
            key:"gray",
            frames:this.anims.generateFrameNumbers("power-up",{
                start:2,
                end:3
            }),
            frameRate:20,
            repeat:-1
        });
        this.anims.create({
            key:"thrust",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        })
    }
}