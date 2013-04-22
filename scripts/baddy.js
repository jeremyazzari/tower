define(['kinetic', 'game-settings', 'map', 'utility'], function(k, game, map, utility) {
	
		baddy = function (settings) {
			var map = settings.map;
			this.layer = game.layer;
			this.map = map;
			this.posX = settings.posX || map.spawnX * game.settings.gridSquares;
			this.posY = settings.posY || map.spawnY * game.settings.gridSquares;
			this.sizeH = settings.sizeH || 1;
			this.sizeW = settings.sizeW || 1;
			this.height = game.settings.gridSquares * this.sizeH;
			this.width = game.settings.gridSquares * this.sizeW;
			this.type = settings.type || 'basic';
			this.level = settings.level || 0;
			this.hitPoints = settings.hitPoints || 10;
			this.bounty = settings.bounty || {resources: 1, points:5};
			this.speed  = settings.speed || 2;
		}
			
		baddy.prototype = {
			currNode: 0,
			dead: false,
			endpath:false,
			getSprite: function() {
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
				badguy = new k.Sprite({
							width: game.settings.gridSquares,
							height: game.settings.gridSquares,
		          image: imageObj,
		          animation: 'bouncing',
		          animations: animations,
		          frameRate: 10,
		          index: 0
		    });
			
				imageObj.src = 'sprites/test_ball.png';
				
		
		  	return badguy;
			},
			
			//Move the enemy along path.	
			moveBaddy: function() {
				if(this.currNode == 0) {
					this.currNode = 1;
				}
				var vX = this.posX - map.path[this.currNode+1][0] * game.settings.gridSquares;
				var vY = this.posY - map.path[this.currNode+1][1] * game.settings.gridSquares;
				
				var dx = map.path[this.currNode+1][0] * game.settings.gridSquares;
				var dy = map.path[this.currNode+1][1] * game.settings.gridSquares;
				
				vel = utility.getVelocity(this.posX, this.posY, dx, dy, this.speed);
			
				if(Math.abs(vX) <= this.speed && Math.abs(vY) <= this.speed) {
					this.currNode++;
				}
				
				this.posX += vel.x;
				this.posY += vel.y;
				
				if(this.hitPoints < 0) {
					this.dead = true;
				}
				else if(map.data[ map.path[ this.currNode ][1] ][ map.path[this.currNode][0] ] == 3) {
					this.endpath = true;
				}
				
				return{x: this.posX, y: this.posY};
			}
			
			
		}
		
		return baddy;
});