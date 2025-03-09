const pageContent = document.documentElement.outerHTML;
const filename = new Date().toISOString().replace(/:/g, "-");

chrome.runtime.sendMessage({
    action: "savePage",
    filename: document.title.replace(/\W+/g, "_"),
    html: document.documentElement.outerHTML
});

