define(['kinetic', 'game-settings', 'map'], function(k, game, map) {
	
		baddy = function (settings) {
			var map = settings.map;
			this.layer = game.layer;
			this.map = map;
			this.posX = settings.posX || map.spawnX*game.settings.gridSquares;
			this.posY = settings.posY || map.spawnY*game.settings.gridSquares;
			this.sizeH = settings.sizeH || 1;
			this.sizeW = settings.sizeW || 1;
			this.height = game.settings.gridSquares * this.sizeH;
			this.width = game.settings.gridSquares * this.sizeW;
			this.type = settings.type || 'basic';
			this.level = settings.level || 0;
			this.hitPoints = settings.hitPoints || 10;
			this.bounty = settings.bounty || {gold: 10, points: 20};
			this.speed  = settings.speed || 2;
		}
			
		baddy.prototype = {
			currNode: 0,
			velocityX:0,
			velocityY:0,
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
		        	x: this.posX, 
							y: this.posY,
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
					this.posX = map.path[this.currNode][0]*game.settings.gridSquares;
					this.posY = map.path[this.currNode][1]*game.settings.gridSquares;
				}
				var vX = this.posX - map.path[this.currNode+1][0] * game.settings.gridSquares;
				var vY = this.posY - map.path[this.currNode+1][1] * game.settings.gridSquares;

				if(Math.abs(vX) <= this.speed && Math.abs(vY) <= this.speed) {
					this.currNode++;
				}

				this.velocityX = 0;
				this.velocityY = 0;
				var direction = Math.round(Math.random()) ;
				
				if (vX > 0) {	this.velocityX = -1;}
				if (vX < 0) {	this.velocityX = 1;}
				if (vY > 0) {	this.velocityY = -1;}
				if (vY < 0) {	this.velocityY = 1;}

				this.posX += this.velocityX * this.speed;
				this.posY += this.velocityY * this.speed;
				
				if(this.hitPoints < 0) {
					this.dead = true;
				}
				else if(map.data[ map.path[ this.currNode ][1] ][ map.path[this.currNode][0] ] == 3) {
					this.endpath = true;
				}
				
				return{x:this.posX, y:this.posY};
			}
			
			
		}
		
		return baddy;
});