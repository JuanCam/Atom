(function() {
    var canvas, reality, atom, electrons;
    canvas = document.getElementById('canvas_el');
    canvas.width = 700;
    canvas.height = 420;
    reality = Bread.universe({
        el: canvas,
        frate: 1000 / 24
    });
    atom = atomFac({
        x: 200,
        y: 150,
        size: 7,
        nucelusSize: 12,
        cloud: 120
    });
    atom.attach(reality);

    reality.animation(function() {
        atom.render();
    });

})(window);
