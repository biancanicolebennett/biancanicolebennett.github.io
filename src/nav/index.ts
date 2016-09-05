import "./styles.css";
import { links } from "../config";
import { queueTask } from "../taskqueue";
import { showHome, hideHome } from "../home";
import { showAbout, hideAbout } from "../about";
import { showContact, hideContact } from "../contact";

const linkAttr = "data-link";

var currentPage;
var onBlur;

function clickLink(event) {
    let navTo = (<HTMLElement> event.target).getAttribute(linkAttr);
    if (navTo && navTo != currentPage) handleNavigate(navTo);
    history.pushState({ page: currentPage }, currentPage, currentPage);

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

export function initNav() {
    currentPage = "home";
    onBlur = hideHome;
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