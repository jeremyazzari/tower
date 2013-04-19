define(['kinetic', 'towertypes', 'game-settings', 'level'],function(k, tower, game, level){
	
	return {
	 score: 0,
	 resources: 100000,
	 lives: 10,
	 layer: game.uilayer,
	 scoreLayer: new k.Layer,
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
				this.remove()
        //$this.layer.remove();
				$this.layer.draw();
      });

      addButton.on('mouseup', function() {
	     $this.buildTower(this.getX(),this.getY(),'basic');
			 this.remove();
			 $this.layer.draw();
			 //$this.layer.remove();
			 //this.remove();
      });

			group.add(addButton);
			this.layer.add(group);
			this.layer.draw();
		},
		
		buildTower: function(x,y,type) {
		// TODO: This needs to handle all tower types. I is currently hard coded.
		//	var t = tower.getType('basic');
		//	console.log(t);
			if(tower.basic.cost <= this.resources) {
				this.resources -= tower.basic.cost;
				this.updateScore();
			 	level.addTower(x,y);
			}
		},
		
		scoreEl: new Kinetic.Text({
		        x: 10,
		        y:480,
		        text: '',
		        fontSize: 18,
		        fontFamily: 'Calibri',
		        fill: '#555',
		        width: 120,
		        padding: 10,
		        align: 'center'
		      }),
		scoreBoardInit: function() {
			this.scoreEl.setText('Score: ' + this.score + "\nResourcs: " + this.resources);
			
	     var rect = new Kinetic.Rect({
        x: 10,
        y: 480,
        stroke: '#555',
        strokeWidth: 5,
        fill: '#ddd',
        width: 120,
        height: this.scoreEl.getHeight(),
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: [10, 10],
        shadowOpacity: 0.2,
        cornerRadius: 10
      });
				
			group = new k.Group;
			group.add(rect);
			group.add(this.scoreEl);
			this.layer.add(group);
			this.layer.draw();
		},
		updateScore: function(bounty) {
			if(bounty) {
				this.score += bounty.points || 0;
				this.resources += bounty.resources || 0;
			}
			
			this.scoreEl.setText('Score: ' + this.score + "\nResourcs: " + this.resources);
			this.layer.draw();
		}
			
	}
});