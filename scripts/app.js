require(['jquery','kinetic','game-settings', 'map', 'baddy', 'tower', 'ranges'], function($, k, game, map, baddy, tower, ranges) {
	//add the map to stage.
	game.stage.add(map.createmap());
	
	var baddys = [];
	var baddysprites = [];
	
	var Tower = new tower({posX:300, posY:300, range:1 });
	tsp = Tower.getSprite();
	game.towerlayer.add(tsp);
	
	points = [];
	pointsKey = 0;
	for(i=0; i<ranges[Tower.range].length; i++) {
		var globalpoints = ranges[Tower.range][i];
		points[pointsKey] = Math.round(globalpoints.x) + Tower.posX;
		points[pointsKey+1] = Math.round(globalpoints.y) + Tower.posY;
		pointsKey += 2;
	}
	console.log(points);
	var player = new Kinetic.Layer();
  var poly = new Kinetic.Polygon({
    points: points,
    fill: 'rgb(200,200,200)',
  });
  // add the shape to the layer
  player.add(poly);
  // add the layer to the stage
  game.stage.add(player);
	
	game.stage.add(game.towerlayer);
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
	
	var anim = new k.Animation(function(frame) {
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
		
    anim.start();

	

} );