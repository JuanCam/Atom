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
    };
    CloudGroup = Bread.augment(Bread.Group, [Cloud]);
    window.cloud = function() {
        return new CloudGroup();
    };
})(window);