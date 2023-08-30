$(function() {
    // getStartedFader();
    questionsSolvedAnimation();
});

function getStartedFader() {
    const rate = 0.0008;
    const range = [0, 0.5]

    let time = 0;
    let velo = 1;

    setInterval(function() {
        const b = time * 255;
        $(".get-started").css("background", `radial-gradient(rgb(${b}, ${b}, ${b}), black 20%)`);

        time += velo * rate;

        if (time >= range[1] || time <= range[0]) {
            velo *= -1;
        }
    }, 1);
}

function questionsSolvedAnimation() {
    const formatNumber = function(n) {
        const nstr = n.toString();
        let result = "";
        for (let i = 0;i < nstr.length;i++) {
            if (i % 3 == 0 && i !== 0) {
                result = "," + result;
            }
            result = nstr.substr(-(i + 1), 1) + result;
        }
        return result;
    };

    const numSolved = Math.floor(Math.random() * 1_000_000);
    const steps = [];

    let buffer = numSolved.valueOf();

    while (buffer > 0) {
        const places = buffer.toString().length;
        const step = Math.ceil(Math.pow(10, places - 1) / 5);
        steps.push(buffer);
        buffer -= step;
    }
    steps.reverse();
    
    const $questionsSolved = $("#questions-solved");
    
    console.log(steps);

    for (let i = 0;i < steps.length;i++) {
        const step = steps[i];
        
        setTimeout(function() {
            const r = 2;
            const rx = Math.random() * r * 2 - r;
            const ry = Math.random() * r * 2 - r;
            const fStep = formatNumber(step);
            
            $questionsSolved.text(fStep);
            $questionsSolved.css("transform", `translate(${rx}px, ${ry}px)`);
        }, i * 10);
    }

    setTimeout(function() {
        $questionsSolved.css("transform", "translate(0px, 0px)");
    }, steps.length * 10 + 1);
}