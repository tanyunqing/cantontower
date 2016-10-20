//All functions unless otherwise noted take MORE positioning functions for arguments
SN.positioning = {
	//Makes a cubic bezier curve from a to d, with control points b and c
	bezier: function(startT, endT, a, b, c, d) {
		return function(t) {
			//Make sure we're inside the desired t range
			if(t < startT || t > endT) {
				return NaN;
			}
			//Translate world t to local bezier t
			t = (t - startT) / (endT - startT);
			//Compute bezier coordinate
			return Math.pow(1-t, 3) * a(t) +
				3 * Math.pow(1-t, 2) * t * b(t) +
				3 * (1-t) * Math.pow(t, 2) * c(t) +
				Math.pow(t, 3) * d(t);
		}
	},
	
	linear: function(startT, endT, a, b) {
		return function(t) {
			//Make sure we're inside the desired t range
			if(t < startT || t > endT) {
				return NaN;
			}
			//Translate world t to local bezier t
			t = (t - startT) / (endT - startT);
			//Compute bezier coordinate
			return (1-t) * a(t) + t * b(t);
		}
	},
	
	exponentialCenter: function(startT, endT, a, b, c) {
		return function(t) {
			//Make sure we're inside the desired t range
			if(t < startT || t > endT) {
				return NaN;
			}
			//Translate world t to local t
			t = (t - startT) / (endT - startT);
			//Determine which side of the exponent we're on
			if(t <= 0.5) {
				var expoT = t * 2;
				return (b(t)-a(t)) * (1 - Math.pow( 2, -10 * expoT )) + a(t);
			} else {
				var expoT = (t - 0.5) * 2;
				return (c(t)-b(t)) * Math.pow( 2, 10 * (expoT - 1) ) + b(t);
			}
		}
	},
	
	plus: function(a, b) {
		return function(t) { return a(t) + b(t); }
	},
	
	minus: function(a, b) {
		return function(t) { return a(t) - b(t); }
	},
	
	//Takes array of segment objects with start (t), end (t), segment(position function)
	//e.g. spline([{start:0,end:8,segment:linear(0,8,...)},{...}...])
	spline: function(segments) {
		return function(t) {
			for(var i = 0; i < segments.length; i++) {
				var segment = segments[i];
				if(t >= segment.start && t <= segment.end) {
					return segment.segment(t);
				}
			};
			return NaN;
		}
	},

  divide: function(a, b) {
    return function(t) { return a(t) / b(t); }
  },
	
	//P is a constant, not a function
	percent: function(a, b, p) {
		return function(t) { return a(t) * p + b(t) * (1-p); }
	},
	
	//Does not call functions, this is how you stop the madness
	constant: function(c) {
		return function(t) { return c; }
	}
}