chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    chrome.storage.sync.get(["domains"], (data) => {
      const domainsToSave = data.domains || [];
      const urlObj = new URL(tab.url);

      if (domainsToSave.includes(urlObj.hostname)) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content.js"]
        });
      }
    });
  }
});
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "savePage") {
      const blob = new Blob([request.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      
      chrome.downloads.download({
        url: url,
        filename: '${request.filename}.html',
        saveAs: true
      });
    }
  });
