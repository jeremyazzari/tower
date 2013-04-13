define(['jquery', 'kinetic', 'game-settings'], function($, k, game) {
	
	var map = {
		layer: new k.Layer(),
		group: new k.Group(),                          
		numWalkable: 0,
		spawnX: null,
		spawnY: null,
		path: null,
		backgroundImage: null,
		// Brick Layout: 0 buildable, 1 walkable, 2 start, 3 is end. 
		data :[
		  [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		  [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		  [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0],
		  [0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,1,0,0],
		  [0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,1,1,1,3],
		  [0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
		  [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0],
		  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
		  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
		  [0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		],

		// iterate through the bricks array and draw each brick using drawBrick()
		createmap: function (){
		    for (var i=0; i < this.data.length; i++) {
		        for (var j=0; j < this.data[i].length; j++) {
								if(this.data[i][j] == 2) {
									this.spawnX = j;
									this.spawnY = i;
								}
								if(j != 0) {
									this.numWalkable++;
								}
		            this.drawSquare(j,i,this.data[i][j]);
		        }
		    }
				if(!this.path) {
					this.getPath();
				}
				
				this.layer.add(this.group); //add group to layer.
				return this.layer;
		},
		
		getPath :function () {
			var currY = this.spawnY;
			var currX = this.spawnX;
			var closed = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];//dumb.
			this.path = [];
			
			for(i=0; i<this.numWalkable; i++) {
				this.path[i] = [currX, currY];
				closed[currY][currX] = true;
				
				if(this.data[currY][currX+1] != 0 && !closed[currY][currX+1]) { 
						currX++;
				} else if (this.data[currY+1][currX] != 0 && !closed[currY+1][currX]) {
						currY++;
				} else if (this.data[currY][currX-1] != 0 && !closed[currY][currX-1]) {
					  currX--;
				} else if (this.data[currY-1][currX] != 0 && !closed[currY-1][currX]) {
						currY--;
				}	
			}
		},
		
		// draw a single map square
		drawSquare: function(x,y,type){   
		    switch(type){ // if brick is still visible; three colors for three types of bricks
		        case 1:
		            var fillcolor = 'lightblue';
		            break;  
		        case 2:
		            var fillcolor = 'yellow';
		            break;
				    case 3:
								var fillcolor = 'yellow';
								break;
		        case 0:
								var fillcolor = 'pink';
								break;
		        default:
		            //context.clearRect(x*squareWidth,y*squareHeight,squareWidth,squareHeight);
		            break;

		    }
	      var rect = new k.Rect({
	        x: x * game.settings.gridSquares,
	        y: y * game.settings.gridSquares,
	        width: game.settings.gridSquares,
	        height: game.settings.gridSquares,
	        fill: fillcolor,
	      });
				
	      // add the shape to the layer
	      this.group.add(rect);
    }	
	}
	return map;
	
});