/*
  Computational World - Herobound gladators, Ansher Wars 
  JavaScript - interpreted language, not compiled into binary file 
  JavaScript provides interactive elements of web page 
  */

var rightLimit = 700;
var botLimit = 600;


function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);
	ctx.drawImage(this.spriteSheet,
		xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
		this.frameWidth, this.frameHeight,
		x, y, this.frameWidth * this.scale,
		   this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.image = AM.getAsset("./img/MAGABackground.png");
	this.degree = 0;
}

Background.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, 0, 0);
    ctx.font = "14px Arial";
    var arrayLength = this.game.activeVoteCoins.length;
    for (var i = 0; i < arrayLength; i++) {
        var coin = this.game.activeVoteCoins[i];
        ctx.drawImage(
    FLAGS, coin.flagx, coin.flagy, coin.width, coin.height, coin.x, coin.y, coin.width * 0.2, coin.height * 0.2);
        ctx.fillStyle = "black";
        ctx.wrapText(coin.state + "\n\t" + coin.vote, coin.x + 5, coin.y + 15, 160, 16);
    }
}
Background.prototype.update = function () { };
