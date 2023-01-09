var getClassTiles = () => {
    let elements = document.getElementsByClassName("tdFormList1DSheTeaGrpHTM4");
    let index = 0;
    let tiles = {};

    for (let element of elements) {
        let subjectElement = element.children[0].children[0];
        if (!subjectElement) {
            continue;
        }

        // every other element is teachers name
        if (index % 2 === 0) {
            let subject = subjectElement.innerText;
            let type = element.children[0].children[2].innerText;
            let id = subject + "_" + type;

            if (subject) {
                if (!tiles[id]) {
                    tiles[id] = [element];
                } else {
                    tiles[id].push(element);
                }
            }
        }
        index++;
    }
    return tiles;
};

const tiles = getClassTiles();

var toggleLectures = (enabled) => {
    let visibility = enabled ? "hidden" : "visible";

    for (let el of document.getElementsByTagName("b")) {
        if (el.innerHTML === "w") {
            el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.visibility =
                visibility;
        }
    }
};

var toggleTiles = (subjects) => {
    for (let subject in subjects) {
        let enabled = subjects[subject];
        let visibility = enabled ? "visible" : "hidden";
        for (let tile of tiles[subject]) {
            tile.parentElement.parentElement.parentElement.parentElement.parentElement.style.visibility = visibility;
        }
    }
};

var listenChrome = (target, callback) => {
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let key in changes) {
            if (key === target) {
                callback(changes[key].newValue);
            }
        }
    });
};

var updateMissingSubjects = () => {
    chrome.storage.sync.get(["subjects"], function (result) {
        let subjectsSaved = result.subjects || {};
        let newSubjects = {};

        console.log(subjectsSaved);
        for (let subject in tiles) {
            if (subject in subjectsSaved) {
                newSubjects[subject] = subjectsSaved[subject];
            } else {
                newSubjects[subject] = true;
            }
        }
        chrome.storage.sync.set({ subjects: newSubjects });
    });
};

chrome.storage.sync.get(["enabled"], function (result) {
    toggleLectures(result.enabled);
});

listenChrome("enabled", toggleLectures);
listenChrome("subjects", toggleTiles);
updateMissingSubjects();
