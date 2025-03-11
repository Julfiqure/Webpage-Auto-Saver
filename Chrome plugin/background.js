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

      // Read the blob as a Data URL
      const reader = new FileReader();
      reader.onloadend = function () {
          chrome.downloads.download({
              url: reader.result,  // Use the Data URL instead
              filename: `saved_pages/${request.filename}.html`,
              saveAs: false
          });
          sendResponse({ status: "Page saved successfully!" });
      };
      reader.readAsDataURL(blob);  // Convert blob to Data URL
      return true; // Keeps sendResponse active for async operation
  }
});
