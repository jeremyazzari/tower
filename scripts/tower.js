define(['kinetic', 'map', 'game-settings'], function(k, map, game) {
	var tower = function (settings) {
		this.posX = settings.posX || 10;
		this.posY = settings.posY || 10;
		this.height = game.settings.gridSquares;
		this.width = game.settings.gridSquares;
		this.name = settings.name || 'basic';
		this.range = settings.range || 2;
		this.damage = settings.damage || 1;
		this.level = settings.level || 0;
		this.fireSpeed = settings.speed || 750;
		this.cost = settings.cost || 80;
	}

	tower.prototype = {
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
			var width = baddy.getWidth();
			var height = baddy.getHeight();
			
			if(!this.rpoints.length || this.range != this.crange) {
				this.rpoints = setRangePoints();
			}
			
			for(i=0; i<rpoints.length; i++) {
				if (bY + height >= rpoints[i].y && bY <= rpoints[i].y && bX <= rpoints[i].x  && bX + width >= rpoints[i].x) {
					return true;
				}
			}
			
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
				var dx = baddy.posX + (baddy.width);
				var dy = baddy.posY + (baddy.height);
				//bullet goes here
				
				baddy.hitPoints -= this.damage;
				this.lastShot = (new Date).getTime();
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