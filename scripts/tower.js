define(['kinetic', 'map', 'game-settings', 'utility'], function(k, map, game, utility) {
	var tower = function (settings) {
		this.posX = settings.posX || 10;
		this.posY = settings.posY || 10;
		this.height = game.settings.gridSquares;
		this.width = game.settings.gridSquares;
		this.name = settings.name || 'basic';
		this.range = settings.range || 2;
		this.damage = settings.damage || 1;
		this.level = settings.level || 0;
		this.fireSpeed = settings.speed || 400;
		this.cost = settings.cost || 80;
	}

	tower.prototype = {
		lastShot: 0,
		getRangeIndicator: function () {
			var layer = game.baddylayer;
			var rangeCircle = new Kinetic.Circle({
	        x: this.posX + (width/2),
	        y: this.posY + (height/2),
	        radius: this.range * game.settings.gridSquares,
	        fill: 'red',
	      });
			return rangeCircle;
	},		
	
	inRange: function(baddy) {
		var bX = baddy.getX();
		var bY = baddy.getY();
		var delta = game.settings.gridSquares;
		var offset = (game.settings.gridSquares/2);
		var radius = this.range * offset;
		var centerX = this.posX + offset;
		var centerY = this.posY + offset;
		
		if(utility.isInCircle(bX, bY+delta, centerX, centerY, radius) ) {
			return true;
		}
		else if(utility.isInCircle(bX+delta, bY+delta, centerX, centerY, radius) ) {
			return true;
		}
		else if(utility.isInCircle(bX+delta, bY, centerX, centerY, radius) ) {
			return true;
		}
		else if(utility.isInCircle(bX, bY, centerX, centerY, radius) ) {
			return true;
		}
		return false;
		
	},
	getSprite: function () {
		var animations = {
			bouncing: [{
			          x: 0,
			          y: 0,
			          width: 40,
			          height: 40
			        }, {
			          x: 40,
			          y: 0,
			          width: 40,
			          height: 40
			        }, {
			          x: 80,
			          y: 0,
			          width: 40,
			          height: 40
			        },{
			          x: 120,
			          y: 0,
			          width: 40,
			          height: 40
			        },{
				        x: 80,
			          y: 0,
			          width: 40,
			          height: 40
			        },{
				        x: 40,
			          y: 0,
			          width: 40,
			          height: 40
			        },{
				        x: 0,
			          y: 0,
			          width: 40,
			          height: 40
			        }]
			};
		
			var imageObj = new Image();
			tsp = new k.Sprite({
	        	x: this.posX, 
						y: this.posY,
	          image: imageObj,
	          animation: 'bouncing',
	          animations: animations,
	          frameRate: 10,
	          index: 0
	    });
	
			imageObj.src = 'sprites/test_tower.png';
	  	return tsp;
	
		},
		
		fire: function(baddy) {
			offset = game.settings.gridSquares / 2;
			var dx = baddy.getX();
			var dy = baddy.getY();
			//bullet goes here
			
		  var targetX = dx - this.posX,
		      targetY = dy - this.posY,
		      distance = Math.sqrt(targetX * targetX + targetY * targetY);
		
		 	bullet = new k.Circle({
			    		x: this.posX,
	        		y: this.posY,
	        		radius: 3,
	        		fill: 'red',
	      			});
	
			return {
				bullet: bullet,
			  velX: (dx / distance) * 3,//speed;
			  velY: (dy / distance) * 3,//speed;
				dX: dx,
				dY: dy,
			  finished : false,
			}
	
		},
	
		shotReady: function() {
			var curr = (new Date).getTime();
			if(curr - this.lastShot > this.speed) {
				return true;
			}
			return false;
		}
	}
	
	return tower;
});