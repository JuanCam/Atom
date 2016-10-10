(function(w) {
    var Atom, AtomMix;

    if (!w.Bread) {
        Bread.error.declare('Include bread');
        return;
    }

    Atom = function(attrs) {
        this.atomicRadius = attrs.atomicRadius || 1;
        this.nucleonSize = attrs.nucleonSize || 1;
        this.nucleusSize = attrs.nucleusSize || 1;
        this.protons = attrs.protons;
        this.neutrons = attrs.neutrons;
        this.cloudSize = attrs.cloudSize;
        createElectrons.call(this);
        createNucleus.call(this);
        /*Locate electrons, protons and neutrons*/

        this.cloud.placeElectrons();
        this.nucleus.placeNucleons();
    };

    Atom.prototype = {
        attachTo: function(universe) {
            universe.addIt(this.nucleus);
            universe.addGroup(this.cloud);
            universe.addGroup(this.nucleus);
        },
        flowCloud: function() {
            this.cloud.move();
            this.cloud.collide();
        },
        render: function() {
            this.nucleus.render();
            this.cloud.render();
        }
    }

    function createElectrons(n) {
        var e = 0;
        this.cloud = cloud();
        while (e < this.cloudSize) {
            this.cloud.push(electronFac({
                x: this.x,
                y: this.y,
                atom: this
            }));
            e++;
        }
    }

    function createNucleus() {

        this.nucleus = nucleus();
        createProtons.call(this);
        createNeutrons.call(this);
    }

    function createProtons() {
        var n = 0;
        while (n < this.protons) {
            this.nucleus.push(nucleonFac({
                x: this.x,
                y: this.y,
                size: this.nucleonSize,
                atom: this,
                color: 'blue'
            }));
            n++;
        }
    }

    function createNeutrons() {

        var n = 0;
        while (n < this.neutrons) {
            this.nucleus.push(nucleonFac({
                x: this.x,
                y: this.y,
                size: this.nucleonSize,
                atom: this,
                color: 'red'
            }));
            n++;
        }
    }

    AtomMix = Bread.augment(Bread.Point, [Atom]);

    w.atomFac = function(attrs) {
        var atm = new AtomMix({
            x: attrs.x,
            y: attrs.y,
            atomicRadius: attrs.atomicRadius,
            nucleusSize: attrs.protons + attrs.neutrons,
            protons: attrs.protons,
            neutrons: attrs.neutrons,
            cloudSize: attrs.cloudSize,
            nucleonSize: attrs.nucleonSize
        });
        return atm;
    }

})(window)
