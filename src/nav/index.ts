import "./styles.css";
import { queueTask } from "taskqueue";
import { showHome, hideHome } from "pages/home";
import { showAbout, hideAbout } from "pages/about";
import { showContact, hideContact } from "pages/contact";

// root level config.js
declare var config;

const linkAttr = "data-link";

var currentPage: number,
    pageNames: string[],
    showActions: Function[],
    blurActions: Function[];


/**
 * @param  {string}  dest name of page
 * @return {boolean}      true if current page will change
 */
function handleNavigate(dest: string) : boolean {
    let i = pageNames.indexOf(dest);
    if (~i && i !== currentPage) {
        if (~currentPage) {
            queueTask(blurActions[currentPage]);
        }
        currentPage = i;
        queueTask(showActions[currentPage]);
        return true;
    }
    return false;
}


/**
 * event handlers
 */

function clickLink(event) {
    if ( handleNavigate((<HTMLElement> event.target).getAttribute(linkAttr))) {
        history.pushState({ page: pageNames[currentPage] },
                            pageNames[currentPage],
                            "#/" + pageNames[currentPage]);
    }
}

function handlePopState(event) {
    if (event.state && event.state.hasOwnProperty("page")) {
        handleNavigate(event.state.page);
    }
}


/**
 * init tasks
 */

function checkHash() {
    let hash = window.location.hash.match(/(home|about|contact)$/);
    handleNavigate(hash && hash.length ? hash[0] : "home");
    window.addEventListener("popstate", handlePopState);
    history.replaceState({ page: pageNames[currentPage] },
                            pageNames[currentPage],
                            "#/" + pageNames[currentPage]);
}

function initLinks() {
    let links = config.links;
    let linksEl = document.getElementById("links");
    linksEl.addEventListener("click", clickLink, false);

    for (let i = 0; i < links.length; ++i) {
        let el = document.createElement("div");
        el.className = "link";
        el.textContent = links[i];
        el.setAttribute(linkAttr, links[i]);
        linksEl.appendChild(el);
    }
}

export function initNav() {
    currentPage = -1;
    pageNames = ["home", "about", "contact"];
    showActions = [showHome, showAbout, showContact];
    blurActions = [hideHome, hideAbout, hideContact];

    queueTask(checkHash);
    queueTask(initLinks);
}