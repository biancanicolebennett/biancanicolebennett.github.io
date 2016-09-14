import "./styles.css";
import { queueTask } from "../taskqueue";
import Page from "../Page";

// root level config.js
declare var config;

var aboutPage;

function createList(title: string, items: string[]) {
    let listEl, titleEl, listItems, itemGroup;

    listEl = document.createElement("div");
    listEl.className = "list";
    titleEl = document.createElement("h6");
    titleEl.className = "list-title";
    titleEl.textContent = title;
    listItems = document.createElement("div");

    itemGroup = document.createElement("div");
    itemGroup.className = "list";
    itemGroup.textContent = items.join("\n");
    listItems.appendChild(itemGroup);

    listEl.appendChild(titleEl);
    listEl.appendChild(listItems);
    return listEl;
}

function initLists() {
    let listWrap = document.createElement("div");
    listWrap.className = "list-wrap";
    for (let group in config.aboutPageLists) {
        listWrap.appendChild(createList(group, config.aboutPageLists[group]));
    }
    aboutPage.contentEl.appendChild(listWrap);
}

export function initAbout() {
    aboutPage = new Page();
    aboutPage.setClassName("about");
    aboutPage.setContent(config.bio);
    aboutPage.mountTo(document.body);
    queueTask(initLists);
}

export function showAbout() {
    aboutPage.show();
}

export function hideAbout() {
    aboutPage.hide();
}