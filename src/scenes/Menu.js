class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
      // load audio
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfxWhip', './assets/lasso_shot.mp3');
      this.load.audio('music', './assets/music.mp3');

      this.load.image('background', './assets/background.jpg');
  }

  create() {
      // menu text configuration
      let menuConfig = {
          fontFamily: 'Courier',
          fontSize: '36px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }

      this.add.image(0, 0,'background');
      
     
      // show menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize*2 - borderPadding*2, 'COW PATROL', menuConfig).setOrigin(0.5);
      menuConfig.fontSize = 26;
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'P1 Use (A) & (D) to move & (W) to fire', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'P2 Use ←→ arrows to move & ↑ to fire', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#46A908';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Single-player', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press → for Multiplayer', menuConfig).setOrigin(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      //this.sound.play('music');
  }

  update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // Novice mode
        game.settings = {
          spaceshipSpeed: 1,
          gameTimer: 60000,
          gamemode: 0    
        }
        this.sound.play('sfx_select');
        //this.sound.play('music');
        this.scene.start("playScene");    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // Expert mode
        game.settings = {
          spaceshipSpeed: 2,
          gameTimer: 60000,
          gamemode: 1
        }
        this.sound.play('sfx_select');
        //this.sound.play('music');
        this.scene.start("playScene");    
      }
    }
}