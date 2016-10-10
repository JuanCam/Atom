(function(w) {
    var Nucleon, NucleonMix;

    if (!w.Bread) {
        Bread.error.declare('Include bread');
        return;
    }

    Nucleon = function(attrs) {
        this.atom = attrs.atom;
        this.atomSize = this.atom.size;
        this.radius = attrs.radius;
        this.fill = attrs.fill;
        this.stroke = attrs.stroke;
    };

    Nucleon.prototype = {
        place: function() {
            var size, angle, subsize;
            size = (this.atom.nucleusSize / 3) * this.atom.nucleonSize;
            angle = Bread.random.rand(0, Math.PI * 2);
            subsize = Bread.random.rand(0, size);
            this.x = this.atom.x + subsize * Math.cos(angle);
            this.y = this.atom.y + subsize * Math.sin(angle);
            this.angle = angle;
        }
    }

    NucleonMix = Bread.augment(Bread.Body, [Bread.Circle, Nucleon]);

    function bound(atom) {
        var size = this.atom.nucelusSize * this.atom.size * this.atom.nucleonSize;
        if (this.distance(this.atom) > size) impulseNucleon.call(this);
    }

    window.nucleonFac = function(attrs) {
        var nucle, color, i;
        i = Math.round(Bread.random.rand(0, 1));
        color = ['red', 'blue'][i];
        nucle = new NucleonMix({
            x: attrs.x,
            y: attrs.y,
            radius: attrs.size || 1,
            fill: color,
            stroke: color,
            atom: attrs.atom
        });
        return nucle;
    }

})(window)