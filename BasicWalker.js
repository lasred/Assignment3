function BasicWalker(game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed) {
    this.animation = new Animation(spritesheet,  frameHeight, frameWidth, sheetWidth, frameDuration, frames, true, 1);
    this.game = game;
    this.direction = 0;
    this.ctx = game.ctx;
    this.x = x;
    this.speed = speed;
    this.y = y;
    this.topLimit = 10;
    this.botLimit = 150;
    this.rightLimit = 10;
    this.leftLimit = 10;
	this.record = 0;
	this.isPaused = true;
	this.stepsInCurrentDir = 0;
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

BasicWalker.prototype.setLeader = function(leader) {
	this.leader = leader;
}

BasicWalker.prototype.update = function () {
	if(this.game.leader) {
		if(this.game.leader == this) {
			this.walkInRandomDirection();
		} else {
			this.takeStepTowards(this.game.leader.x, this.game.leader.y, 100, this.game.characters);
		}
	} else {
		this.takeStepTowards(300,175, 40)
	}
}

BasicWalker.prototype.setDirectionTowards =  function(x, y) {
		var moveX = -1;
		var moveY = -1;
		if(Math.abs(this.x - x) > 3) {
			moveX = this.x > x? 1: 2;
		}
		if(Math.abs(this.y - y) > 3) {
			moveY = this.y > y? 3: 0; 
		}
		if(moveX == -1|| moveY == -1){
			this.direction = moveX == -1? moveY: moveX;
		} else {
			this.direction = moveX;
		}	
}

BasicWalker.prototype.walkInRandomDirection = function() {
	if(this.stepsInCurrentDir < 40) {
		this.walkInDirection(this.direction);
		this.stepsInCurrentDir ++;
	} else {
		var randomDirection = Math.floor(Math.random() * 4);
		this.walkInDirection(randomDirection);
		this.direction = randomDirection;
		this.stepsInCurrentDir = 0;
	}
}

BasicWalker.prototype.walkInDirection = function(direction) {
	 if (direction == 1 || direction == 2) {
		 if(this.isAwayFromOtherCharacters(this.nextPosition(direction) , this.y)) {
			this.x = this.canMove(direction) ? this.nextPosition(direction) : this.x;
		 }
	 } else {
		if(this.isAwayFromOtherCharacters(this.x, this.nextPosition(direction))) {
			this.y = this.canMove(direction) ? this.nextPosition(direction) : this.y;
		}
	}
}

BasicWalker.prototype.takeStepTowards = function(x, y, distanceAway) {
	if( Math.sqrt(Math.pow(this.x-x, 2) + Math.pow(this.y - y, 2)) > distanceAway) {
		this.setDirectionTowards(x, y);
		if (this.direction > -1) {
			this.walkInDirection(this.direction);
			this.isPaused = false;
		} 
	} else {
		if(x == 300 && y == 175) {
			this.game.leader  = this;
			if(this instanceof AssassinWalker) {
				this.game.scoreBoard.innerHTML = "Assassin is the leader";
			} else if(this instanceof ReporterWalker) {
				this.game.scoreBoard.innerHTML = "Reporter is the leader";
			} else if(this instanceof IvankaWalker) {
				this.game.scoreBoard.innerHTML = "Ivanka is the leader";
			} else {
				this.game.scoreBoard.innerHTML = "Cartel is the leader";
			}
		}
	}
}
BasicWalker.prototype.isAwayFromOtherCharacters = function(x, y) {
	for(var i=0; i<this.game.characters.length; i ++) {
		var entity = this.game.characters[i];
		if(entity != this && Math.sqrt(Math.pow(this.game.characters[i].x-x, 2) + Math.pow(this.game.characters[i].y - y, 2)) < 50) {
			return false;
		}
	}
	return true;
}
BasicWalker.prototype.draw = function (ctx) {
    var anim = this.animation;
    anim.elapsedTime += this.game.clockTick;
    if (anim.isDone()) {
        if (anim.loop) anim.elapsedTime = 0;
    }
    var frame = Math.floor(anim.elapsedTime / anim.frameDuration);
    var xindex = 1;
    var yindex = this.direction;
    if (!this.isPaused) {
        xindex = frame % anim.sheetWidth;
    }
    this.ctx.drawImage(anim.spriteSheet, xindex * anim.frameWidth,
                 yindex * anim.frameHeight, anim.frameWidth, anim.frameHeight,
                 this.x, this.y, 50, 50);
};

