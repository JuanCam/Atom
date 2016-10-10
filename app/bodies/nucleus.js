(function(w) {
    var Nucleus, NucleusGroup;
    Nucleus = function() {

    };
    Nucleus.prototype.nucleonPosition = function() {

        Bread.forEach(this, function(nucleon) {
            nucleon.place();
        });
    };
    NucleusGroup = Bread.augment(Bread.Group, [Nucleus]);

    window.nucleus = function() {
        return new NucleusGroup();
    };
})(window);