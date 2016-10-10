(function(w) {
    var Atom, AtomMix;

    if (!w.Bread) {
        Bread.error.declare('Include bread');
        return;
    }

    Atom = function() {

    };

    Atom.prototype = {
        init: function(attrs) {
            this.nucelusSize = attrs.nucelusSize || 1;
            this.size = attrs.size || 1;
            this.cloud = attrs.cloud;
            this.nucleus = createNucleus.call(this);
            this.electrons = createElectrons.call(this, this.cloud)
        },
        attach: function(universe) {
            universe.addIt(this.nucleus);
            universe.addGroup(this.electrons);
        },
        render: function() {
            this.nucleus.render();
            this.electrons.render();
        },
        cloudFlow: function() {
            Bread.forEach(this.electrons, function(electron) {
                electron.place();
            });
        }
    }

    function createElectrons(n) {
        var electrons, e, size, x, y;
        e = 0;
        electrons = [];
        size = this.nucelusSize * this.size;

        while (e < n) {
            electrons.push(electronFac({
                x: this.x - size,
                y: this.y,
                atomSize: size,
                size: 3
            }));
            e++;
        }
        return Bread.group(electrons);
    }

    function createNucleus() {
        return Bread.circle({
            x: this.x,
            y: this.y,
            radius: this.nucelusSize
        });
    }

    AtomMix = Bread.augment(Bread.Point, [Atom]);

    window.atomFac = function(attrs) {
        var atm = new AtomMix({
            x: attrs.x,
            y: attrs.y
        });
        atm.init(attrs);
        return atm;
    }

})(window)
