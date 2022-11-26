const update = (button, toggle) => {
    chrome.storage.sync.get(["enabled"], function (result) {
        let paragraph = document.getElementById("lecture-no-more-text");
        let enabled = result.enabled;

        if (toggle) {
            enabled = !enabled;
            chrome.storage.sync.set({ enabled: enabled });
        }

        paragraph.innerText = enabled ? "Lecture No More is enabled" : "Lecture No More is disabled";
        button.innerText = enabled ? "DISABLE" : "ENABLE";
    });
};

const onClick = (event) => {
    update(event.target, true);
};

let button = document.getElementById("lecture-no-more-button");
button.addEventListener("click", onClick);
update(button, false);
