class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, lasso, playerNo, frame ) {
        super(scene, x, y, texture,frame);
        this.playerNo = playerNo;
        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;
        this.hitTop = false;      // track rocket's firing status
        this.moveSpeed = 2;         // pixels per frame
        this.sfxWhip = scene.sound.add('sfxWhip')  // add rocket sfx
        this.lasso = lasso;
    }

    update() {
        this.lasso.x = this.x;
        if(this.playerNo == 2) {
            // left/right movement
            if(!this.isFiring) {
                this.lasso.alpha = 0;
                if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
            // fire button
            if(Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring) {
                this.lasso.alpha = 1;
                this.isFiring = true;
                this.sfxWhip.play();
            }
        }
        else {
            // left/right movement
            if(!this.isFiring) {
                this.lasso.alpha = 0;
                if(keyA.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
            // fire button
            if(Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
                this.lasso.alpha = 1;
                this.isFiring = true;
                this.sfxWhip.play();
            }
        }
        
        // if fired, move up
        if(this.isFiring && this.lasso.y >= borderUISize * 3 + borderPadding && !this.hitTop) {
            this.lasso.y -= this.moveSpeed;
        }
        else if(this.isFiring && this.lasso.y <= borderUISize * 3 + borderPadding && !this.hitTop){
            console.log("hittop");
            this.hitTop = true;
        }
        //move back down
        if(this.hitTop && this.isFiring) {
            this.lasso.y += this.moveSpeed;
        }
        // reset on miss
        if(this.hitTop && this.lasso.y >= this.y) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.hitTop = false;
        this.isFiring = false;
        this.lasso.y = game.config.height - borderUISize - borderPadding - 32;
    }
}