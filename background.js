chrome.runtime.onInstalled.addListener(function() {

    chrome.contextMenus.create({
        "title": 'SAVE INFO',
        "contexts": ["all"],
        "id": "SAVE_INFO"
    });

});
    
chrome.contextMenus.onClicked.addListener(function(info, tab) {

    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "save"); 
    }); 

})