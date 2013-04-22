define(['game-settings'], function(game) {
	return {
		isInCircle: function( x1, y1, x2, y2, r1, r2) {
			d = this.getDistance(x1,y1,x2,y2);
			return d.distance < (r1 + r2);
		},
		getDistance: function ( sX, sY , dX, dY) {
			var tx = dX - sX;
			var ty = dY - sY;
			d = {
			 targetX: tx,
       targetY: ty,
			 distance : Math.sqrt(tx * tx + ty * ty),
			}
			return d;
		},
		getVelocity: function(startX, startY, destinationX, destinationY, speed){  
			 d = this.getDistance(startX, startY, destinationX, destinationY);
			console.log(startX, startY, destinationX, destinationY);
			 vel = {};
		   vel.x = (d.targetX / d.distance) * speed;
		   vel.y = (d.targetY / d.distance) * speed;
		
			 return vel;
		},
		getId: function() {
			'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			    return v.toString(16);
			});
		}
	}
}); 