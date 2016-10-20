SN.loaderMaskShape = {
    points: [
        { x: -42, y: -27 },
        { x:  43, y: -31 },
        { x:  43, y:  32 },
        { x: -42, y:  28 },
    ],

    draw: function(graphic, t) {
        t = Math.max(0, Math.min(1, t));

        var pFloor, pCeil, p, segments, i;

        segments = Math.floor(t*this.points.length);
        segments = Math.min(this.points.length-1, segments);
        graphic.moveTo(this.points[0].x, this.points[0].y);
        for (i=0; i<segments; i++) {
            graphic.lineTo(this.points[i+1].x, this.points[i+1].y);
        }
        pFloor = this.points[segments];
        pCeil = this.points[(segments+1)%this.points.length];
        p = t*this.points.length - segments;
        graphic.lineTo(p*pCeil.x + (1-p)*pFloor.x, p*pCeil.y + (1-p)*pFloor.y);
    }
}