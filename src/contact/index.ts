import "./styles.css";
import Page from "../Page";

// root level config.js
declare var config;

var contactPage;

export function initContact() {
    contactPage = new Page();
    contactPage.setContent(config.email);
    contactPage.setClassName("contact-info");
    document.body.appendChild(contactPage.el);
}

export function showContact() {
    contactPage.show();
}

export function hideContact() {
    contactPage.hide();
}