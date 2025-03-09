document.addEventListener("DOMContentLoaded", () => {
    const domainInput = document.getElementById("domainInput");
    const addDomainBtn = document.getElementById("addDomain");
    const domainList = document.getElementById("domainList");

    function loadDomains() {
        chrome.storage.sync.get(["domains"], (data) => {
            domainList.innerHTML = "";
            const domains = data.domains || [];
            domains.forEach(domain => {
                const li = document.createElement("li");
                li.textContent = domain;
                const removeBtn = document.createElement("button");
                removeBtn.textContent = "Remove";
                removeBtn.style.marginLeft = "10px";
                removeBtn.onclick = () => removeDomain(domain);
                li.appendChild(removeBtn);
                domainList.appendChild(li);
            });
        });
    }

    function addDomain() {
        const domain = domainInput.value.trim();
        if (!domain) return;
        
        chrome.storage.sync.get(["domains"], (data) => {
            let domains = data.domains || [];
            if (!domains.includes(domain)) {
                domains.push(domain);
                chrome.storage.sync.set({ domains }, loadDomains);
            }
        });

        domainInput.value = "";
    }

    function removeDomain(domain) {
        chrome.storage.sync.get(["domains"], (data) => {
            let domains = data.domains || [];
            domains = domains.filter(d => d !== domain);
            chrome.storage.sync.set({ domains }, loadDomains);
        });
    }

    addDomainBtn.addEventListener("click", addDomain);
    loadDomains();
});
