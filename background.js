console.log('Background script running...');

//!  ---  ADD STYLES  ---  !//
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active && tab.url.includes('youtube')) {
        try {
            await chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ['styles.css']
            });
        } catch (err) {
            console.error('Failed to inject CSS: ', err);
        }
    }
});

//!  ---  TAB LOAD  ---  !//
let currentTabId;
let currentVideoId;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active && tab.url.includes('youtube.com/watch')) {
        const urlObj = new URL(tab.url);
        const temp = urlObj.searchParams.get('v');

        if (temp !== currentVideoId && temp !== null) {
            currentVideoId = temp;
            console.log(currentVideoId);
            
            currentTabId = tabId;
            setTimeout(() => {
                chrome.tabs.sendMessage(currentTabId, { header: 'complete' });
            }, 1000);
        }
    }
});

//!  ---  LISTENER  ---  !//
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.header === 'log') {
        console.log(request.payload);
    }

});
