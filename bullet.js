function Bullet(game, spritesheet) {
	this.spriteSheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.x = 300;
    this.speed = 10;
    this.y = 220;
}

Bullet.prototype.update = function () {
    this.x -= 0.8;
	if(this.x < 0) {
		this.x = 300;
	}
}

Bullet.prototype.draw = function (ctx) {
    this.ctx.drawImage(this.spriteSheet,
                 this.x, this.y, 30, 30);
};

