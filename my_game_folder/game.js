const config = {
    width: 256,
    height: 256,
    backgroundColor: 0x00000,
    scene:[Scene1, Scene2],
    physics: {
        default: "arcade",
        arcade:{
            debug:false
        }
    }

}

const gameSettings = {
    playerSpeed: 100
}

let game = new Phaser.Game(config);
