(function(w) {
    var Nucleus, NucleusGroup;
    Nucleus = function() {

        this.side = 0;
        this.top = 0;
        this.decide = 0;
    };
    Nucleus.prototype.placeNucleons = function() {
        Bread.forEach(this, function(nucleon) {
            nucleon.place();
        });
    };
    NucleusGroup = Bread.augment(Bread.Group, [Nucleus]);

    w.nucleus = function() {
        return new NucleusGroup();
    };
})(window);