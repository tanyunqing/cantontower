
function startApp() {
  
  //console.log("starting");

	//Switch underscore to mustache-style templates
	_.templateSettings = {
	  interpolate: /\{\{(.+?)\}\}/g
	};

	// create a renderer instance
	var renderer = SN.renderer;


  //initialize menus
  var menuScope = angular.element($("#menu-container")).scope()
  menuScope.$apply(function(){
    menuScope.ready = true;
  });

  menuScope = angular.element($("#mobile-menu-container")).scope()
  menuScope.$apply(function(){
    menuScope.ready = true;
  });

	var h = 0;
	var w = 0;
	function onResize() {
		var $window = $(window);
	    w = $window.width();
		h = $window.height();

	    // Resizes the renderer
	    SN.renderer.resize(w, h);
	}

	//Set up scroller
	var maxAnim = 180;
	var animScale = 100;
	var scroller = SN.buildScroller($("#pixiStage"), maxAnim * animScale);

  var safeCloseMobile = function(){
    if(window.closeMobileMenu)
      window.closeMobileMenu();
  }

  $("#pixiStage").on("click", safeCloseMobile)
  $("#pixiStage").on("touchstart", safeCloseMobile)

	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x000000, true);

	stage.interactive = true;

	var section1Container = new PIXI.DisplayObjectContainer();
	var section2Container = new PIXI.DisplayObjectContainer();
	var section3Container = new PIXI.DisplayObjectContainer();
	var section4Container = new PIXI.DisplayObjectContainer();
	var section5Container = new PIXI.DisplayObjectContainer();
	stage.addChild(section1Container);
	stage.addChild(section2Container);
	stage.addChild(section3Container);
	stage.addChild(section4Container);
	stage.addChild(section5Container);

	var currentImageWidth = 0;
	var currentImageHeight = 0;
	function imageHeight(t) {
		return currentImageHeight;
	}

	function imageWidth(t) {
		return currentImageWidth;
	}

//  var logger = _.throttle(_.bind(console.log, console), 1000);

  var center = function() {
		var w = imageWidth();
    var W = width();
    return (W/2) - (w/2);
  };

	function bezierImage(fileName, bezierX, bezierY, attachTo, scaleX, scaleY, url) {
		var image = PIXI.Sprite.fromImage(fileName);
		attachTo.addChild(image);
		if(typeof url != 'undefined') { // use image as button
			image.buttonMode = true;
			image.interactive = true; //setInteractive(true);
			image.click = image.tap =  function(event) {
				window.location.assign(url);
			}
		}
		return function(t) {

			var width = image.texture.frame.width;
			var height = image.texture.frame.height;

			if(scaleX) {
				//if (fileName == "img/section06/mars.png") {
					//logger("w", image.width, "scale", scaleX(t));
				//}

				image.width = w * scaleX(t);
				image.height = (image.width / width) * height;
			}
			if(scaleY && image.height < h * scaleY(t)) {
				image.height = h * scaleY(t);
				image.width = (image.height / height) * width;
			}

			currentImageWidth = image.width;
			currentImageHeight = image.height;

			if(!(_.isNaN(bezierX(t)) || _.isNaN(bezierY(t)))) {
				image.position.x = Math.round(bezierX(t));
				image.position.y = Math.round(h - bezierY(t));
				image.visible = true;
			} else {
				image.visible = false;
			}
		}
	}
	var calloutCloseFuncs = [];
	var calloutOpenFuncs = [];
	function callout($content, bezierX, bezierY, attachTo, openAt, closeAt) {
		//Create callout properties
		var open = false;
    var openedAlready = false;
		var animPercent = 0;
		//Get images
		var closedImage = PIXI.Sprite.fromImage("img/hotspot_closed.png");
		var openedImage = PIXI.Sprite.fromImage("img/hotspot_open.png");
		//Set animation properties
		openedImage.visible = false;
		//Set interaction properties
		closedImage.interactive = true; //setInteractive(true);
		openedImage.interactive = true; //setInteractive(true);

		closedImage.click = closedImage.tap = function(event) {
			if(!open && animPercent <= 0) {
				_.each(calloutCloseFuncs, function(fun) { fun()});
				open = true;
			}
		}
		openedImage.click = openedImage.tap = function(event) {
			if(open && animPercent >= 1) {
				open = false;
			}
		}

		calloutCloseFuncs.push(function() { open = false; });
		calloutOpenFuncs.push(function() { open = true; });

		openedImage.buttonMode = true;
		closedImage.buttonMode = true;

		//Attach
		attachTo.addChild(closedImage);
		attachTo.addChild(openedImage);
		//Create callout div
		$("#pixiStage").append($content);
		$content.hide();
		$content.css({position: 'absolute'});
		return function(t) {
			var x = Math.round(bezierX(t));
			var y = Math.round(bezierY(t));

      if (openAt && t >= openAt  && !openedAlready) {
        open = true;
        openedAlready = true;
      }

      if (closeAt && t >= closeAt) {
        open = false;
      }


			if(!(_.isNaN(x) || _.isNaN(y)) && ( w > 800) ) {
				if(open && animPercent < 1) {
					animPercent += 0.05;
				}
				if(!open && animPercent > 0) {
					animPercent -= 0.05;
				}

        //Set pivots
        closedImage.pivot = {x: closedImage.texture.frame.width / 2, y: closedImage.texture.frame.height / 2};
        openedImage.pivot = {x: openedImage.texture.frame.width / 2, y: openedImage.texture.frame.height / 2};

				closedImage.position.x = x;
				closedImage.position.y = h - y;
				closedImage.visible = (animPercent > 0 && animPercent < 1) || !open;
				closedImage.alpha = 1 - animPercent;
				closedImage.rotation = animPercent * 3 * Math.PI / 4;
				openedImage.position.x = x;
				openedImage.position.y = h - y;
				openedImage.visible = (animPercent > 0 && animPercent < 1) || open;
				openedImage.alpha = animPercent;
				openedImage.rotation = animPercent * 3 * Math.PI / 4;
				if(animPercent > 0.5) {
					$content.find('h1').bigText( {maximumFontSize: 70} );
					$content.fadeIn(300);
					$content.offset({top: h - y, left:x});
				} else {
					$content.fadeOut(300);
				}
			} else {
				closedImage.visible = false;
				openedImage.visible = false;
				open = false;
				animPercent = 0;
				$content.hide();
			}
		}


	}

  heightCallout = function($content) {

    var open = false;
    var title = $content.find('.title');
    var titleText = title.find('h1');
    var contentContainer = $content.find('.content-container');
    var content = $content.find('.content');
    var jack = $content.find('.jack');
    var previousWidth;
    var previousContentHeight = contentContainer.height();

    contentContainer.css("height", 0);
    content.hide();

    title.on("click touchstart", function(e) {
      if (!open) {
        previousWidth = title.width();
        jack.addClass("rotated");

        if (previousWidth < 280)
          title.animate({width: 280}, {duration: 500});
        else
          title.animate({width: previousWidth}, {duration: 500});

        contentContainer.animate({height: 250, color: "#000000"}, {duration: 500});
        content.fadeIn(500);
        open = true;
      }
      else {
        jack.removeClass("rotated");
        title.animate({width: previousWidth}, {duration: 500});
        contentContainer.animate({height: 0}, {duration: 500});
        content.fadeOut(500);
        open = false;
      }

    });
    return $content;
  };

	function clip(targetSpecs) {
		var clip = new PIXI.Graphics();
		stage.addChild(clip);
		return function(t) {
			clip.clear();
			_.each(targetSpecs, function(targetSpec) {
				if(t >= targetSpec.start && t <= targetSpec.end) {
					var partialT = (t - targetSpec.start) / (targetSpec.end - targetSpec.start);
					targetSpec.target.mask = clip;
					clip.beginFill(0);
					clip.drawRect(0, 0, w, h * partialT)
					clip.endFill();
				} else {
					targetSpec.target.mask = null;
				}
			})
		}
	}
	function wipe(color, alpha, tlY, trY, blY, brY, attachTo) {
		var wipe = new PIXI.Graphics();
		attachTo.addChild(wipe);
		return function(t) {
			wipe.clear();
			if(!(_.isNaN(tlY(t)) || _.isNaN(trY(t)) || _.isNaN(blY(t)) || _.isNaN(brY(t)))) {
				wipe.beginFill(color, alpha);
				wipe.moveTo(0, h - tlY(t));
				wipe.lineTo(w, h - trY(t));
				wipe.lineTo(w, h - brY(t));
				wipe.lineTo(0, h - blY(t));
				wipe.lineTo(0, h - tlY(t));
				wipe.endFill();
			}
		}
	}
	function movingDiv($content, xFunc, yFunc, showAt) {
		//console.log($content);
		$("#pixiStage").append($content);
		$content.hide();
		$content.css({position: 'absolute'});

		var show = function() { $content.delay(300).fadeIn(500); }

		return function(t) {

			var x = Math.round(xFunc(t));
			var y = h - Math.round(yFunc(t));

			var inRange = (x && y);
			var shouldShow = showAt ? (t > showAt) : true;
			var fadeOut = inRange && !shouldShow;

			if(inRange) {
				if (shouldShow) {
					if (t < 5 || showAt) {
						$content.delay(300).fadeIn(500);
					} else {
						$content.show();
					}
				}
				$content.offset({top: y, left:x});
			} else {
				$content.hide();
			}
		}
	}
	function scrollerButtons() {
		var stops = [0, 15, 30, 38, 46, 62, 69, 80, 107, 125, 185];
		//Create animation properties
		var active = false;
		var animPercent = 0;
		var animFrom = 0;
		var animTo = 0;
		var lastT = 0;
		//Get images
		var scrollerContainer = new PIXI.DisplayObjectContainer();
		stage.addChild(scrollerContainer);

		var labelImage = PIXI.Sprite.fromImage("img/label.png");

		var upImage = new PIXI.DisplayObjectContainer();
		var upImages = _.map(SN.assets.scroll_up, function(imageName) {
			var sprite = PIXI.Sprite.fromImage(imageName);
			sprite.visible = false;
			upImage.addChild(sprite);
			return sprite;
		});
		upImages[2].visible = true;

		var downImage = new PIXI.DisplayObjectContainer();
		var downImages = _.map(SN.assets.scroll_down, function(imageName) {
			var sprite = PIXI.Sprite.fromImage(imageName);
			sprite.visible = false;
			downImage.addChild(sprite);
			return sprite;
		});
		downImages[2].visible = true;

		scrollerContainer.addChild(labelImage);
		scrollerContainer.addChild(upImage);
		scrollerContainer.addChild(downImage);

    //some hardcoded sizes to deal with IE

    var buttonWidth = 40;
    var buttonHeight = 38;
    var labelWidth = 64;
    var labelHeight = 23;

		//Position elements

		upImage.position.x = - buttonWidth / 2;
		downImage.position.x = - buttonWidth / 2;
		labelImage.position.x = -labelWidth / 2;
		labelImage.position.y = buttonHeight - 1;
		downImage.position.y = buttonHeight + labelHeight - 2;
		
		//Set interaction properties
		upImage.interactive = true; //setInteractive(true);
		downImage.interactive = true; //setInteractive(true);
		upImage.mouseover = function(event) {
			if(!active) {
				upImages[0].visible = false;
				upImages[1].visible = true;
				upImages[2].visible = false;
			}
		}
		upImage.mouseout = upImage.mouseup = function(event) {
			upImages[0].visible = false;
			upImages[1].visible = false;
			upImages[2].visible = true;
		}
		upImage.click = upImage.tap = function(event) {
			animFrom = lastT;
			for(var i = 0; i < stops.length; i++) {
				if(lastT < stops[i] - 1) {
					animTo = stops[i];
					break;
				}
				animTo = 0;
			}
			scrollerContainer.alpha =.5;
			upImage.buttonMode = false;
			downImage.buttonMode = false;
			animPercent = 0;
			active = true;
		}
		window.onkeyup = function (e) {
			var code = e.keyCode ? e.keyCode : e.which;
			if (code === 38) { //up key
				upImage.click();
			} else if (code === 40) { //down key
				downImage.click();
			}
		};
		downImage.mouseover = function(event) {
			if(!active) {
				downImages[0].visible = false;
				downImages[1].visible = true;
				downImages[2].visible = false;
			}
		}
		downImage.mouseout = downImage.mouseup = function(event) {
			downImages[0].visible = false;
			downImages[1].visible = false;
			downImages[2].visible = true;
		}
		downImage.click = downImage.tap = function(event) {
			animFrom = lastT;
			for(var i = stops.length -1; i >= 0; i--) {
				if(lastT > stops[i] + 1) {
					animTo = stops[i];
					break;
				}
			}
			scrollerContainer.alpha =.5;
			upImage.buttonMode = false;
			downImage.buttonMode = false;
			animPercent = 0;
			active = true;
		}
		upImage.buttonMode = true;
		downImage.buttonMode = true;
		//Return time function
		return function(t) {
			//Ignore t, and instead set t ourselves!
			scrollerContainer.position.x = w - labelImage.width / 2 - 20;
			//scrollerContainer.position.x = w - buttonWidth / 2 - 20;
			scrollerContainer.position.y = 20;
			lastT = t;
			//See if we're moving
			if(active) {
				var newT = animFrom - (animTo - animFrom) * animPercent * (animPercent - 2);
				scroller.setScroll(newT * animScale);
				animPercent += 0.01;
				if(animPercent>.75) scrollerContainer.alpha = animPercent;
				//if(animPercent>scrollerContainer.alpha) scrollerContainer.alpha = animPercent;
				if(animPercent >= 1) {
					active = false;
					scrollerContainer.alpha = 1;
					upImage.buttonMode = true;
					downImage.buttonMode = true;
				}
			}

			//Determine whether the scroll buttons are visible
			// This was tied to scroller.js which uses a separate scroll function
			// scroller.js does not actually return a useful number for getTimeSinceScroll
/*			if(scroller.getTimeSinceScroll() > 1000 && t < 88) { 
				scrollerContainer.visible = true;
				scrollerContainer.alpha = Math.min(1, (scroller.getTimeSinceScroll() / 1000) - 1);
				
			} else {
				scrollerContainer.visible = false;
			}
*/

			w < 800 ? v = false: v = true;
			scrollerContainer.visible = v;
			//if (w < 800 ) scrollerContainer.visible = false;
		}
	}

	function scrollUpAnim() {
		var stops = [0, 15, 30, 38, 46, 62, 69, 80, 107, 125, 185];
		//Create animation properties
		var active = false;
		var animPercent = 0;
		var animFrom = 0;
		var animTo = 0;
		var lastT = 0;

		var frame = 0;
		//Get images
		var scrollerContainer = new PIXI.DisplayObjectContainer();
		stage.addChild(scrollerContainer);
		var images = _.map(SN.assets.scroll, function(imageName) {
			var sprite = PIXI.Sprite.fromImage(imageName);
			sprite.position.x = -sprite.width / 2;
			sprite.visible = false;
			scrollerContainer.addChild(sprite);
			return sprite;
		});
		var frameStep = 0;

		//Set interaction properties
		scrollerContainer.interactive = true; //setInteractive(true);
		scrollerContainer.click = scrollerContainer.tap = function(event) {
			animFrom = lastT;
			for(var i = 0; i < stops.length; i++) {
				if(lastT < stops[i] - 1) {
					animTo = stops[i];
					break;
				}
			}
			animPercent = 0;
			active = true;
		}
		scrollerContainer.buttonMode = true;

		return function(t) {
			//Ignore t, just center
			scrollerContainer.position.x = w / 2;
			scrollerContainer.position.y = 20;

			//Hide previous frame, increment frame, show new frame
			images[frame].visible = false;
			frameStep++;
			if(frameStep % 2 == 0) { frame++; }
			if(frame >= images.length) {
				frame = 0;
			}
			images[frame].visible = true;

			lastT = t;
			//See if we're moving
			if(active) {
				var newT = animFrom - (animTo - animFrom) * animPercent * (animPercent - 2);
				scroller.setScroll(newT * animScale);
				animPercent += 0.01;
				if(animPercent >= 1) {
					active = false;
				}
			}

			//Determine whether the whole scroller is visible
			if(scroller.getTimeSinceScroll() > 1000 && t < 88) { 
				scrollerContainer.visible = true;
				scrollerContainer.alpha = Math.min(1, (scroller.getTimeSinceScroll() / 1000) - 1);
			} else {
				scrollerContainer.visible = false;
			}
		}
	}
	function clusteredImage(fileName, bezierX, bezierY, attachTo, scaleX, scaleY, secondaryImageDescriptions) {
		var container = new PIXI.DisplayObjectContainer();
		attachTo.addChild(container);
		var primaryImage = PIXI.Sprite.fromImage(fileName);
		container.addChild(primaryImage);

		var secondaryImageBlinks =_.map(secondaryImageDescriptions, function(secondary) {
			var image = PIXI.Sprite.fromImage(secondary.imageName);
			image.position.x = secondary.x;
			image.position.y = secondary.y;
			container.addChild(image);
			return function(totalTime) {
				totalTime /= 1000;
				var percent = (totalTime % secondary.blinkPeriod) / secondary.blinkPeriod;
				image.alpha = percent <= 0.5 ? (percent * 2) : 1 - ((percent - 0.5) * 2);
			};
		});

		var lastTime = 0;
		var totalTime = 0;

		return function(t) {

      var width = primaryImage.texture.frame.width;
      var height = primaryImage.texture.frame.height;

			var currentTime = (new Date()).getTime();
			var deltaT = currentTime - lastTime;
			if(lastTime == 0) { deltaT = 0; }
			lastTime = currentTime;
			totalTime += deltaT;

			if(scaleX) {
				container.width = w * scaleX(t);
				container.height = (container.width / width) * height;
			}
			if(scaleY && container.height < h * scaleY(t)) {
				container.height = h * scaleY(t);
				container.width = (container.height / height) * width;
			}
			currentImageWidth = container.width;
			currentImageHeight = container.height;
			container.scale.x = container.width / width;
			container.scale.y = container.height / height;

			_.each(secondaryImageBlinks, function(fun) {fun(totalTime);});
			if(!(_.isNaN(bezierX(t)) || _.isNaN(bezierY(t)))) {
				container.position.x = Math.round(bezierX(t));
				container.position.y = Math.round(h - bezierY(t));
				container.visible = true;
			} else {
				container.visible = false;
			}
		}
	}
	function clusteredImagePositions(fileName, bezierX, bezierY, attachTo, scaleX, scaleY, secondaryImageDescriptions) {
		var container = new PIXI.DisplayObjectContainer();
		attachTo.addChild(container);
		var primaryImage = PIXI.Sprite.fromImage(fileName);
		//var width = primaryImage.width;
		//var height = primaryImage.height;
      var width = primaryImage.texture.frame.width;
      var height = primaryImage.texture.frame.height;

		var secondaryImagePositions =_.map(secondaryImageDescriptions, function(secondary) {
			var image = PIXI.Sprite.fromImage(secondary.imageName);
			image.position.x = secondary.x;
			image.position.y = secondary.y;
			container.addChild(image);
			return function(t) {
				var x = Math.round(secondary.bezierX(t));
				var y = Math.round(secondary.bezierY(t));

				if(!(_.isNaN(x) || _.isNaN(y))) {
					image.position.x = Math.round(secondary.x + x);
					image.position.y = Math.round(secondary.y + y);
					image.visible = true;
				} else {
					image.visible = false;
				}
			};
		});
		container.addChild(primaryImage);

		return function(t) {
      var width = primaryImage.texture.frame.width;
      var height = primaryImage.texture.frame.height;
			if(scaleX) {
				container.width = w * scaleX(t);
				container.height = (container.width / width) * height;
			}
			if(scaleY && container.height < h * scaleY(t)) {
				container.height = h * scaleY(t);
				container.width = (container.height / height) * width;
			}
			currentImageWidth = container.width;
			currentImageHeight = container.height;
			container.scale.x = container.width / width;
			container.scale.y = container.height / height;

			_.each(secondaryImagePositions, function(fun) {fun(t);});
			if(!(_.isNaN(bezierX(t)) || _.isNaN(bezierY(t)))) {
				container.position.x = Math.round(bezierX(t));
				container.position.y = Math.round(h - bezierY(t));
				container.visible = true;
			} else {
				container.visible = false;
			}
		}
	}

	function width(t) {
		return w;
	}

	function height(t) {
		return h;
	}

	//Template functions
	var billboardTemplate = _.template($("#billboard-template").html());
	var hotspotTemplate = _.template($("#hotspot-template").html());
	var heightHotspotTemplate = _.template($("#height-hotspot-template").html());
	var spaceTemplate = _.template($('#space-template').html());

	function makeHotspot(id, color, direction) {
		var data = _.findWhere(SN.hotspotData, {entry_id: String(id), pod_type: "Callout"});
    	//console.log("hotspot", id, data);
		var dataPlus = _.extend(data, {color: color, direction: direction});
    	return $(hotspotTemplate(dataPlus));
	}

	function makeHeightHotspot(id) {
		var data = _.findWhere(SN.hotspotData, {entry_id: String(id), pod_type: "Height"});
    return $(heightHotspotTemplate(data));
	}

	function makeBillboard(id, section) {
		var data = _.findWhere(SN.hotspotData, {entry_id: id, pod_type: "Chapter"});
    	//console.log("billboard", id, data);
		var dataPlus = _.extend(data, {section: 'chapter'+id+' '+section});
    return $(billboardTemplate(dataPlus));
	}

	//Measuring constants
	var rulerFoot = PIXI.Sprite.fromImage("img/numeric-scroller.png").height / 600;

	var p = SN.positioning;
	p.c = p.constant;

  var zero = p.c(0);

  // curves
  var rulerY = p.spline([
				{
					start: 0, end: 34,
					segment: p.linear(0,34,
						p.plus(imageHeight, p.percent(height, p.c(0), 0.1)),
						p.plus(p.percent(height, p.c(0), 0.5), p.c(100 * rulerFoot)))
				},
				{
					start: 34, end: 42,
					segment: p.linear(34,42,
						p.plus(p.percent(height, p.c(0), 0.5), p.c(100 * rulerFoot)),
						p.plus(p.percent(height, p.c(0), 0.5), p.c(80 * rulerFoot)))
				},
				{
					start: 42, end: 47,
					segment: p.linear(42,47,
						p.plus(p.percent(height, p.c(0), 0.5), p.c(80 * rulerFoot)),
						p.percent(height, p.c(0), 0.5))
				},
				{
					start: 47, end: 57,
					segment: p.bezier(47,57,
						p.percent(height, p.c(0), 0.5),
						p.percent(height, p.c(0), 0.5),
						p.percent(height, p.c(0), 0.5),
						p.c(0))
        }
				]);

  var section1_calloutsY = p.bezier(0,8,p.percent(height, p.c(0), 1), p.percent(height, p.c(0), 0.8),
                                    p.percent(height, p.c(0), 0.4), p.c(-200));

  var section1_elevatorY = p.spline([
                                      {start: 0, end: 9, segment:p.linear(0,7,p.c(0),height)},
                                      {start: 7, end: 9, segment:height},
                                    ]);

  var section3_spaceneedleX = p.minus(p.percent(p.c(0), width, 0.5), p.percent(p.c(0), imageWidth, 0.5));
  var section3_spaceneedleY = p.bezier(22, 35.4,
                                       imageHeight,p.percent(imageHeight, height, 0.5),
                                       p.percent(imageHeight, height, 0.5),
                                       height);
  var section3_stairsCalloutX = p.plus(p.percent(zero, imageWidth, 0.42),
                                       section3_spaceneedleX);
  var section3_stairsCalloutY = p.minus(section3_spaceneedleY,
                                       p.percent(zero, imageHeight, .5));

	var section3_elevatorY = p.spline([{start: 23, end:34, segment: p.bezier(23,34,p.percent(p.c(0), height, 0.7),height,p.c(0),height)},
                                     {start: 34, end:35, segment: height}]);

  var section4_billboard = p.exponentialCenter(35,41,
                                               p.plus(height,p.c(500)),
                                               p.percent(height, p.c(0), 0.5),
                                               p.c(-500));

  var section5_spaceneedleX = p.minus(p.c(0), p.percent(p.c(0), p.minus(imageWidth, width), 0.5));
	var section5_spaceneedleY = p.bezier(40,57,height, height, height, p.c(0));

	var images = [
	//Clip sections
		clip([
			{start: 6, end: 8.5, target: section2Container},
			{start: 22, end: 24.2, target: section3Container},
			{start: 32, end: 35.3, target: section4Container},
			{start: 40, end: 43.4, target: section5Container},
//			{start: 56, end: 56.8, target: section6Container},

			]),
	//Section 1
		bezierImage("img/background.jpg",
			p.constant(0),
			p.bezier(0,9,imageHeight,imageHeight, imageHeight, height),
			section1Container, p.c(1), p.c(1.5)),
		bezierImage("img/wires.png",
			p.minus(width, p.c(120)),
			p.linear(0,9,imageHeight, imageHeight),
			section1Container, false, p.c(1)),
		bezierImage("img/elevator.png",
			p.minus(width, p.c(180)),
      section1_elevatorY,
			section1Container),



		bezierImage("img/needle-tall.png",
			p.minus(width, imageWidth),
			p.bezier(0,9,imageHeight,imageHeight, imageHeight, height),
			section1Container, p.c(0.75), p.c(1.0)),
		//Billboard
				
		movingDiv(makeBillboard("1", "start"),
			p.percent(p.c(0), width, 0.5),
			p.bezier(0,6,p.percent(height, p.c(0), 0.5), p.percent(height, p.c(0), 0.5),
				p.percent(height, p.c(0), 0.5), p.c(-500))),




		callout(makeHotspot("1", "yellow", "up"),
			p.percent(p.c(0), width, 0.35),
      p.bezier(1, 7.9, p.minus(height, p.c(-100)),
                       p.c(100),
                       p.minus(height, p.c(-100)),
                       p.c(-200)),
			section1Container,
      2.5 /*  open at */),


		callout(
      makeHotspot("18", "yellow", "down"),
			p.minus(p.percent(p.c(0), width, 0.17), p.c(17)),
      p.minus(section1_elevatorY, p.c(35)),
			section1Container),
			
		callout(
      makeHotspot("3", "yellow", "up"),
			p.percent(p.c(0), width, 0.6),
      p.linear(4.5, 8.4, p.minus(height, p.c(-100)),
                      p.c(-400)),
			section1Container),

	//Section 2
		bezierImage("img/sky.jpg",
			p.constant(0),
			p.linear(6,24,imageHeight,height),
			section2Container, p.c(1), p.c(1.1)),
		bezierImage("img/clouds.png",
			p.linear(6,24,
				p.minus(p.c(0), p.percent(imageWidth, p.c(0), 0.35)),
				p.minus(p.c(0), p.percent(imageWidth, p.c(0), 0.65))),
			height,
			section2Container, p.c(2), p.c(1)),

		callout(makeHotspot("13", "yellow", "down"),
			p.plus(p.linear(6,23.5,
				p.minus(p.c(0), p.percent(imageWidth, p.c(0), 0.35)),
				p.minus(p.c(0), p.percent(imageWidth, p.c(0), 0.65))
			), p.percent(p.c(0), imageWidth, 0.2)),
			p.percent(height, p.c(0), 0.6),
			section2Container),

		bezierImage("img/buildings.png",
			p.constant(0),
			p.linear(6,25,imageHeight,height),
			section2Container, p.c(1), p.c(1.1)),

		clusteredImagePositions("img/needle.png",
			p.minus(width, p.percent(p.c(0), imageWidth, 0.4)),
			p.bezier(6,25,imageHeight,p.percent(imageHeight, height, 0.5),
					p.percent(imageHeight, height, 0.5),height),
			section2Container, p.c(0.5), p.c(1.5),
			[//Image cluster
				{x: 500, y: 0, imageName: "img/wires.png",
					bezierX: p.c(0), bezierY: p.c(0)},
				{x: 490, y: 0, imageName: "img/elevator.png",
					bezierX: p.c(0), bezierY: p.linear(7,24,imageHeight,p.c(0))},
			]),
/*
		callout(
      makeHotspot("20", "yellow", "down"),
			p.minus(p.percent(p.c(0), width, 0.17), p.c(17)),
      p.minus(section2_elevatorY, p.c(35)),
			section2Container),
*/
		movingDiv(makeBillboard("2", "start"),
			p.percent(p.c(0), width, 0.5),
			p.exponentialCenter(6.8,20,
				p.plus(height,p.c(500)),
				p.percent(height, p.c(0), 0.5),
				p.c(-500))),

		//Section 2 Callouts
		callout(makeHotspot("10", "yellow", "up"),
			p.percent(p.c(0), width, 0.75),
        p.bezier(19, 23, p.minus(height, p.c(-100)),
                         p.percent(height, p.c(0), 0.8),
				                 p.percent(height, p.c(0), 0.8),
                         p.c(-500)),
			section2Container),

		callout(makeHotspot("24", "yellow", "up"),
			p.percent(p.c(0), width, 0.4),
        p.bezier(18, 22, p.minus(height, p.c(-100)),
                         p.percent(height, p.c(0), 0.8),
				                 p.percent(height, p.c(0), 0.8),
                         p.c(-400)),
			section2Container),

		callout(
      makeHotspot("15", "yellow", "up"),
			p.percent(p.c(0), width, 0.25),
        p.bezier(19, 23, p.minus(height, p.c(-100)),
                         p.percent(height, p.c(0), 0.8),
				                 p.percent(height, p.c(0), 0.8),
                         p.c(-500)),
			section2Container),

		callout(makeHotspot("9", "yellow", "up"),
			p.percent(p.c(0), width, 0.83),
        p.bezier(20, 24, p.minus(height, p.c(-100)),
                         p.percent(height, p.c(0), 0.8),
				                 p.percent(height, p.c(0), 0.8),
                         p.c(-400)),
			section2Container),




	//Section 3
		bezierImage("img/skyline.jpg",
			p.linear(22,35.4,p.minus(width, imageWidth),p.percent(p.minus(width, imageWidth), p.c(0), 0.1)),
			imageHeight,
			section3Container, p.c(2), p.c(1)),

		//Section 3 Callouts
		callout(
      makeHotspot("12", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.6),
            p.linear(22,35.4,p.minus(width, imageWidth),p.percent(p.minus(width, imageWidth), p.c(0), 0.1))),
      p.percent(p.c(0), imageHeight, 0.44),
			section3Container),

		callout(
      makeHotspot("14", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.56),
            p.linear(22,35.4,p.minus(width, imageWidth),p.percent(p.minus(width, imageWidth), p.c(0), 0.1))),
      p.percent(p.c(0), imageHeight, 0.55),
			section3Container),

		callout(
      makeHotspot("8", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.625),
            p.linear(22,35.4,p.minus(width, imageWidth),p.percent(p.minus(width, imageWidth), p.c(0), 0.1))),
      p.percent(p.c(0), imageHeight, 0.56),
			section3Container),

		callout(
      makeHotspot("2", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.5225),
            p.linear(22,35.4,p.minus(width, imageWidth),p.percent(p.minus(width, imageWidth), p.c(0), 0.1))),
      p.percent(p.c(0), imageHeight, 0.71),
			section3Container),

		callout(
      makeHotspot("4", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.545),
            p.linear(22,35.4,p.minus(width, imageWidth),p.percent(p.minus(width, imageWidth), p.c(0), 0.1))),
      p.percent(p.c(0), imageHeight, 0.785),
			section3Container),


		callout(
      makeHotspot("6", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.44),
            p.linear(22,35.4,p.minus(width, imageWidth),p.percent(p.minus(width, imageWidth), p.c(0), 0.1))),
      p.percent(p.c(0), imageHeight, 0.66),
			section3Container),

		callout(
      makeHotspot("5", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.59),
            p.linear(22,35.4,p.minus(width, imageWidth),p.percent(p.minus(width, imageWidth), p.c(0), 0.1))),
      p.percent(p.c(0), imageHeight, 0.60),
			section3Container),

		bezierImage("img/plane.png",
			p.spline([
				{start: 30, end: 34, segment: p.linear(30,34,p.c(-100),p.percent(width, p.c(0), 0.5))},
				{start: 34, end: 35.4, segment: p.percent(width, p.c(0), 0.5)},
				]),
			p.percent(height, p.c(0), 0.67),
			section3Container),
		callout(
	    	makeHotspot("7", "yellow", "down"),
			p.plus(p.spline([
				{start: 30, end: 34, segment: p.linear(30,34,p.c(-100),p.percent(width, p.c(0), 0.5))},
				{start: 34, end: 35.4, segment: p.percent(width, p.c(0), 0.5)},
				]), p.percent(imageWidth, p.c(0), 0.5)),
			p.plus(p.percent(height, p.c(0), 0.565), p.c(20)),
			section3Container),

		bezierImage("img/wires.png",
			p.minus(p.percent(p.c(0), width, 0.5), p.percent(p.c(0), imageWidth, 0.5)),
			p.bezier(22,35.4,imageHeight,p.percent(imageHeight, height, 0.5),
				p.percent(imageHeight, height, 0.5),height),
			section3Container),
		bezierImage("img/elevator.png",
			p.minus(p.percent(p.c(0), width, 0.5), p.c(40)),
      section3_elevatorY,
			section3Container),

		callout(
      makeHotspot("18", "yellow", "up"),
			p.minus(p.c(0),
              p.minus(p.percent(p.c(0), width, 0.5), p.c(40))),
			p.minus(p.c(0),
              p.bezier(23,35,p.c(400),p.c(600),p.c(200),p.c(600))),
			section3Container),

	 bezierImage("img/needle.png",
                section3_spaceneedleX,
                section3_spaceneedleY,
                section3Container),

		callout(
      makeHotspot("17", "yellow", "up"),
			p.minus(p.percent(p.c(0), width, 0.54), p.c(17)),
      p.minus(section3_elevatorY, p.c(30)),
			section3Container),

		callout(makeHotspot("16", "yellow", "up"),
            section3_stairsCalloutX,
            section3_stairsCalloutY,
            section3Container),

	//Section 4
		bezierImage("img/skyline.jpg",
			p.linear(32,43,p.percent(p.minus(width, imageWidth), p.c(0), 0.1), p.c(0)),
			imageHeight,
			section4Container, p.c(2), p.c(1)),
		bezierImage("img/plane.png",
			p.linear(32,43,p.percent(width, p.c(0), 0.5), width),
			p.percent(height, p.c(0), 0.5),
			section4Container),
		bezierImage("img/restaurant.png",
			p.linear(32, 43, p.minus(width, imageWidth), p.c(0)),
			height,
			section4Container, p.c(1), p.c(1)),


		callout( makeHotspot("22", "yellow", "down"),
/*			p.percent(p.c(0), width, 0.35),
      p.plus(section4_billboard, p.c(300)),*/
			p.percent(p.c(0), width, 0.25),
        	p.bezier(32, 50, p.minus(height, p.c(100)),
            	p.percent(height, p.c(0), 0.95),
				p.percent(height, p.c(0), 0.95),
                p.c(-400)),
			section4Container),

		movingDiv(makeBillboard("3", "middle"),
			p.percent(p.c(0), width, 0.5),
			p.exponentialCenter(37,41,
				p.plus(height,p.c(500)),
				p.percent(height, p.c(0), 0.5),
				p.c(-500))),
/*              p.percent(p.c(0), width, 0.5),
              section4_billboard),*/


	//Section 5
		bezierImage("img/skyline.jpg",
			p.minus(p.c(0), p.percent(p.c(0), p.minus(imageWidth, width), 0.5)),
			p.bezier(40,57,imageHeight,imageHeight, imageHeight, p.c(0)),
			section5Container, p.linear(40,57,p.c(1.5),p.c(1)), p.linear(41,57,p.c(1.1),p.c(1))),
		clusteredImage("img/needle.png",
      section5_spaceneedleX,
      section5_spaceneedleY,
			section5Container, p.linear(40,57,p.c(0.5),p.c(0.3)), p.c(1),
			[//Image cluster
				{x: 217, y: 448, blinkPeriod: 1.1, imageName: "img/column-lights.png"},
				{x: 43, y: 356, blinkPeriod: 1.3, imageName: "img/restaurant_lights.png"},
				{x: 39, y: 294, blinkPeriod: 1.6, imageName: "img/observation_lights.png"},
				{x: 195, y: 24, blinkPeriod: 2.1, imageName: "img/top_light.png"},
			]),

		callout(
      makeHotspot("25", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.2), section5_spaceneedleX),
      p.minus(section5_spaceneedleY, p.percent(p.c(0), imageHeight, 0.5)),
			section5Container,
      41,
      44.8),
/*
		callout(
      $(hotspotTemplate({pod_shareable: 0, pod_sharetext: "", pod_image: false, pod_content: "At 520 feet, nothing blocks you from a 360 degree panorama of the Emerald City. Mountain ranges covered in Douglas Firs. Elliott Bayâ€™s bustling waterfront. The lights of downtown Seattle.  Mt Rainier, ever-present from afar. Head up and see what all the oohhhs and ahhhhhs are about.",
                         pod_title: "Observation Deck",
                         color: "yellow",
                         direction: "up"})),
      p.plus(p.percent(p.c(0), imageWidth, 0.2), section5_spaceneedleX),
      p.minus(section5_spaceneedleY, p.percent(p.c(0), imageHeight, 0.5)),
			section5Container,
      41,
      44.8),
*/
		callout(
      makeHotspot("21", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.8), section5_spaceneedleX),
      p.minus(section5_spaceneedleY, p.percent(p.c(0), imageHeight, 0.7)),
			section5Container),

		callout(
      makeHotspot("23", "yellow", "up"),
      p.plus(p.percent(p.c(0), imageWidth, 0.40), section5_spaceneedleX),
      p.minus(section5_spaceneedleY, p.percent(p.c(0), imageHeight, 0.91)),
			section5Container),

		movingDiv(makeBillboard("4", "middle"),
			p.percent(p.c(0), width, 0.5),
			p.exponentialCenter(45,52,
				p.plus(height,p.c(500)),
				p.percent(height, p.c(0), 0.4),
				p.c(-500))),


	//Section 6
  //
		bezierImage(
			"img/section06/mars.png",
      center,
			p.linear(177, 180, p.plus(height, imageHeight), height),
			section5Container,
			undefined,
			undefined,
			undefined), /*'http://www.runtothemoon.com'*/

		bezierImage("img/stars01.png",
			p.constant(0),
			p.bezier(53,180,p.plus(imageHeight, height),p.plus(imageHeight, height), p.plus(imageHeight, height), height),
			section5Container),
		bezierImage("img/stars02.png",
			p.constant(0),
			p.bezier(53,180,p.plus(imageHeight, height),p.plus(imageHeight, height), height, height),
			section5Container),
		bezierImage("img/stars03.png",
			p.constant(0),
			p.bezier(53,180,p.plus(imageHeight, height),height, height, height),
			section5Container),
		bezierImage("img/satellite.png",
			p.linear(120,130,p.minus(p.c(0), imageWidth), width),
			p.linear(120,130,height, p.percent(height, p.c(0), 0.5)),
			section5Container),

		movingDiv(makeBillboard("5", "top"),
			p.percent(p.c(0), width, 0.5),
			p.exponentialCenter(57,66,
				p.plus(height,p.c(500)),
				p.percent(height, p.c(0), 0.5),
				p.c(-500))),

    //space

		movingDiv($(spaceTemplate({})),
			p.c(1),
			p.linear(64,74, p.plus(height, p.c(1200)), p.percent(height, p.c(0), -0.4))),

		callout(
      $(hotspotTemplate({pod_shareable: 0, pod_sharetext: "", pod_image: false, pod_content: "Space Race 2012 Winner Gregory Schneider awaits his suborbital spaceflight, awarded during the Needleâ€™s 50th Anniversary competition.",
                         pod_title: "Countdown to Launch",
                         color: "yellow",
                         direction: "up"})),
			p.percent(p.c(0), width, 0.5),
      p.linear(105, 110, p.minus(height, p.c(-100)),
                      p.c(-400)),
			section5Container),




	//Screen wipes
	//Have to be on the bottom of this list so they draw over things
		//Section 1 to section 2
		bezierImage("img/trans-section1-crop.jpg",
			p.constant(0),
			p.linear(6,9,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			stage, p.c(1)),
		wipe(0x00FFFF, 0.4,
			p.linear(6,9,p.plus(height,p.plus(imageHeight, p.c(100))),p.c(0)),
			p.linear(6,9,p.plus(height,p.plus(imageHeight, p.c(150))),p.c(0)),
			p.linear(6,9,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			p.linear(6,9,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			stage),
		//Section 2 to section 3
		bezierImage("img/trans-section2-crop.jpg",
			p.constant(0),
			p.linear(22,25,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			stage, p.c(1)),
		wipe(0x00FFFF, 0.4,
			p.linear(22,25,p.plus(height,p.plus(imageHeight, p.c(100))),p.c(0)),
			p.linear(22,25,p.plus(height,p.plus(imageHeight, p.c(150))),p.c(0)),
			p.linear(22,25,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			p.linear(22,25,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			stage),
		//Section 3 to section 4
		bezierImage("img/trans-section3-crop.jpg",
			p.constant(0),
			p.linear(32,36,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			stage, p.c(1)),
		wipe(0x808080, 0.4,
			p.linear(32,36,p.plus(height,p.plus(imageHeight, p.c(100))),p.c(0)),
			p.linear(32,36,p.plus(height,p.plus(imageHeight, p.c(150))),p.c(0)),
			p.linear(32,36,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			p.linear(32,36,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			stage),
		//Section 4 to section 5
		bezierImage("img/trans-section3-crop.jpg",
			p.constant(0),
			p.linear(40,44,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			stage, p.c(1)),
		wipe(0xFFFF00, 0.4,
			p.linear(40,44,p.plus(height,p.plus(imageHeight, p.c(100))),p.c(0)),
			p.linear(40,44,p.plus(height,p.plus(imageHeight, p.c(150))),p.c(0)),
			p.linear(40,44,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			p.linear(40,44,p.plus(height,imageHeight),p.minus(p.c(0),imageHeight)),
			stage),
		//Ruler
		bezierImage("img/numeric-scroller.png",
			p.constant(55),
      rulerY,
			stage),

		movingDiv(heightCallout(makeHeightHotspot("2")),
			p.percent(p.c(0), width, 0.9),
      p.minus(rulerY,
              p.percent(p.c(0), imageHeight, (113/600))),
      4),

		movingDiv(heightCallout(makeHeightHotspot("3")),
			p.percent(p.c(0), width, 0.9),
      p.minus(rulerY,
              p.percent(p.c(0), imageHeight, (162/600))),
      4),

		movingDiv(heightCallout(makeHeightHotspot("5")),
			p.percent(p.c(0), width, 0.9),
      p.linear(54, 64, height, p.c(0))),

		movingDiv(heightCallout(makeHeightHotspot("6")),
			p.percent(p.c(0), width, 0.9),
      p.linear(75, 85, height, p.c(0))),

    buildRuler(stage),

		//Scroller
		scrollerButtons(),
		scrollUpAnim()
	];

	//Loading anim logic
    var loadingFrontImage = PIXI.Sprite.fromImage(SN.preloaderAssets.LOADING_FRONT);
	var loadingClip = new PIXI.Graphics();
	var loadingRect = new PIXI.Graphics();
	var loadAnim = 0;
	stage.addChild(loadingClip);
	stage.addChild(loadingRect);
	stage.mask = loadingClip;

	calloutOpenFuncs[0]();

	//Primary render loops
	var lastTime = (new Date()).getTime();

	requestAnimFrame(animate);
	function animate() {
		var currentTime = (new Date()).getTime();
		var deltaT = currentTime - lastTime;
		lastTime = currentTime;
		scroller.updateFrame(deltaT);
		var t = scroller.getScroll() / animScale;

		_.each(images, function(imageFunction) {
			imageFunction(t);
		});

    menuChanges = {0: "blue", 32: "white", 53: "yellow"};

    _.each(menuChanges, function(what, when) {
      if (t >= when) setMenuColor(what);
    });

		if(loadAnim < 1) {
			loadAnim += deltaT / 750;
			var maxScale = (Math.max(w,h) / 40)

			loadingClip.position.x = w / 2;
			loadingClip.position.y = h / 2 + loadingFrontImage.height / 2;
			loadingClip.scale.x = loadAnim * maxScale;
			loadingClip.scale.y = loadAnim * maxScale;
			loadingClip.clear();
		    loadingClip.lineStyle(4, 0x000000);
		    loadingClip.beginFill(0x000000);
			SN.loaderMaskShape.draw(loadingClip, 1);
			loadingClip.endFill();

			loadingRect.position.x = w / 2;
			loadingRect.position.y = h / 2 + loadingFrontImage.height / 2;
			loadingRect.scale.x = loadAnim * maxScale;
			loadingRect.scale.y = loadAnim * maxScale;
			loadingRect.clear();
		    loadingRect.lineStyle(4, 0x56B2A6);
		    loadingRect.beginFill(0,0);
			SN.loaderMaskShape.draw(loadingRect, 1);
			loadingRect.endFill();
		} else if(stage.mask != null){
			stage.mask = null;
			stage.removeChild(loadingClip);
			stage.removeChild(loadingRect);
		}

	    renderer.render(stage);
	    requestAnimFrame( animate );
	}

	// convert <a> tags to clickable divs for mobile
	$('.billboard a').each( function() {
		//console.log( this );
		var datalink = this.pathname;
		var href = this.href;
		var title = this.title;
		var text = this.text;
 		
 		var changeling = document.createElement('span');
 		$( changeling ).addClass('clickable');
 		$( changeling ).attr('title',title);
 		$( changeling ).attr('data-link',datalink);
 		$( changeling ).attr('onclick','redirectlink("'+datalink+'")');
 		$( changeling ).html(text);
 		//$( changeling ).onclick( function(){
 			//redirectlink( $( this ).attr('data-link') );
 		//});
 		$( this ).parent().append( changeling );
   	$( this ).css( {'display':'none'} ); 
	});
	
	$(window).resize(onResize).resize();
	//console.log('startApp complete');
}

var starter = _.once(startApp);

function startLoader() {
	var h = 0;
	var w = 0;
	function onResize() {
		var $window = $(window);
	    w = $window.width();
		h = $window.height();

	    // Resizes the renderer
	    SN.renderer.resize(w, h);
	}
	$(window).resize(onResize).resize();


  //Load actual assets
  var assets = SN.Utils.flatten(SN.assets);
  var numAssets = assets.length + 1 /*hotspots*/ + SN.fonts.families.length;
  var assetLoader = new PIXI.AssetLoader(assets);
  var loaded = 0;
  var doneLoading = false;
  var endLoadAnim = 0;

  function progress() {
    loaded++;
    requestAnimFrame(animate);
  }

  function maybeLoaded() {
    if(loaded >= numAssets) {
      doneLoading = true;
      requestAnimFrame(animate);
    }
  }

  window.maybeLoaded = maybeLoaded;

  assetLoader.onComplete = maybeLoaded;
  assetLoader.onProgress = progress;
  assetLoader.load();

  // Loads the hotspots json
  //$.ajax("/callouts", {
  $.ajax("json/callouts.json", {
    dataType: "json",
    success: function(data) {
      loaded++;
      SN.hotspotData = data;
      maybeLoaded();
    },
    error: function(response) {
      //console.log("failed to load callouts data", response);
      $.ajax("json/callouts.json", {
                 dataType: "json",
                 success: function(data) {
                     loaded++;
                     SN.hotspotData = data;
                     maybeLoaded();
                 },
                 error: function() {
                    //console.log("failed to load callouts data");
                 }
      });

    }
  });

  //Loads the fonts
    WebFont.load({
        custom: SN.fonts,
        fontactive: progress,
        fontinactive: progress,
        active: maybeLoaded,
        inactive: maybeLoaded
    });

	//Render this thing
	var renderer = SN.renderer;
	var stage = new PIXI.Stage(0x000000, true);
    var loadingBack = PIXI.Sprite.fromImage(SN.preloaderAssets.LOADING_BACK);
    var loadingFront = PIXI.Sprite.fromImage(SN.preloaderAssets.LOADING_FRONT);
    var loadingWord = PIXI.Sprite.fromImage(SN.preloaderAssets.LOADING_WORD);
    var loadingSkip = PIXI.Sprite.fromImage(SN.preloaderAssets.LOADING_SKIP);
	var loadedRect = new PIXI.Graphics();
	var clip = new PIXI.Graphics();

	var container = new PIXI.DisplayObjectContainer();
	stage.addChild(container);
	container.addChild(loadingBack);
	container.addChild(loadingFront);
	container.addChild(loadingWord);
	container.addChild(loadingSkip);
	container.addChild(loadedRect);
	container.addChild(clip);
	loadingFront.mask = clip;
	loadingWord.position.x = loadingFront.width;
	loadedRect.position.y = loadingFront.height;
	loadedRect.position.x = loadingFront.width / 2;
	
	loadingSkip.position.y -= (loadingSkip.height + 37);
	loadingSkip.position.x -= loadingSkip.width/2 - loadingFront.width/2;
	
	loadingSkip.visible = false;
	loadingSkip.alpha = 0;
	loadingSkip.buttonMode = true;
	loadingSkip.interactive = true; //setInteractive(true);
	loadingSkip.click = loadingSkip.tap =  function(event) {
		window.location.assign("http://www.spaceneedle.com/hours-directions/")
	}


	requestAnimFrame(animate);
	var lastTime = 0;
	var startTime = (new Date()).getTime();

	function animate() {
		var percent = loaded / numAssets;
		
		var timeSinceStart = (new Date()).getTime();
		var loadDuration = (timeSinceStart - startTime) / 1000;
		// console.log( loadDuration, percent );
		
		if(loadDuration > 4 && percent < .65 && !loadingSkip.visible ) loadingSkip.visible = true;
		if(loadingSkip.visible && loadingSkip.alpha < 1 ) loadingSkip.alpha += .1;
		if(loadingSkip.alpha > 1 ) loadingSkip.alpha = 1;
    	
		clip.clear();
		clip.beginFill(0);
		clip.drawRect(0,(1 - percent) * loadingFront.height,loadingFront.width, percent * loadingFront.height);
		clip.endFill();
		loadingWord.position.y = (1-percent) * loadingFront.height - loadingWord.height / 2;

		container.position.x = (w-loadingFront.width) / 2;
		container.position.y = (h-loadingFront.height) / 2;

	    renderer.render(stage);


		if(doneLoading) {
			var currentTime = (new Date()).getTime();
			var deltaT = currentTime - lastTime;
			if(lastTime == 0) {
				deltaT = 0;
			}
			lastTime = currentTime;

			endLoadAnim += deltaT / 500;
			var endLoadAnimP1 = Math.min(endLoadAnim, 1);
			var endLoadAnimP2 = Math.max(0, endLoadAnim - 1);
			var scale = 1 - endLoadAnimP2;

			if(loadingFront.mask != null) {
				loadingFront.mask = null;
				container.removeChild(clip);
			}
			loadedRect.scale.x = scale;
			loadedRect.scale.y = scale;
			loadedRect.clear();
		    loadedRect.lineStyle(4, 0x56B2A6);
		    loadedRect.beginFill(0,0);
			SN.loaderMaskShape.draw(loadedRect, endLoadAnimP1);
			loadedRect.endFill();

			if(endLoadAnim > 1.5) {
    		starter();
				return;
			}
			requestAnimFrame(animate);
		}
	}
}

function start() {
	// create a renderer instance
	var renderer = SN.renderer = PIXI.autoDetectRenderer(620, 380, false, false, true);

	// set the canvas width and height to fill the screen
	renderer.view.style.position = "absolute";
	renderer.view.style.display = "block";

	// add render view to DOM
	$('#pixiStage').append(renderer.view);

	//Load preloader assets
	var assetLoader = new PIXI.AssetLoader(SN.Utils.flatten(SN.preloaderAssets));
	assetLoader.onComplete = startLoader;
	assetLoader.load();
}

$(document).ready(start);