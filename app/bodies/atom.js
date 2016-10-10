(function(w) {
    var Atom, AtomMix;

    if (!w.Bread) {
        Bread.error.declare('Include bread');
        return;
    }

    Atom = function(attrs) {
        this.nucleusSize = attrs.nucleusSize || 1;
        this.nucleonSize = attrs.nucleonSize || 1;
        this.size = attrs.size || 1;
        this.cloudSize = attrs.cloudSize;
        this.nucleus = createNucleus.call(this);
        this.cloud = createElectrons.call(this, this.cloudSize);
        this.nOrbits = attrs.orbits;
        this.orbits = [];
        this.cloudFlow();
        this.nucleus.nucleonPosition();
    };

    Atom.prototype = {
        attach: function(universe) {
            universe.addIt(this.nucleus);
            universe.addGroup(this.cloud);
            universe.addGroup(this.nucleus);
        },
        render: function() {
            this.nucleus.render();
            this.cloud.render();
            this.cloud.move();
            this.cloud.collide();
        },
        cloudFlow: function() {
            var atom = this;
            Bread.forEach(this.cloud, function(electron) {
                electron.place(atom);
            });
        }
    }

    function createElectrons(n) {
        var eGroup, e, size, x, y;
        e = 0;
        size = (this.nucleusSize / 2) * this.size * this.nucleonSize;
        eGroup = cloud();
        while (e < n) {
            eGroup.push(electronFac({
                x: this.x - size,
                y: this.y,
                atom: this
            }));
            e++;
        }
        return eGroup;
    }

    function createNucleus() {
        var nucle, n;
        nucle = window.nucleus();
        n = 0;
        while (n < this.nucleusSize) {
            nucle.push(nucleonFac({
                x: this.x,
                y: this.y,
                size: this.nucleonSize,
                atom: this
            }));
            n++;
        }
        return nucle;
    }

    function createOrbits() {
        var nOrbits;
        nOrbits = 0;
        while (nOrbits < this.nOrbits) {
            this.orbits.push(Bread.circle({
                x: this.x,
                y: this.y,
                radius: this.nucleusSize * (5 + nOrbits)
            }))
            nOrbits++;
        }
    }

    AtomMix = Bread.augment(Bread.Point, [Atom]);

    window.atomFac = function(attrs) {
        var atm = new AtomMix({
            x: attrs.x,
            y: attrs.y,
            size: attrs.size,
            nucleusSize: attrs.nucleusSize,
            cloudSize: attrs.cloudSize,
            nucleonSize: attrs.nucleonSize,
            orbits: attrs.orbits || 1
        });
        return atm;
    }

})(window)
