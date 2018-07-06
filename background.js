// background.js

// Close tabs with matching titles when the extension icon gets clicked
chrome.browserAction.onClicked.addListener(function (tab) {

    console.log("background");

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        var activeTab = tabs[0];
        var tabTitle = activeTab.title;

        console.log(activeTab + " : " + tabTitle);

        chrome.tabs.query({ title: tabTitle, currentWindow: true }, function (tabs) {
            console.log(tabs);

            var tabIds = tabs.map(t => t.id);

            console.log(tabIds);
            chrome.tabs.remove(tabIds);
        });
    });
});

// close all tabs with the title "Swagger UI" when they are opened
chrome.tabs.onUpdated.addListener(function (tabId , info) {
    console.log(tabId + " " + info);
    if (info.status === 'complete') {
        
        chrome.tabs.query({ title: "Swagger UI" }, function (tabs) {
           
            console.log(tabs);
           
            var tabIds = tabs.map(t => t.id);

            chrome.tabs.remove(tabIds);
        });
    }
});