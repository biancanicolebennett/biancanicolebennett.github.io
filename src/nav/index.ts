import "./styles.css";
import { queueTask } from "../taskqueue";
import { showHome, hideHome } from "../home";
import { showAbout, hideAbout } from "../about";
import { showContact, hideContact } from "../contact";

// root level config.js
declare var config;

const linkAttr = "data-link";

var currentPage;
var onBlur;

function clickLink(event) {
    let navTo = (<HTMLElement> event.target).getAttribute(linkAttr);
    if (navTo && navTo != currentPage) handleNavigate(navTo);
    history.pushState({ page: currentPage }, currentPage, "#" + currentPage);
}

function handleNavigate(dest) {
    switch (dest) {
        case "home":
            queueTask(onBlur);
            queueTask(showHome);
            onBlur = hideHome;
            break;

        case "about":
            queueTask(onBlur);
            queueTask(showAbout);
            onBlur = hideAbout;
            break;

        case "contact":
            queueTask(onBlur);
            queueTask(showContact);
            onBlur = hideContact;
            break;

        default: return;
    }
    currentPage = dest;
}

function checkHash() {
    let hash = window.location.hash;
    let reg_page = /(home|about|contact)$/;
    if (reg_page.test(hash)) {
        handleNavigate(hash.substring(1));
        history.replaceState({ page: currentPage }, currentPage, hash);
    }
}

export function initNav() {
    let links = config.links;
    currentPage = "home";
    onBlur = hideHome;
    queueTask(checkHash);
    window.addEventListener("popstate", function(event) {
        if (event.state.page) handleNavigate(event.state.page);
    });
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