define(['game-settings'], function(game) {
	return {
		isInCircle: function(x,y, centerX, centerY, radius) {
			var bigX = (x-centerX);
			var bigY = (y - centerY);
			return ((bigX * bigX) + (bigY * bigY)) < (radius * radius);
		}
	}
}); 