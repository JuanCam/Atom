(function(w) {
    var Electron, ElectronMix;

    if (!w.Bread) {
        Bread.error.declare('Include bread');
        return;
    }

    Electron = function(attrs) {
        this.atom = attrs.atom;
        this.atomSize = this.atom.size;
        this.radius = attrs.radius;
        this.fill = attrs.fill;
        this.stroke = attrs.stroke;
    };

    Electron.prototype = {
        place: function() {
            var size, angle, subsize;
            size = (this.atom.nucleusSize / 2) * this.atom.size * this.atom.nucleonSize;
            angle = Bread.random.rand(0, Math.PI * 2);
            subsize = Bread.random.rand(0, size);
            this.x = this.atom.x + subsize * Math.cos(angle);
            this.y = this.atom.y + subsize * Math.sin(angle);
            this.angle = angle;
            this.speed = Bread.random.randomInPortions([-5, -3], [3, 5]);
        },
        move: function() {
            var size;
            Bread.Body.prototype.move.call(this);
            size = this.atom.nucleusSize * this.atom.size * this.atom.nucleonSize;
            bound.call(this);
        },
        collide: function(electron) {
            if (this.collision(electron)) {
                impulseElectron.call(this);
            }
        }
    }

    ElectronMix = Bread.augment(Bread.Body, [Bread.Circle, Electron]);

    function bound(atom) {
        var size = this.atom.nucleusSize * this.atom.size * this.atom.nucleonSize;
        if (this.distance(this.atom) > size) impulseElectron.call(this);
    }

    function impulseElectron() {

        var angle = (this.angle > 0) ? this.angle - Math.PI : this.angle + Math.PI;
        this.impulse(this.speed, 0, angle);
    }

    window.electronFac = function(attrs) {
        var elect = new ElectronMix({
            x: attrs.x,
            y: attrs.y,
            radius: attrs.size || 1,
            fill: '#2eb82e',
            stroke: '#2eb82e',
            atom: attrs.atom
        });
        return elect;
    }

})(window)
