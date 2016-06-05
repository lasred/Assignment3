function IvankaWalker(game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed) {
	BasicWalker.call(this, game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed);
}

IvankaWalker.prototype = Object.create(BasicWalker.prototype);

IvankaWalker.prototype.constructor = IvankaWalker;