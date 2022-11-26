var toggle = (enabled) => {
    let visibility = enabled ? "hidden" : "visible";

    for (let el of document.getElementsByTagName("b")) {
        if (el.innerHTML === "w") {
            el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.visibility =
                visibility;
        }
    }
};

chrome.storage.sync.get(["enabled"], function (result) {
    toggle(result.enabled);
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let key in changes) {
        if (key === "enabled") {
            toggle(changes[key].newValue);
        }
    }
});
