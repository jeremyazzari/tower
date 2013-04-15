require(['kinetic','game-settings', 'map', 'baddy', 'tower','utility'], function(k, game, map, baddy, tower, utility) {
	//add the map to stage.
	game.stage.add(map.createmap());
	/* testing Baddys */
	var baddys = [];
	var baddysprites = [];
	
	for(i=0; i<10; i++) {
		baddys[i] = new baddy({map:map, speed:2});
		baddysprites[i] = baddys[i].getSprite();
		game.baddylayer.add(baddysprites[i]);
		baddysprites[i].hide();
	}

	
	/* testing Towers*/
	var Towers = [];
  Towers[0] = new tower({posX:320, posY:300, range:3 });
	Towers[1] = new tower({posX:280, posY:340, range:3 });
	Towers[2] = new tower({posX:240, posY:340, range:3 });
	Towers[3] = new tower({posX:280, posY:380, range:4 });
	Towers[4] = new tower({posX:240, posY:380, range:4 });
	for(i=0; i<Towers.length; i++) {
		tsp = Towers[i].getSprite();
		game.towerlayer.add(tsp);
		tsp.start();
	}
	
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
				if(this.x < 0 || this.x > 20*game.settings.gridSquares || this.Y < 0 || this.Y > 15*game.settings.gridSquares) {
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
	

	
// Main animation loop.
	
	var animatingcount = 0; //incrementer for the number of baddys in the animating array;
	var pace = 1; //incrementer for spacing out the baddys.
	var anim = new k.Animation( function(frame) {
			var time = frame.time,
			timeDiff = frame.timeDiff,
			frameRate = frame.frameRate;
	 
			for(i = 0; i<animatingcount ; i++) {
				if(baddys.length > 0) {
					if(baddys[i].endpath || baddys[i].hitPoints < 1) {
						if(baddys[i].hitPoints < 1) {
							baddys[i].dead = true;
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
			
			if(baddy.length <= 0 ) {
				if(bullets.length <= 0) { 
					this.stop();
				} 
				else {
					animateBullets();
				}		
			}
			
			if(animatingcount < baddys.length && time >= pace * 2000) {
				pace++;
				animatingcount++;
			}
			
		}, game.baddylayer);
		
		// function to check range and shoot baddys.
		function assultBaddys(index, time) {
			//check if baddys in range.
			baddyX = baddysprites[index].getX();
			baddyY = baddysprites[index].getY();
			if(Towers.length > 0) {
				for(k=0; k < Towers.length; k++) {
					if(Towers[k].inRange(baddysprites[index]) && (time - Towers[k].lastShot > Towers[k].fireSpeed  || Towers[k].lastShot == 0)){
						Towers[k].lastShot = time;
						fireBullet(baddyX, baddyY,Towers[k].posX, Towers[k].posY, Towers[k].damage, 3); 
					}
				}
			}
			animateBullets(baddyX, baddyY, index);
		}
		
		//function to animate all bullets.
		function animateBullets(baddyX, baddyY, index) {
			if (bullets.length > 0) {
		   	for (var j = 0; j < bullets.length; j++) {
					//check for bullet collisions.
				 	if(utility.isInCircle(bullets[j].x, bullets[j].y, baddyX, baddyY, game.settings.gridSquares/1.5)) {
					 		bullets[j].hitTarget = true;
							baddys[index].hitPoints -= bullets[j].damage;
					}
					//sets bullet location.
		      bullets[j].draw(j);
		  	}
			 // redraw bullet layer.
			 game.bulletlayer.draw();
			}
		}
			//end bullet animation
		game.stage.add(game.towerlayer);
		game.stage.add(game.baddylayer);
		game.stage.add(game.bulletlayer);
		
		//bulletsamimation.start();
    anim.start();

	

} );