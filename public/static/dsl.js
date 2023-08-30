// -- Dynamic script loader -- //
window.addEventListener("load", function() {
    const scripts = [
        // jQuery
        { "type": "js", "src": "/static/lib/jquery/jquery.min.js" },

        // mdb.js
        { "type": "js", "src": "/static/lib/mdb/js/mdb.min.js" },

        // mdb.css
        { "type": "css", "src": "/static/lib/mdb/css/mdb.min.css" },
        
        // common js
        { "type": "js", "src": "/static/common.js" },

        // dark theme
        { "type": "css", "src": "/static/dark.css" },

        // light theme
        { "type": "css", "src": "/static/light.css" },
        
        // main script.js
        { "type": "js", "src": "./script.js" },

        // main styles.css
        { "type": "css", "src": "./styles.css" },

    ];

    const LOG_STYLES = [
        "color: #00ffff;padding: 10px;",
        "color: 9999ff; text-decoration: underline;"
    ];

    console.log("%cDynamic Scripts Loader", "color: #ff0000;font-size: 15px;padding: 5px;");
    
    (async function() {
        for (const script of scripts) {
            let element;
        
            // configure element to their respective attributes
            switch (script.type) {
                case "js": {
                    element = document.createElement("script");
                    element.src = script.src;
                    console.log(`%cLoaded JavaScript: %c${script.src}`, ...LOG_STYLES);
                    break;
                }
                case "css": {
                    element = document.createElement("link");
                    element.rel = "stylesheet";
                    element.href = script.src;
                    console.log(`%cLoaded StyleSheet: %c${script.src}`, ...LOG_STYLES);
                    break;
                }
            }
        
            // load elements sync
            document.head.appendChild(element);
            await new Promise(r => element.addEventListener("load", r));
        }
    })();
});