/*
  This is good for checking if one object collides with another!!
	
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
*/
define(['game-settings'], function(game) {
	
	var radiuss = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var angles = [0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360];
	var offset = (game.settings.gridSquares / 2);

	function setRangePoints() {
		var rpoints = new Array();
		for(j=0; j<radiuss.length; j++) {
			rpoints[j] = new Array();
			var radius = radiuss[j] * offset;
			for(i=0; i< angles.length; i++) {
				var point = getRangePoint(radius, angles[i]);
				rpoints[j][i] = point;
			}
		}
		return rpoints;
	};
	
	function getRangePoint(radius, angleInDegrees) {
		 var x = (radius * Math.cos(angleInDegrees * Math.PI / 180)) + offset;
     var y = (radius * Math.sin(angleInDegrees * Math.PI / 180)) + offset;
		return {x:x, y:y}
	};
	
	var ranges = setRangePoints();
	return ranges;

});