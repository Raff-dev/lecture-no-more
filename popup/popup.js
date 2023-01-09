const update = (button, toggle) => {
    console.log("egegeg");
    chrome.storage.sync.get(["enabled"], function (result) {
        let paragraph = document.getElementById("text");
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

const onCheckboxChange = (event) => {
    let enabled = event.target.checked;
    let subject = event.target.value;

    chrome.storage.sync.get(["subjects"], function (result) {
        let subjects = result.subjects;
        subjects[subject] = enabled;
        chrome.storage.sync.set({ subjects: subjects });
    });
};

const createCheckboxes = (subjects) => {
    if (!subjects) {
        return;
    }

    let checkboxes = document.getElementById("checkboxes");
    checkboxes.innerHTML = "";

    for (let subject in subjects) {
        let container = document.createElement("div");
        let enabled = subjects[subject];
        let checkboxId = "checkbox-" + subject;

        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = checkboxId;
        input.value = subject;
        input.checked = enabled;
        input.addEventListener("change", onCheckboxChange);
        container.appendChild(input);

        let label = document.createElement("label");
        label.setAttribute("for", checkboxId);
        label.textContent = subject;
        container.appendChild(label);
        checkboxes.appendChild(container);
    }
};

chrome.storage.sync.get(["subjects"], function (result) {
    createCheckboxes(result.subjects);
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let key in changes) {
        if (key === "subjects") {
            createCheckboxes(changes[key].newValue);
        }
    }
});

let button = document.getElementById("buttonqwe");
button.addEventListener("click", onClick);
update(button, false);
