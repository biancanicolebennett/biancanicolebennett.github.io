import "./styles.css";
import { bio, aboutPageLists } from "../config";
import { queueTask } from "../taskqueue";
import Page from "../Page";

var aboutPage;

function createList(title: string, items: string[]) {
    let listEl, titleEl, listItems, itemGroup;

    listEl = document.createElement("div");
    listEl.className = "list";
    titleEl = document.createElement("h6");
    titleEl.className = "list-title";
    titleEl.textContent = title;
    listItems = document.createElement("div");

    for (let i = 0; i < items.length; i += 4) {
        itemGroup = document.createElement("div");
        itemGroup.className = "list";
        itemGroup.textContent = items.slice(i, i + 4).join("\n");
        listItems.appendChild(itemGroup);
    }

    listEl.appendChild(titleEl);
    listEl.appendChild(listItems);
    return listEl;
}

function initLists() {
    let listWrap = document.createElement("div");
    let listTitles = Object.keys(aboutPageLists);
    listWrap.className = "list-wrap";
    for (let i = 0, j = listTitles.length; i < j; ++i) {
        listWrap.appendChild(createList(listTitles[i], aboutPageLists[listTitles[i]]));
    }
    aboutPage.contentEl.appendChild(listWrap);
}


export function initAbout() {
    aboutPage = new Page();
    aboutPage.setContent(bio);
    aboutPage.hide();
    document.body.appendChild(aboutPage.el);
    queueTask(initLists);
}

export function showAbout() {
    aboutPage.show();
}

export function hideAbout() {
    aboutPage.hide();
}