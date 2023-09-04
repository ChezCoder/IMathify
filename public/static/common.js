$(async function() {
    addLightDarkModeTransitionCSS();
    createHeader();
    generateBackgroundPanButtons();
});

function addLightDarkModeTransitionCSS() {
    window.setTimeout(function() {
        const css = $(`
            <style>
                * {
                    transition: background 1s, color 1s;
                }
            </style>
        `);
        $("body").prepend(css);
    }, 500);
}

async function createHeader() {
    const header = $(`
        <header>
            <div class="brand">
                <img class="logo-image" src="/static/logo.svg">
                <h1 class="brand-name">IMathify</h1>
            </div>
            <div class="nav">
                <button class="nav-button bg-pan" style="background: #007fff;">Try It</button>
            </div>
        </header>
    `);
    $("body").prepend(header);
}

function generateBackgroundPanButtons() {
    document.querySelectorAll("button.bg-pan").forEach(function(el) {
        const panner = document.createElement("div");
        panner.classList.add("bg-pan-div");
        panner.style.background = el.style.background;
        
        const text = document.createElement("span");
        text.classList.add("bg-pan-text")
        text.textContent = el.textContent;

        el.style.background = "transparent";
        el.textContent = "";
        
        el.appendChild(text);
        el.appendChild(panner);
    });
}