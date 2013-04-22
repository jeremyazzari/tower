define(['game-settings','tower'], function(game,tower){

		var Towers = [];


		return {
			towers: Towers,
			addTower: function (x,y) {
				newTower =  new tower({posX:x, posY:y, range:2, speed:200});
				this.towers[this.towers.length] = newTower;
				tsp = newTower.getSprite();
				game.towerlayer.add(newTower.getRangeIndicator());
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
