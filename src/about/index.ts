import "./styles.css";
import { bio, skills } from "../config";
import { queueTask } from "../taskqueue";
import Page from "../Page";

var aboutPage;

function createList(title: string, items: string[]) {
    let listEl, titleEl, itemsEl;
    listEl = document.createElement("div");
    listEl.className = "list";

    titleEl = document.createElement("h6");
    titleEl.className = "list-title";
    titleEl.textContent = title;

    itemsEl = document.createElement("div");
    itemsEl.textContent = items.join("\n");

    listEl.appendChild(titleEl);
    listEl.appendChild(itemsEl);
    return listEl;
}

function initLists() {
    let listWrap = document.createElement("div");
    let colA = createList("skills", skills);
    let colB = createList("", ["idk", "etc"]);
    let colC = createList("another col", ["things"]);
    listWrap.className = "list-wrap";
    listWrap.appendChild(colA);
    listWrap.appendChild(colB);
    listWrap.appendChild(colC);
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