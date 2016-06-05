function ReporterWalker(game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed) {
	BasicWalker.call(this, game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed);
}

ReporterWalker.prototype = Object.create(BasicWalker.prototype);

ReporterWalker.prototype.constructor = ReporterWalker;
   
ReporterWalker.prototype.draw = function (ctx) {
    var anim = this.animation;
    anim.elapsedTime += this.game.clockTick;
    if (anim.isDone()) {
        if (anim.loop) anim.elapsedTime = 0;
    }
    var frame = Math.floor(anim.elapsedTime / anim.frameDuration);
    var xIndex = 1;
    if (!this.isPaused) {
        xIndex = frame % anim.sheetWidth;
    }
	var yIndex = Math.floor(xIndex / 4);
	xIndex = Math.floor(xIndex % 4);
	if(this.direction == 0 || this.direction == 1) {
		this.ctx.save();
		this.ctx.scale(-1, 1);
		this.ctx.drawImage(anim.spriteSheet,
					 xIndex * anim.frameWidth , yIndex * anim.frameHeight, anim.frameWidth, anim.frameHeight, -this.x, this.y, -100, 100);
		this.ctx.restore();
	} else {
		this.ctx.drawImage(anim.spriteSheet, xIndex * anim.frameWidth , yIndex * anim.frameHeight,
					 anim.frameWidth, anim.frameHeight, this.x, this.y, 100, 100);
	}
};
