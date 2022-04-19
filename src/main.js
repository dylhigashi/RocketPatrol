let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyW, keyR, keyL, keyA, keyD, keyUP, keyLEFT, keyRIGHT;

//Dylan Higashionna
//Rocket Patrol Mods
//5 hours for completion
//Implement a simultaneous two-player mode (30)
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
//Create and implement a new weapon (w/ new behavior and graphics) (20)
//Create a new animated sprite for the Spaceship enemies (10)
//Add your own (copyright-free) background music to the Play scene (5)