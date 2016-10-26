(function(w) {
    var Electron, ElectronMix;

    if (!w.Bread) {
        Bread.error.declare('Include bread');
        return;
    }

    Electron = function(attrs) {
        this.atom = attrs.atom;
        this.radius = attrs.radius;
        this.fill = attrs.fill;
        this.stroke = attrs.stroke;
    };

    Electron.prototype = {
        place: function() {
            var size, angle, subsize;
            size = this.atom.atomicRadius;
            angle = Bread.random.rand(0, Math.PI * 2);
            subsize = Bread.random.rand(0, size * 2);
            this.x = this.x + subsize * Math.cos(angle);
            this.y = this.y + subsize * Math.sin(angle);
            this.angle = Bread.random.rand(0, Math.PI * 2);
            this.speed = Bread.random.randomInPortions([-3, -2.5], [2.5, 3]);
        },
        move: function() {
            Bread.Body.prototype.move.call(this);
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
        var size = this.atom.atomicRadius * 2;
        if (this.distance(this.atom) > size) impulseElectron.call(this);
    }

    function impulseElectron() {

        var angle = (this.angle > 0) ? this.angle - Math.PI : this.angle + Math.PI;
        this.impulse(this.speed, 0, angle);
    }

    w.electronFac = function(attrs) {
        var elect = new ElectronMix({
            x: attrs.x,
            y: attrs.y,
            radius: attrs.size || 1,
            fill: '#ff9999',
            stroke: '#ff9999',
            atom: attrs.atom
        });
        return elect;
    }

})(window)
