class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){
        //this.background = this.add.image(0,0,"background");
        this.background = this.add.tileSprite(0,0, config.width, config.width, "background");
        this.background.setOrigin(0,0);

        //this.ship1 = this.add.image(config.width/2 - 50, config.height/2, "ship");
        //this.ship2 = this.add.image(config.width/2, config.height/2, "ship2");
        //this.ship3 = this.add.image(config.width/2 + 50, config.height/2, "ship3");

        this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2, "ship");
        this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2");
        this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, "ship3");
        
        this.player = this.physics.add.sprite(config.width/2 - 8, config.height -64,"player");
        this.player.play("thrust");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);
        this.powerUps = this.physics.add.group();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();
        this.physics.add.collider(this.projectiles,this.powerUps, function(projectiles,powerUp){
            projectiles.destroy();
        });
        this.physics.add.overlap(this.player,this.powerUps,this.pickPowerUp,null,this);
        let maxObjects = 4;
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);
        this.physics.add.overlap(this.player,this.enemies,this.hurtPlayer,null,this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
        this.score = 0;
        for(let i = 0; i<=maxObjects;i++){
            let powerUp = this.physics.add.sprite(16,16,"power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0,0,game.config.width, game.config.height);
            
            if(Math.random() > 0.5)
                powerUp.play("red");
            else
                powerUp.play("gray");
            
            powerUp.setVelocity(100,100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }
        
        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip,this);
        
        this.scoreLabel = this.add.text(10,10,"Score " + this.score,
        {font: "15px Arial", 
        fill: "yellow"});
    }

    moveship(ship, speed){
        ship.y += speed;
        if(ship.y > config.height){
            this.resetShipPos(ship);
        }
    }
    update(){
        this.moveship(this.ship1,1);
        this.moveship(this.ship2,.75);
        this.moveship(this.ship3,.75);
        this.background.tilePositionY -= 0.5;

        this.movePlayerManager();

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            if(this.player.active)
                this.shootBeam();
        }
        for(let i = 0; i < this.projectiles.getChildren().length; i++){
            let beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    movePlayerManager(){
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        else{
            this.player.setVelocity(0);
        }
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed)
        }
        else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else{
            this.player.setVelocityY(0);
        }
    }
 
    resetShipPos(ship){
        ship.y = 0;
        let randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    destroyShip(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }
    shootBeam(){
        //let beam = this.physics.add.sprite(this.player.x, this.player.y, "beam");
        let beam = new Beam(this);
        this.projectiles.add(beam);
    }

    pickPowerUp(player,powerUp){
        powerUp.disableBody(true,true);
    }
    hurtPlayer(player,enemy){
        this.resetShipPos(enemy);
        if(this.player.alpha < 1){
            return;
        }

        let explosion = new Explosion(this,player.x,player.y);
        player.disableBody(true,true);
        //player.x = config.width /2 - 8;
        //player.y = config.height -64;
        this.time.addEvent({
            delay: 2000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });
    }
    hitEnemy(projectiles,enemy){
        let explosion = new Explosion(this,enemy.x,enemy.y);

        projectiles.destroy();
        this.resetShipPos(enemy);
        this.score += 15;
        this.scoreLabel.text = "Score " + this.score;
    }
    resetPlayer(){
        this.score = 0;
        this.scoreLabel.text = "Score " + this.score;
        this.player.alpha = .5;
        let x = config.width /2 - 8;
        let y = config.height -64;
        this.player.enableBody(true,x,y,true,true);
        let tween = this.tweens.add({
            targets: this.player,
            y: config.height -64,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this 
        });
    }
}