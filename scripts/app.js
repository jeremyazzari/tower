require(['jquery','kinetic','game-settings', 'map', 'baddy'], function($, k, game, map, baddy) {
	//add the map to stage.
	game.stage.add(map.createmap());
	
	var baddys = [];
	var baddysprites = [];
	
	for(i=0; i<10; i++) {
		baddys[i] = new baddy({map:map, speed:2});
		baddysprites[i] = baddys[i].getSprite();
		game.baddylayer.add(baddysprites[i]);
		baddysprites[i].hide();
	}
	
	game.stage.add(game.baddylayer);
	var running;
	var animatingcount = 0;
	
	var anim = new k.Animation(function(frame) {
			var time = frame.time,
			timeDiff = frame.timeDiff,
			frameRate = frame.frameRate;
			
			for(i = 0; i<animatingcount ; i++) {
				if(baddys[i].endpath) {
					baddysprites[i].stop();
					baddysprites[i].remove();
					if(i == baddys.length) {
						this.stop();
					}
				}
				if(baddysprites[i].getVisible() == false) {
					baddysprites[i].start();
					baddysprites[i].show();
				}
				coords = 	baddys[i].moveBaddy();
				baddysprites[i].setX(coords.x);
				baddysprites[i].setY(coords.y);
			}
			if(animatingcount < baddys.length && (time) >= animatingcount * 2000){
				animatingcount++;
			}
		}, game.baddylayer);
		
		//addBaddytoAnimate(0);
    anim.start();

	

} );