/**
 * limit of links to open
 * @type {Number}
 */
var start = 0;
var end = 0;
/**
 * function invoked on click of button from popup.html
 * @param  {Number} start  order number of the first link to open
 * @param  {Number} end order number of the last link to open
 */
function handleButtonClick(st, en) {
    // run content.js
    chrome.tabs.executeScript(null, { file: "content.js" });
    start = st;
    end = en;
}
/**
 * listening to port connecting to contents.js
 * @param  {Object} port
 */
chrome.runtime.onConnect.addListener(function(messagePort) {
    messagePort.onMessage.addListener(function(message) {
        console.log(message.links.length);
        var len = message.links.length;
        if (end > len) {
            end = len;
        }
        for (var i = start; i < end; i++) {
            openTab(message.links[i]);
        }
    });
});
/**
 * function opening a background tab
 * @param  {String} url html page link
 */
function openTab(url) {
    console.log('bgTabHlpr >> Opening a tab for a link: ' + url + '...');
    chrome.tabs.create({
        active: false,
        url: url
    }, function(tab) {
        console.log('bgTabHlpr >> Opened a tab: ' + tab + '.');
    });
}
