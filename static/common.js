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
    
    scripts.forEach(function(definition) {
        let element;

        // configure element to their respective attributes
        switch (definition.type) {
            case "script":
                element = document.createElement("script");
                element.src = definition.src;
                break;
            case "link":
                element = document.createElement("link");
                element.rel = "stylesheet";
                element.href = definition.src;
                break;
        }

        // load element
        document.appendChild(element);
    });
});