define([], function() {
	return  {
		basic: {
			cost: 80,
			damage:10,
		},
		fire: {
			
		},
		getType: function(type) {
			for(var x in this) {
				if (type == x) {
					return x;
				}
			}
			return false;
		},
	}
});