
function AssassinWalker(game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed) {
	BasicWalker.call(this, game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed);
}

AssassinWalker.prototype = Object.create(BasicWalker.prototype);

AssassinWalker.prototype.constructor = AssassinWalker;