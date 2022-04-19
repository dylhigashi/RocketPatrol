class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  preload() {
      // load images/tile sprites
      this.load.image('rocket', './assets/rocket.png');
      this.load.image('spaceship', './assets/spaceship.png');
      this.load.image('field', './assets/field.png');
      this.load.image('player', './assets/player.png');
      this.load.image('player2', './assets/Farmer.png');
      this.load.image('lasso', './assets/lasso.png');
      // load spritesheet
      this.load.spritesheet('chicken', './assets/Chicken.png', {frameWidth: 48, frameHeight: 32, startFrame: 0, endFrame: 5});
      this.load.spritesheet('cow', './assets/cow.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 6});
      // load audio
      this.load.audio('music', './assets/music.mp3');
      this.load.audio('cowBell', './assets/cowBell.wav');
  }

  create() {
      // place tile sprite
      this.field = this.add.tileSprite(0, 0, 640, 480, 'field').setOrigin(0, 0);

      // green UI background
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x432604).setOrigin(0, 0);
      
      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

      // add Rocket (p1)
      this.lasso = this.add.sprite(game.config.width/2, game.config.height - borderUISize - borderPadding - 32, 'lasso');
      this.lasso.width = 2;
      this.lasso.height = 2;
      this.p1Player = new Player(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 32, 'player', this.lasso, 1).setOrigin(0.5, 0);

      // add Player 2 if needed
      if(game.settings.gamemode == 1) {
        this.lasso2 = this.add.sprite(game.config.width/2, game.config.height - borderUISize - borderPadding - 32, 'lasso');
        this.lasso2.width = 2;
        this.lasso2.height = 2;
        this.p2Player = new Player(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 32, 'player2', this.lasso2, 2 ).setOrigin(0.5, 0);
      }

      // add Spaceships (x3)
      this.animal01 = new Animal(this, game.config.width + borderUISize*6, borderUISize*4, 'cow', 0, 30).setOrigin(0, 0);
      this.animal02 = new Animal(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'cow', 0, 20).setOrigin(0,0);
      this.animal03 = new Animal(this, game.config.width, borderUISize*6 + borderPadding*4, 'cow', 0, 10).setOrigin(0,0);

      // define keys
      keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

      // animation config
      this.anims.create({
        key: 'cowMove',
        frames: this.anims.generateFrameNumbers('cow', { start: 0, end: 5, first: 0}),
        frameRate: 30,
        repeat: -1,
      });

      this.animal01.anims.play('cowMove');
      this.animal02.anims.play('cowMove');
      this.animal03.anims.play('cowMove');
      

      // initialize score
      this.p1Score = 0;

      // display score
      let scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 100
      }
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
      
      


      // GAME OVER flag
      this.gameOver = false;

      // 60-second play clock
      scoreConfig.fixedWidth = 0;
      this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
          this.gameOver = true;
      }, null, this);

      //this.timeRight = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*2, this.clock.now, scoreConfig);

      this.sound.play('music');

      this.lasso.isAttached = false;
  }

  update() {
      //this.timeRight.setText("Time: " + this.time.totalElapsedSeconds() )

      if(Phaser.Input.Keyboard.JustDown(keyL)) {
        //this.sound.stopAll();
      }
      // check key input for restart / menu
      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
          this.sound.stopAll();
          this.scene.restart();
      }

      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.sound.stopAll();
          this.scene.start("menuScene");
      }

      this.field.tilePositionX -= 0.5;  // update tile sprite

      if(!this.gameOver) {
          this.p1Player.update();             // update p1
          if(game.settings.gamemode == 1) {
              this.p2Player.update();
          }
          this.animal01.update();               // update spaceship (x3)
          this.animal02.update();
          this.animal03.update();
      }

      // check collisions
      if(game.settings.gamemode == 0) {
        if(this.checkCollision(this.p1Player.lasso, this.animal03) && !this.p1Player.lasso.isAttached) {
                this.p1Player.lasso.isAttached = true;
                this.p1Player.lasso.isAttachedTo = this.animal03;
                this.p1Player.hitTop = true;
        }
        if (this.checkCollision(this.p1Player.lasso, this.animal02) && !this.p1Player.lasso.isAttached) {
                this.p1Player.lasso.isAttached = true;
                this.p1Player.lasso.isAttachedTo = this.animal02;
                this.p1Player.hitTop = true;
        }
        if (this.checkCollision(this.p1Player.lasso, this.animal01) && !this.p1Player.lasso.isAttached) {
                this.p1Player.lasso.isAttached = true;
                this.p1Player.lasso.isAttachedTo = this.animal01;
                this.p1Player.hitTop = true;
        }
      }
      
    
      //if lasso is attached move cow with lasso
      if(this.p1Player.lasso.isAttached) {
          this.p1Player.lasso.isAttachedTo.y = this.p1Player.lasso.y - 26;
          this.p1Player.lasso.isAttachedTo.x = this.p1Player.lasso.x - 36;
      }
      

      if(this.p1Player.lasso.y >= game.config.height - borderUISize - borderPadding - 32 && this.p1Player.lasso.isAttached) {
          this.captured(this.p1Player.lasso.isAttachedTo);
          this.p1Player.lasso.isAttached = false;
          this.p1Player.lasso.isAttachedTo = null;
      }
      if(game.settings.gamemode == 1) {
            if(this.checkCollision(this.p1Player.lasso, this.animal03) && !this.p1Player.lasso.isAttached && (this.p2Player.lasso.isAttachedTo != this.animal03)) {
                    this.p1Player.lasso.isAttached = true;
                    this.p1Player.lasso.isAttachedTo = this.animal03;
                    this.p1Player.hitTop = true;
            }
            if (this.checkCollision(this.p1Player.lasso, this.animal02) && !this.p1Player.lasso.isAttached && (this.p2Player.lasso.isAttachedTo != this.animal02)) {
                    this.p1Player.lasso.isAttached = true;
                    this.p1Player.lasso.isAttachedTo = this.animal02;
                    this.p1Player.hitTop = true;
            }
            if (this.checkCollision(this.p1Player.lasso, this.animal01) && !this.p1Player.lasso.isAttached && (this.p2Player.lasso.isAttachedTo != this.animal01)) {
                    this.p1Player.lasso.isAttached = true;
                    this.p1Player.lasso.isAttachedTo = this.animal01;
                    this.p1Player.hitTop = true;
            }
            //check for p2 collisions
            if(this.checkCollision(this.p2Player.lasso, this.animal03) && !this.p2Player.lasso.isAttached && (this.p1Player.lasso.isAttachedTo != this.animal03)) {
                this.p2Player.lasso.isAttached = true;
                this.p2Player.lasso.isAttachedTo = this.animal03;
                this.p2Player.hitTop = true;
            }
            if (this.checkCollision(this.p2Player.lasso, this.animal02) && !this.p2Player.lasso.isAttached && (this.p1Player.lasso.isAttachedTo != this.animal02)) {
                this.p2Player.lasso.isAttached = true;
                this.p2Player.lasso.isAttachedTo = this.animal02;
                this.p2Player.hitTop = true;
            }
            if (this.checkCollision(this.p2Player.lasso, this.animal01) && !this.p2Player.lasso.isAttached && (this.p1Player.lasso.isAttachedTo != this.animal01)) {
                this.p2Player.lasso.isAttached = true;
                this.p2Player.lasso.isAttachedTo = this.animal01;
                this.p2Player.hitTop = true;
            }  
            if(this.p2Player.lasso.isAttached) {
                this.p2Player.lasso.isAttachedTo.y = this.p2Player.lasso.y - 26;
                this.p2Player.lasso.isAttachedTo.x = this.p2Player.lasso.x - 36;
            }
            if(this.p2Player.lasso.y >= game.config.height - borderUISize - borderPadding - 32 && this.p2Player.lasso.isAttached) {
                this.captured(this.p2Player.lasso.isAttachedTo);
                this.p2Player.lasso.isAttached = false;
                this.p2Player.lasso.isAttachedTo = null;
            }
      }
        

  }

  checkCollision(rocket, ship) {
      // simple AABB checking
      if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
              return true;
      } else {
          return false;
      }
  }

  captured(animal) {
      // score add and repaint
      this.p1Score += animal.points;
      this.scoreLeft.text = this.p1Score; 
      this.sound.play('cowBell');
      animal.reset();
    }
}