define(['game-settings','tower'], function(game,tower){
	//TODO: Replace with persistant solution.

		var Towers = [];
	/*	Towers[0] = new tower({posX:320, posY:300, range:3 });
		Towers[1] = new tower({posX:280, posY:340, range:3 });
		Towers[2] = new tower({posX:240, posY:340, range:3 });
		Towers[3] = new tower({posX:280, posY:380, range:4 });
		Towers[4] = new tower({posX:240, posY:380, range:4 });
	*/

		return {
			towers: Towers,
			addTower: function (x,y) {
				newTower =  new tower({posX:x, posY:y, range:3, speed:200});
				this.towers[this.towers.length] = newTower;
				tsp = newTower.getSprite();
				game.towerlayer.add(tsp);
				game.towerlayer.draw();
				tsp.start();
			},
			refresh: function() {
				towers = [];
				for(i=0; i<this.towers.length; i++) {
					tsp = Towers[i].getSprite();
					game.towerlayer.add(tsp);
					tsp.start();
				}
				return this.towers;
			}
		};
		
		

});
