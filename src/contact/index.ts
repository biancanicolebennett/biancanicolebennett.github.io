import "./styles.css";
import Page from "../Page";

// root level config.js
declare var config;

var contactPage;

export function initContact() {
    contactPage = new Page();
    contactPage.setContent(config.email);
    contactPage.setClassName("contact");
    contactPage.mountTo(document.body);
}

export function showContact() {
    contactPage.show();
}

export function hideContact() {
    contactPage.hide();
}