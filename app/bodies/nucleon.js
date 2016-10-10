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
            var nucleus = this.atom.nucleus;
            this.angle = Bread.random.rand(0, Math.PI * 2);
            movePlace.call(this, nucleus);
            if (nucleus.decide % 2 == 0) {
                nucleus.side = 1;
                nucleus.top = 0;
            } else {
                nucleus.side = 0;
                nucleus.top = 1;
            }
        }
    }

    NucleonMix = Bread.augment(Bread.Body, [Bread.Circle, Nucleon]);

    function movePlace(nucleus) {
        if (!nucleus.side && !nucleus.top) {
            this.x = this.atom.x;
            this.y = this.atom.y;
            nucleus.decide = Math.round(Bread.random.rand(1, 4));
        } else if (nucleus.side && !nucleus.top) {
            decide.call(this, nucleus, 'x', 2, 4);
        } else if (!nucleus.side && nucleus.top) {
            decide.call(this, nucleus, 'y', 1, 3);
        }
    }

    function decide(nucleus, axis, v1, v2) {
        var n1, n2, nucleus;
        n1 = (v1 == 1) ? 2 : 1;
        n2 = (v2 == 3) ? 4 : 3;
        if (nucleus.decide == v1) this[axis] -= this.atom.nucleonSize * Bread.random.rand(1.5, 2);
        if (nucleus.decide == v2) this[axis] += this.atom.nucleonSize * Bread.random.rand(1.5, 2);
        nucleus.decide = [n1, n2][Math.round(Bread.random.rand(0, 1))];
    }

    w.nucleonFac = function(attrs) {
        var nucle = new NucleonMix({
            x: attrs.x,
            y: attrs.y,
            radius: attrs.size || 1,
            fill: attrs.color,
            stroke: attrs.color,
            atom: attrs.atom
        });
        return nucle;
    }

})(window)
