define(['kinetic', 'tower', 'game-settings', 'level'],function(k, tower, game, level){
	
	return {
		score: 0,
		resources: 100,
		buildPhase: true,
		layer: game.uilayer,

	 buildMenu: function(x,y) {
			group = new k.Group;
			addButton = new k.Rect({
				x: x,
				y: y,
				width:40,
				height:20,
				fill: "white",
				listening: true
			});
			
			$this = this;
			
      addButton.on('mouseout', function() {
         this.remove();
				 $this.layer.draw();
      });
      addButton.on('mouseup', function() {
       $this.buildTower(this.getX(),this.getY(),'basic');
			 this.remove();
			 $this.layer.draw();
      });

			group.add(addButton);
			this.layer.add(group);
			this.layer.draw();
		},
		
		buildTower: function(x,y,type) {

			level.addTower(x,y);
		
		},
		
		scoreBoard: function() {
			
		}
			
	}
});