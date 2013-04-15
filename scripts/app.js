require(['jquery','kinetic','game-settings', 'map', 'baddy', 'tower', 'ranges'], function($, k, game, map, baddy, tower, ranges) {
	//add the map to stage.
	game.stage.add(map.createmap());
	
	var baddys = [];
	var baddysprites = [];
	
	var Tower = new tower({posX:320, posY:300, range:2 });
	tsp = Tower.getSprite();
	game.towerlayer.add(tsp);

	
	game.stage.add(game.towerlayer);
	game.stage.add(game.bulletlayer);
	tsp.start();
	
	for(i=0; i<10; i++) {
		baddys[i] = new baddy({map:map, speed:2});
		baddysprites[i] = baddys[i].getSprite();
		game.baddylayer.add(baddysprites[i]);
		baddysprites[i].hide();
	}
	
	game.stage.add(game.baddylayer);
	var running;
	var animatingcount = 0;
	var pace = 1;
	var bullets = [];
	speed = 10;
	
	function Bullet(destinationX, destinationY) {
	    this.x = tsp.getX() + (game.settings.gridSquares / 2);
	    this.y = tsp.getY() + (game.settings.gridSquares / 2);

	    var targetX = destinationX - this.x,
	        targetY = destinationY - this.y,
	        distance = Math.sqrt(targetX * targetX + targetY * targetY);

	    this.velX = (targetX / distance) * speed;
	    this.velY = (targetY / distance) * speed;
	    this.finished = false;

	    this.projectile = new Kinetic.Circle({
	        x: this.x,
	        y: this.y,
	        radius: 2,
	        fill: 'black',
	        name: 'projectile'
	    });

	    this.draw = function (index) {

	        this.x += this.velX;
	        this.y += this.velY;

	        var mayDelete = false;
	        this.projectile.setAbsolutePosition(this.x, this.y);
					

	        if (mayDelete == true) {
	            this.projectile.remove();
	            bullets.splice(index, 1);
	        }

	       game.bulletlayer.draw();
	    }
	}
	
	function fireBullet(baddy) {
	   bullet = new Bullet(baddy.getX()+(game.settings.gridSquares/2), baddy.getY()+(game.settings.gridSquares/2));
	   game.bulletlayer.add(bullet.projectile);
	   bullets.push(bullet);
	}
	
	interval = 1;
	var bulletsamimation = new k.Animation( function(frame) {
		var time = frame.time;
		for (i=0; i<baddys.length; i++) {
		
			if(Tower.inRange(baddysprites[i]) && (time - Tower.lastShot > Tower.fireSpeed  || Tower.lastShot == 0)){
				Tower.lastShot = time;
				fireBullet(baddysprites[i]); 
			}
			
		}
	
		if (bullets.length > 0) {
       for (var i = 0; i < bullets.length; i++) {
           bullets[i].draw(i);
       }	
		}
		
	},game.bulletlayer);
	
	var anim = new k.Animation( function(frame) {
			var time = frame.time,
			timeDiff = frame.timeDiff,
			frameRate = frame.frameRate;
			for(i = 0; i<animatingcount ; i++) {
				
				if(baddys[i].endpath) {
					// the baddy is at the end of the path. remove it from 
					// stage and array;
					baddysprites[i].stop();
					baddysprites[i].remove();
					baddysprites.splice(i,1);
					baddys.splice(i,1);
					animatingcount--;
					i--;
					if(i == baddys.length) {
						this.stop();
					}
				} else {
					// the baddy is in play, animate baddy.
					if (baddysprites[i].getVisible() == false) {
						baddysprites[i].start();
						baddysprites[i].show();
					}
					coords = 	baddys[i].moveBaddy();
					baddysprites[i].setX(coords.x);
					baddysprites[i].setY(coords.y);
					
				}
				
	
			}// close baddy animation loop
			
			if(animatingcount < baddys.length && time >= pace * 2000) {
				pace++;
				animatingcount++;
			}
			
		}, game.baddylayer);
		
		bulletsamimation.start();
    anim.start();

	

} );