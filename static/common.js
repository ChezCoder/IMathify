// -- Dynamic script loader -- //
window.addEventListener("load", function() {
    const scripts = [
        // jQuery
        { "type": "script", "src": "/static/lib/jquery/jquery.min.js" },

        // mdb.js
        { "type": "script", "src": "/static/lib/mdb/js/mdb.min.js" },

        // mdb.css
        { "type": "link", "src": "/static/lib/mdb/css/mdb.min.css" },
    ];

    const LOG_STYLES = [
        "color: #00ffff;padding: 10px;",
        "color: 9999ff; text-decoration: underline;"
    ];

    console.log("%cDynamic Scripts Loader", "color: #ff0000;font-size: 15px;padding: 5px;");
    
    scripts.forEach(function(definition) {
        let element;

        // configure element to their respective attributes
        switch (definition.type) {
            case "script": {
                element = document.createElement("script");
                element.src = definition.src;
                console.log(`%cLoaded JavaScript: %c${definition.src}`, ...LOG_STYLES);
                break;
            }
            case "link": {
                element = document.createElement("link");
                element.rel = "stylesheet";
                element.href = definition.src;
                console.log(`%cLoaded StyleSheet: %c${definition.src}`, ...LOG_STYLES);
                break;
            }
        }

        // load element
        document.head.appendChild(element);
    });
});