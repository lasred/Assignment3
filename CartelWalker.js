function CartelWalker(game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed) {
	BasicWalker.call(this, game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed);
}

CartelWalker.prototype = Object.create(BasicWalker.prototype);

CartelWalker.prototype.constructor = CartelWalker;
  
CartelWalker.prototype.draw = function (ctx) {
    var anim = this.animation;
    anim.elapsedTime += this.game.clockTick;
    if (anim.isDone()) {
        if (anim.loop) anim.elapsedTime = 0;
    }
    var frame = Math.floor(anim.elapsedTime / anim.frameDuration);
    var xindex = 1;
    if (!this.isPaused) {
        xindex = frame % anim.sheetWidth;
    }
	var xIndexStart = [200, 298, 398, 530, 660];
	if(this.direction == 1 || this.direction == 0) {
		this.ctx.save();
		this.ctx.scale(-1,1);
		this.ctx.drawImage(anim.spriteSheet,
					  xIndexStart[xindex], 386, xIndexStart[xindex+1] - xIndexStart[xindex], anim.frameHeight,
					 -this.x, this.y, -100, 100);
		this.ctx.restore();
	} else {
				this.ctx.drawImage(anim.spriteSheet,	xIndexStart[xindex],   386, xIndexStart[xindex+1] - xIndexStart[xindex], anim.frameHeight,
					 this.x, this.y, 100,  100);
	}
};
