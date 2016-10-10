(function() {
    var canvas, reality, atom, electrons, title;
    canvas = document.getElementById('canvas_el');
    canvas.width = 700;
    canvas.height = 420;
    reality = Bread.universe({
        el: canvas,
        frate: 1000 / 24
    });

    title = Bread.text({
        text: 'Model atom',
        fill: 'red',
        x: 200,
        y: 45,
        font: '35px Georgia'
    });
    atom = atomFac({
        x: 300,
        y: 200,
        size: 3,
        nucleusSize: 9,
        nucleonSize: 5,
        cloudSize: 400,
        orbits: 3
    });
    atom.attach(reality);
    reality.addIt(title);

    reality.animation(function() {
        atom.render();
        title.render();
    });

})(window);