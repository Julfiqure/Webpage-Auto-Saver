chrome.runtime.sendMessage({
    action: "savePage",
    filename: document.title.replace(/\W+/g, "_"),
    html: document.documentElement.outerHTML
}, response => {
    console.log("Background response:", response);
});
