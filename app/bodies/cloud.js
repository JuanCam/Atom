(function(w) {

    var Cloud, CloudGroup;
    Cloud = function() {

    };
    Cloud.prototype.collide = function() {
        var e, elec;
        e = 1;
        while (e < this.length) {
            elec = this[e - 1];
            this[e].collide(elec);
            e++;
        }
    }
    Cloud.prototype.placeElectrons = function() {
        Bread.forEach(this, function(electron) {
            electron.place();
        });
    }
    CloudGroup = Bread.augment(Bread.Group, [Cloud]);
    w.cloud = function() {
        return new CloudGroup();
    };

})(window);
