$(function() {
    addLightDarkModeTransitionCSS();
    createHeader();
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

function createHeader() {
    const header = $(`
        <header>
            <div class="brand">
                <img class="logo-image" src="/static/logo.svg">
                <h1 class="brand-name">IMathify</h1>
            </div>
        </header>
    `);
    $("body").prepend(header);
}