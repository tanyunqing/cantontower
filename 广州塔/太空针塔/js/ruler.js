SN.Ruler = function(sections, maxScroll) {
    this.view = new PIXI.DisplayObjectContainer();
    this.sections = sections;
    this.maxScroll = maxScroll;
    this.selectedSection = 0;

    // Builds the circles
    this.circles = [];
    this.filledCircles = [];

    var newCircle;
    for (var i=0; i<this.sections.length; i++) {
        newCircle = new PIXI.Graphics();
        newCircle.lineStyle(2, 0xffffff);
        newCircle.drawCircle(0, 0, 5);
        this.view.addChild(newCircle);
        this.circles.push(newCircle);

        newCircle = new PIXI.Graphics();
        newCircle.lineStyle(2, 0xffffff);
        newCircle.beginFill(0xffffff);
        newCircle.drawCircle(0, 0, 5);
        newCircle.endFill();
        newCircle.alpha = i==0 ? 1 : 0;
        this.view.addChild(newCircle);
        this.filledCircles.push(newCircle);
    }

    // Builds the elevator
    this.elevator = new PIXI.Graphics();
    this.elevator.lineStyle(0);
    this.elevator.beginFill(0xffffff);
    this.elevator.drawRect(-4, -8, 8, 16);
    this.elevator.endFill(0xffffff);
    this.elevator.position.x = 20;
    this.view.addChild(this.elevator);

    // Builds the marks
    var base = new PIXI.DisplayObjectContainer();
    var marksDistance = 13, markWidth = 5, markHeight = 1, sectorSize = 25, marksPerSector = 9;
    var pos = 0, numberLabel, mark, rulerWidth;

    rulerWidth = markWidth;

    for (var n=this.NEEDLE_HEIGHT; n>0; n -= sectorSize) {
        // The text
        numberLabel = new PIXI.Text(String(n), {
            font: "14px BreuerTextBold",
            fill: "#ffffff"
        });

        numberLabel.position.y = pos;
        pos += marksDistance + numberLabel.height;
        base.addChild(numberLabel);
        rulerWidth = Math.max(rulerWidth, numberLabel.width);

        // The labels
        for (var i=0; i<marksPerSector; i++) {
            mark = new PIXI.Graphics();
            mark.lineStyle(0);
            mark.beginFill(0xffffff);
            mark.drawRect(0, 0, markWidth, markHeight);
            mark.endFill();

            mark.position.y = pos;
            pos += marksDistance;
            base.addChild(mark);
        }
    }

    numberLabel = new PIXI.Text("0", {
        font: "14px BreuerTextBold",
        fill: "#ffffff"
    });    
    numberLabel.position.y = this.rulerHeight = pos;
    base.addChild(numberLabel);
    rulerWidth = Math.max(rulerWidth, numberLabel.width);

    var rulerTexture = new PIXI.RenderTexture(rulerWidth, pos + numberLabel.height);
    rulerTexture.render(base);

    this.rulerMarks = new PIXI.Sprite(rulerTexture);
    this.rulerMarks.position.x = 40;
    this.view.addChild(this.rulerMarks);

    // Final setup
    this.setScrollPos(0);
    this.setHeight($(window).height());
}

SN.Ruler.prototype = {
    NEEDLE_HEIGHT: 600,

    convertScrollPosition: function(value) {
        return this.height * (1 - value / this.maxScroll);
    },

    update: function() {
        // First, the elevator
        this.elevator.position.y = this.convertScrollPosition(this.scrollPos);

        // Then, the ruler
        this.rulerMarks.position.y = (1 - this.scrollPos / this.NEEDLE_HEIGHT) * (this.height - this.rulerHeight) - 7;
    },

    setHeight: function(value) {
        this.height = value;

        for (var i=0; i<this.sections.length; i++) {
            this.circles[i].position.y = this.convertScrollPosition(this.sections[i].scrollStart);
            this.filledCircles[i].position.y = this.circles[i].position.y;
        }
        this.update();
    },

    setScrollPos: function(value) {
        if (this.scrollPos!=value) {
            this.scrollPos = value;
            this.update();
        }

        // Light up the circle that is closest to the scroll position
        id = 0;
        while (id<this.sections.length && this.sections[id].scrollStart<=this.scrollPos+10) {
            id++;
        }
        id = Math.max(0, id - 1);

        if (id == this.selectedSection) {
            return;
        }

        TweenMax.to(this.filledCircles[this.selectedSection], 0.5, {
            alpha: 0,
            ease: Linear.easeNone
        });

        this.selectedSection = id;

        TweenMax.to(this.filledCircles[this.selectedSection], 0.5, {
            alpha: 1,
            ease: Linear.easeNone
        });
    }
}

buildRuler = function(stage) {

  // Builds the elevator
  this.elevator = new PIXI.Graphics();
  this.elevator.lineStyle(0);
  this.elevator.beginFill(0xffffff, 0.8);
  this.elevator.drawRect(-4, -8, 8, 16);
  this.elevator.endFill(0xffffff);
  this.elevator.position.x = 50;
  stage.addChild(this.elevator);

  var buildCircle = function(args) {

    var start = args[0];
    var end = args[1];
    var percentHeight = 1 - (args[2] / 72);

    // build geometry

    var newCircle = new PIXI.Graphics();
    newCircle.lineStyle(2, 0xffffff, 0.5);
    newCircle.drawCircle(15, 0, 5);
    newCircle.position.x = 10;
    stage.addChild(newCircle);

    var filledCircle = new PIXI.Graphics();
    filledCircle.lineStyle(2, 0xffffff);
    filledCircle.beginFill(0xffffff);
    filledCircle.drawCircle(15, 0, 5);
    filledCircle.endFill();
    filledCircle.position.x = 10;
    filledCircle.alpha = 0;
    stage.addChild(filledCircle);

    //build display fn

    return function(t) {

      // set the height
      
      var h = $(window).height();

      var yPos = percentHeight * (h - 40);

      filledCircle.position.y = yPos;
      newCircle.position.y = yPos;


      // hide or show
      if ((t >= start) && (t < end)) {
        filledCircle.alpha = 1;
      }
      else {
        filledCircle.alpha = 0;
      }
    };

  };

                  //start, end, t value for the dot
  var circles =   [[ 0,  8,  1],
                   [ 8, 24, 15],
                   [24, 35, 30], //Where is this dot, there's no billboard in this section
                   [35, 42, 38],
                   [41, 57, 46],
                   [57, 72, 62]];

  var circleFns = _.map(circles, buildCircle);

  // a function that calls all the circleFns
  var drawCircles = _.splat(_.juxt)(circleFns);

  var setElevatorPos = function(t) {
      var h = $(window).height();
	  var percentHeight = 1 -(t / 72);
	  var yPos = percentHeight * (h - 40);
	  elevator.position.y = yPos;
  };

  var p = SN.positioning;
  p.c = p.constant;

  return _.juxt(drawCircles,
                setElevatorPos);

};