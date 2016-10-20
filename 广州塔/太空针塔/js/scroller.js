SN.buildScroller = function($target, maxScroll) {

  window.isWindows = function() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('win') != -1);
  }

  var isFirefox = function() {
    return /firefox/i.test(navigator.userAgent)
  };

	var scroll = 0;
	var speed = 0;
	var friction = 0;

	var dragging = false;
	var lastDrag = 0;
	var dragStartTime = 0;
	var initialDrag = 0;

	function wheelScroll(event) {
    event.preventDefault();

    var delta = event.originalEvent.wheelDelta ||
      -event.originalEvent.detail * event.originalEvent.mozMovementY * 0.05 ||
      -event.originalEvent.detail;

    if (isWindows() || isFirefox()) {
      delta = delta * 2;
      friction = 0.93;
    }
    else {
      friction = 0.93;
    }
    speed = delta * 0.002;
    //scroll += delta * 0.05;
	}
	
	function mouseStart(event) {
    //if the user is clicking on a link, don't handle this event
    //(fixes iOS bug where links on the stage were losing their events to the stage)
		if(event.target && event.target.getAttribute('data-link') ) {
		// fixes similar 2014 Android bug that occurs on versions of Chrome above 18 
    		console.log("page should redirect to " + event.target.getAttribute('data-link'));
    		document.location.href = event.target.getAttribute('data-link');
		}
		else if(event.target && (event.target.tagName.toLowerCase() === 'a' || $(event.target).hasClass("clickable"))) {
		  /* if (!isWindows()) event.cancel() */
		  console.log('event should not be passed to scroller');
		}
		else{
		  event.preventDefault();
		  var eventY = event.pageY || event.originalEvent.touches[0].pageY;
		  dragging = true;
		  lastDrag = initialDrag = eventY;
		  speed = friction = 0.0;
		  dragStartTime = (new Date()).getTime();
    	}
	}

	function mouseMove(event) {
		event.preventDefault();
		if(dragging) {
			var eventY = event.pageY || event.originalEvent.touches[0].pageY;
			scroll += (eventY - lastDrag)
			lastDrag = eventY;
			speed = friction = 0.0;
		}
	}

	function mouseEnd(event) {
		event.preventDefault();
		var eventY = event.pageY || lastDrag;
		dragging = false;
		var dragTime = (new Date()).getTime() - dragStartTime;
		speed = (eventY - initialDrag) / dragTime;
		friction = 0.97;
	}

	$target.on("mousewheel", wheelScroll);
	$target.on("DOMMouseScroll", wheelScroll);

	$target.on("touchstart", mouseStart);
	$target.on("mousedown", mouseStart);

	$target.on("touchmove", mouseMove);
	$target.on("mousemove", mouseMove);

	$target.on("touchend", mouseEnd);
	$target.on("mouseup", mouseEnd);

	var timeSinceScroll = 1000000;

	return {
		getScroll: function() {return scroll; },
		updateFrame: function(deltaT) {
			scroll += speed * deltaT;
			speed = speed * friction;
			if(Math.abs(speed) < 0.01) {
				speed = 0;
				timeSinceScroll += deltaT;
				if(timeSinceScroll > 400) { /* was 1000 */
          if (window.openMenu) window.openMenu();
				}
			} else {
				timeSinceScroll = 0;
        if (window.closeMenu) window.closeMenu();
			}

			if(scroll < 0) scroll = 0;
			if(scroll > maxScroll) scroll = maxScroll;
		},
		setScroll: function(newScroll) { scroll = newScroll; speed = 0;},
		getTimeSinceScroll: function() { return timeSinceScroll; }
	}
}

var Scroller = function(target, maxScroll) {
    this.scrollPos = 0;
    this.maxScroll = maxScroll;
    this.target = target;
    this.enabled = true;

    // Mouse drag
    this.target.onmousedown = this.onmousedown.bind(this);

    // Mouse wheel
    if (this.target.addEventListener) {
        this.target.addEventListener("mousewheel", this.onmousewheel.bind(this), false);
        this.target.addEventListener("DOMMouseScroll", this.onmousewheel.bind(this), false);
    }
    else {
        this.target.attachEvent("onmousewheel", this.onmousewheel.bind(this));
    }

    // Touch drag
    this.target.addEventListener("touchstart", this.touchstart.bind(this), false);
}

Scroller.prototype = {
    WHEEL_SPEED: 4, //0.8,

    DRAG_SPEED: 0.025,

    TOUCH_SPEED: 0.4,

    clampScrollPos: function(newPos) {
        if (!this.enabled) {
            return;
        }

        this.scrollPos = Math.max(0, Math.min(this.maxScroll, newPos));
    },

    onmousedown: function(e) {
        //e.preventDefault();

        if (!this.enabled) {
            return;
        }

        this.dragStart = e.pageY;
        this.scrollPosStart = this.scrollPos;

        this.target.onmousemove = this.onmousemove.bind(this);
        this.target.onmouseup = this.onmouseup.bind(this);
    },

    onmousemove: function(e) {
        this.clampScrollPos(this.scrollPosStart + (e.pageY - this.dragStart)*this.DRAG_SPEED);
    },

    onmouseup: function(e) {
        this.target.onmousemove = null;
        this.target.onmouseup = null;
    },

    onmousewheel: function(e) {
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        this.clampScrollPos(this.scrollPos + delta*this.WHEEL_SPEED);
    },

    touchstart: function(e) {
        e.preventDefault();

        if (!this.enabled) {
            return;
        }

        this.dragStart = e.touches[0].clientY;
        this.scrollPosStart = this.scrollPos;

        this.target.addEventListener("touchmove", this.touchmove.bind(this), false);
        this.target.addEventListener("touchend", this.touchmove.bind(this), false);
    },

    touchmove: function(e) {
        this.clampScrollPos(this.scrollPosStart + (e.touches[0].clientY - this.dragStart)*this.TOUCH_SPEED);
    },

    touchend: function(e) {
        this.target.removeEventListener("touchmove", this.touchmove.bind(this), false);
        this.target.removeEventListener("touchend", this.touchmove.bind(this), false);
    }
}