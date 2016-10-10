(function(w) {
    var Electron, ElectronMix;

    if (!w.Bread) {
        Bread.error.declare('Include bread');
        return;
    }

    Electron = function() {

    };

    Electron.prototype = {
        init: function(attrs) {
            this.radius = attrs.size || 3;
            this.atomSize = attrs.atomSize;
        },
        place: function() {

        }
    }

    ElectronMix = Bread.augment(Bread.Circle, [Electron]);

    window.electronFac = function(attrs) {
        var atm = new ElectronMix({
            x: attrs.x,
            y: attrs.y
        });
        atm.init(attrs);
        return atm;
    }

})(window)
