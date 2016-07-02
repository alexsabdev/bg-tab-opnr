(function() {
    'use strict';
    console.log('bgTabOpnr >> Running content.js script...');
    /**
     * extracting links from DOM based on specific algorithm; you should paste yours.
     * @param  {String} linkClass css class
     * @return {Array}           array of links
     */
    function extractLinks() {
        console.log('bgTabOpnr >> Extracting links...');
        var linkClass = 'tag-list';
        var list_node = document.getElementsByClassName(linkClass);
        var res = [];
        for (var i = 0; i < list_node.length; i++) {
            var url = list_node[i].children[1].children[0].href;
            res.push(url);
        }
        console.log('bgTabOpnr >> Number of extracted links: ' + res.length);
        return res;
    }
    /**
     * port connecting to background.js
     * @type {Object}
     */
    var messagePort = chrome.runtime.connect({ name: 'giveUrls' });
    /**
     * extracted links
     * @type {Array}
     */
    var links = extractLinks();
    // sending links to background.js
    if (links.length !== 0) {
        messagePort.postMessage({
            links: links
        });
        console.log('bgTabOpnr >> Extracted links were passed to background.js.');
    } else {
        console.log('bgTabOpnr >> Nth is passed to background.js, since number of extracted links: ' + links.length);
    }
    console.log('bgTabOpnr >> Content.js script is finished.');
})();