(function() {
    'use strict';
    console.log('bgTabHlpr >> Initializing content.js script...');
    /**
     * extracting links from DOM based on specific algorithm
     * @param  {String} linkClass css class
     * @return {Array}           array of links
     */
    function extractLinks(linkClass) {
        var list_node = document.getElementsByClassName(linkClass);
        var res = [];
        for (var i = 0; i < list_node.length; i++) {
            var url = list_node[i].children[1].children[0].href;
            res.push(url);
        }
        return res;
    }
    /**
     * listening for start and end vars from background.js
     * @param  {Object} request       object containing passed vars
     * @param  {Object} sender        object containing sender meta data
     * @param  {Object} sendResponse  object sent back to background.js
     */
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log('bgTabHlpr >> Extracting links...');
            var links = extractLinks(request.linkClass);
            sendResponse({ links: links });
            if (links.length === 0) {
            	console.log('bgTabHlpr >> Extracting error.');
            } else {
            	console.log('bgTabHlpr >> Extraction completed.');
            }
        }
    );
    console.log('bgTabHlpr >> Content.js script is initialized.');
})();