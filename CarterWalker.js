function CartelWalker(game, spritesheet) {
    this.animation = new Animation(spritesheet, 103, 208, 9, 0.10, 11, true, 1);
    this.game = game;
    this.direction = 0;
    this.ctx = game.ctx;
    this.x = 500;
    this.speed = 100;
    this.y = 200;
    this.topLimit = 10;
    this.botLimit = 150;
    this.rightLimit = 10;
    this.leftLimit = 10;
	this.isPaused = true;
	this.pausedFor = 0;
	this.record = 0;
    this.nextPosition = function (direction) {
        switch (direction) {
	    case 0: {
                return this.y + this.game.clockTick * this.speed;
            }
            case 1: {
                return this.x - this.game.clockTick * this.speed;
            }
            case 2: {
                return this.x + this.game.clockTick * this.speed;
            }
            case 3: {
                return this.y - this.game.clockTick * this.speed;
            }
            default: {
                return this.game.clockTick * this.speed;
            }
        }
    }

    this.canMove = function (direction) {
        var nextPos = this.nextPosition(direction);
        switch (direction) {
            case 0: {
                return (nextPos <= (botLimit - this.botLimit));
            }
	    case 1: {
                return (nextPos >= this.leftLimit);
            }
            case 2: {
                return (nextPos <= (rightLimit - this.rightLimit));
            }
            case 3: {
                return (nextPos >= this.topLimit);
            }
        }
    }
}


var reporterDir = 5; 

CartelWalker.prototype.update = function () {
	var isMoving = true;
	
	var rand2 = Math.floor((Math.random() * 20) + 1); //1-3 = true, 4 = false
	if(rand2 == 20) {
		var rand = Math.floor((Math.random() * 5) + 1);
		reporterDir = rand; 
	}
	
     if (reporterDir == 1) {
        this.y = this.canMove(3) ? this.nextPosition(3) : this.y;
        this.direction = 3;
		isMoving = true;
    } if (reporterDir == 2) {
        this.y = this.canMove(0) ? this.nextPosition(0) : this.y;
        this.direction = 0;
		isMoving = true;
    } if (reporterDir == 3) {
        this.x = this.canMove(2) ? this.nextPosition(2) : this.x;
        this.direction = 2;
		isMoving = true;
    } if (reporterDir == 4) {
        this.x = this.canMove(1) ? this.nextPosition(1) : this.x;
        this.direction = 1;
		isMoving = true;
    } if (reporterDir >= 5) {
        //this.x = this.canMove(1) ? this.nextPosition(1) : this.x;
        //this.direction = 1;
		isMoving = false;
    }
    //collision
    if (isMoving) {
	this.isPaused = false;
	this.pausedFor = 0; 
    } 
}

CartelWalker.prototype.draw = function (ctx) {
    var anim = this.animation;
    anim.elapsedTime += this.game.clockTick;
    if (anim.isDone()) {
        if (anim.loop) anim.elapsedTime = 0;
    }
    var frame = Math.floor(anim.elapsedTime / anim.frameDuration);
    var xIndex = 1;
    if (!this.isPaused) {
		//o - 11
        xIndex = frame % anim.sheetWidth;
    }
	var yIndex = Math.floor(xIndex / 4);

	xIndex = Math.floor(xIndex % 4);
	if(this.direction == 0 || this.direction == 1) {
		//this.ctx.save();
		//this.ctx.scale(-1, 1);

		this.ctx.drawImage(anim.spriteSheet,
					 xIndex * anim.frameWidth , 386,
					 anim.frameWidth, anim.frameHeight,
					 this.x, this.y,
					 150,
					 150);
			//		 this.ctx.restore();
	} else {
				
		this.ctx.drawImage(anim.spriteSheet,
					 xIndex * anim.frameWidth , yIndex * anim.frameHeight,
					 anim.frameWidth, anim.frameHeight,
					 this.x, this.y,
					 150,
					 150);

					 }
};
