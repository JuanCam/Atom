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
        fill: 'blue',
        x: 200,
        y: 45,
        font: '35px Georgia'
    });
    atom = atomFac({
        x: 300,
        y: 200,
        atomicRadius: 70,
        protons: 5,
        neutrons:5,
        nucleonSize: 5,
        cloudSize: 1700
    });

    atom.attachTo(reality);
    reality.addIt(title);

    reality.animation(function() {
        title.render();
        atom.render();
        atom.flowCloud();
    });

})(window);
