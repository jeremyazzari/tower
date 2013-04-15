define(['kinetic'], function(k) {
	
  var settings = {
		cols : 100,
	  rows : 100,
	  gridSquares : 40,
	};
	
  var stage = new k.Stage({
        container: 'game-container',
        width: settings.cols*settings.gridSquares,
        height: settings.rows *settings.gridSquares
      });

	return {
		towerlayer: new k.Layer(),
		baddylayer: new k.Layer(),
		uilayer: new k.Layer(),
		bulletlayer: new k.Layer(),
		messagelayer: new k.Layer(),
		stage: stage,
		settings: settings
	}

});