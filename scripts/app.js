require(['kinetic','game-settings', 'map', 'baddy', 'tower','utility', 'level','ui'], function(k, game, map, baddy, tower, utility, level,ui) {
	//add the map to stage.
	game.stage.add(map.createmap());

	ui.scoreBoardInit();
	/* testing Baddys */
	var baddys = [];
	var baddysprites = [];
	
	for(i=0; i<100; i++) {
		baddys[i] = new baddy({map:map, speed:2, hitPoints:24});
		baddysprites[i] = baddys[i].getSprite();
		game.baddylayer.add(baddysprites[i]);
		baddysprites[i].hide();
	}

	/* testing Towers from level.js */
	var Towers = level.towers;
	level.refresh();
	
	
	imgBullet = new Image();
	imgBullet.src = 'sprites/bullet.gif';
	
	/* testing bullets */
	var bullets = [];
	speed = 1;
	
	function Bullet(destinationX, destinationY, x, y, damage, speed) {
			this.hitTarget = false; // Flag to remove landed bullets.
			this.finished = false; // Flag to remove stray bullets.
			this.damage = damage;
			
			// Bullet start position.
	    this.x = x + (game.settings.gridSquares / 2);
	    this.y = y + (game.settings.gridSquares / 2);
			
			// Bullet Destinaton.
	    var targetX = destinationX - this.x,
	        targetY = destinationY - this.y,
	        distance = Math.sqrt(targetX * targetX + targetY * targetY);
			
			// Bullet Velocity.
	    this.velX = (targetX / distance) * speed;
	    this.velY = (targetY / distance) * speed;
	  
	    this.projectile = new Kinetic.Image({
		          x: this.x,
		          y: this.y,
		          image: imgBullet,
		          width: 3,
		          height: 3,
		        });
		
	 
	
	    this.draw = function (index) {
				// check if bullet hit target.
					
				if(this.x <= 0 || this.x >= 20*game.settings.gridSquares || this.Y <= 0 || this.Y >= 10*game.settings.gridSquares) {
					this.finished = true;
				}
				if (this.hitTarget == true || this.finished == true) {
            this.projectile.remove();
            bullets.splice(index, 1);
        } 
				// Bullet live update layer.
				else {
        	this.x += this.velX;
	        this.y += this.velY;	   
	        this.projectile.setAbsolutePosition(this.x, this.y);
			  }
			
	    }
	}
	
	function fireBullet(bx, by, x, y, damage, speed) {
	   bullet = new Bullet(bx +(game.settings.gridSquares/2), by+(game.settings.gridSquares/2) , x, y, damage, speed);
	   game.bulletlayer.add(bullet.projectile);
	   bullets.push(bullet);
	}
	
	var bullanim = new k.Animation( function(frame) { 
		if(bullets.length > 0) {
			for (var j = 0; j < bullets.length; j++) {
				//check for bullet collisions.
				bullets[j].draw(j);
		 	}
			game.bulletlayer.draw();
		}
	}, game.bulletlayer);
	
// Main animation loop.
bullanim.start();
	
	var animatingcount = 0; //incrementer for the number of baddys in the animating array;
	var pace = 1; //incrementer for spacing out the baddys.
	
	var anim = new k.Animation( function(frame) {
			var time = frame.time,
			timeDiff = frame.timeDiff,
			frameRate = frame.frameRate;
	 	
			for(i = 0; i<animatingcount ; i++) {
				//best place so far to animate bullets!
				baddyX = baddysprites[i].getX();
				baddyY = baddysprites[i].getY();
				bulletCollisions(i);
			  //game.bulletlayer.draw();
			
				if(baddys.length > 0) {
					if(baddys[i].endpath || baddys[i].hitPoints < 1) {
						if(baddys[i].hitPoints < 1) {
							baddys[i].dead = true;
							ui.updateScore(baddys[i].bounty);
						}
						// the baddy is at the end of the path or dead. remove it from the stage and array;
						baddysprites[i].stop();
						baddysprites[i].remove();
						baddysprites.splice(i,1);
						baddys.splice(i,1);
						animatingcount--;
						i--;
					} else {
						// the baddy is in play, animate baddy.
						if (baddysprites[i].getVisible() == false) {
							baddysprites[i].start();
							baddysprites[i].show();
						}
						coords = baddys[i].moveBaddy();
						baddysprites[i].setX(coords.x);
						baddysprites[i].setY(coords.y);
				
						assultBaddys(i, time);
					}
				}
			}// close baddy animation loop
			
			if(animatingcount < 0 ) {	
					game.bulletlayer.removeChildren();
					this.stop();
			}
	
			if(animatingcount < baddys.length && time >= pace * 1000) {
				pace++;
				animatingcount++;
			}
			
		}, game.baddylayer);
		
		// function to check range and shoot baddys.
		function assultBaddys(index, time) {
			//check if baddys in range.
			baddyX = baddysprites[index].getX();
			baddyY = baddysprites[index].getY();
			
			Towers = level.towers;
			if(Towers.length > 0) {
				for(k=0; k < Towers.length; k++) {
					if(Towers[k].inRange(baddysprites[index]) && (time - Towers[k].lastShot > Towers[k].fireSpeed  || Towers[k].lastShot == 0)){
						Towers[k].lastShot = time;
						fireBullet(baddyX, baddyY,Towers[k].posX, Towers[k].posY, Towers[k].damage, 6); 
					}
				}
			}
			
		}
		
		//function to animate all bullets.
		function bulletCollisions(index) {
			if (bullets.length > 0) {
		   	for (var i = 0; i < bullets.length; i++) {
					baddyX = game.baddylayer.children[index].getX();
					baddyY = game.baddylayer.children[index].getY();
					//check for bullet collisions.
				 	if(utility.isInCircle(bullets[i].x, bullets[i].y, baddyX, baddyY, game.settings.gridSquares/1.9)) {
					 		bullets[i].hitTarget = true;
							baddys[index].hitPoints -= bullets[i].damage;
							bullets[i].draw(i);
					}
		  	}
			}
		}
			//end bullet animation
		
		game.stage.add(game.baddylayer);
		game.stage.add(game.towerlayer);
		game.stage.add(game.bulletlayer);
		game.stage.add(game.uilayer);
    anim.start();

	

} );