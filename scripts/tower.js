define(['kinetic', 'map', 'game-settings', 'utility'], function(k, map, game, utility) {
	var tower = function (settings) {
		
		this.id = utility.getId(); 
		this.posX = settings.posX || 10;
		this.posY = settings.posY || 10;
		this.height = game.settings.gridSquares;
		this.width = game.settings.gridSquares;
		this.name = settings.name || 'basic';
		this.range = settings.range*(game.settings.gridSquares/2) || 2*(game.settings.gridSquares/2);
		this.damage = settings.damage || 3;
		this.level = settings.level || 0;
		this.fireSpeed = settings.speed || 1000;
		this.cost = settings.cost || 80;
	}

	tower.prototype = {
		bullets: new Array(),
		lastShot: 0,
		getRangeIndicator: function () {
			var rangeCircle = new Kinetic.Circle({
	        x: this.posX + (this.width/2),
	        y: this.posY + (this.height/2),
	        radius: this.range,
	        fill: 'blue',
					opacity: 0.5,
	      });
			return rangeCircle;
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