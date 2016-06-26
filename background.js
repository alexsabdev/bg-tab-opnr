/**
 * function invoked on click of button from popup.html
 * @param  {Number} start  order number of the first link to open
 * @param  {Number} end order number of the last link to open
 */
function handleButtonClick(start, end) {
    // run content.js
    chrome.tabs.executeScript(null, { file: "content.js" });
    // send css class for extraction to content.js
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { linkClass: 'tag-list' }, function(response) {
            console.log(response.links);
            var len = response.links.length;
            if (end > len) {
                end = len;
            }
            for (var i = start; i < end; i++) {
                openTab(response.links[i]);
            }
        });
    });
}
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