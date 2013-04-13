define(['kinetic', 'map', 'game-settings'], function(k, map, game) {
	var tower = function (settings) {
		this.posX = settings.posX;
		this.posY = settings.posY;
		this.squares = settings.squares || 1;
		this.squareHeight = squareHeight;
		this.squareWidth = squareWidth;
		this.height = squareHeight * this.squares;
		this.width = squareWidth * this.squares;
		this.type = settings.type || 'basic';
		this.range = settings.range || 2 * squareWidth;
		this.damage = settings.damage || 1;
		this.level = settings.level || 0;
		this.speed = settings.speed || 750;
		this.cost = settings.cost || 80;
	}

	tower.prototype = {
			lastShot: 0,
		
			render: function() {
				 context.fillStyle = 'brown';
				 context.fillRect(this.posX*this.squareWidth , this.posY*this.squareHeight ,this.width,this.height);
			},
		
			fire: function(baddy) {
				var dx = baddy.posX + (baddy.width);
				var dy = baddy.posY + (baddy.height);
				context.beginPath();
				context.moveTo(this.posX*squareWidth + (squareWidth/2), this.posY*squareHeight + (squareWidth/2));
				context.lineTo(dx,dy);
				context.lineWidth = 3;
			  context.strokeStyle = '#ff0000';
				context.stroke();
				baddy.hitPoints -= this.damage;
				this.lastShot = (new Date).getTime();
			},
		
			inRange: function(baddy) {ZA
				if(Math.abs(this.posY*this.squareWidth - baddy.posY) <= this.range &&  Math.abs(this.posX*this.squareWidth - baddy.posX ) <= this.range) {
			    return true;
				}
				return false;
			},
		
			shotReady: function() {
				var curr = (new Date).getTime();
				if(curr - this.lastShot > this.speed) {
					return true;
				}
				return false;
			}
	}
});