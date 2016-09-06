import "./styles.css";
import Page from "../Page";
import { email } from "../config";

var contactPage;

export function initContact() {
    contactPage = new Page();
    contactPage.setContent(email);
    contactPage.setClassName("contact-info");
    document.body.appendChild(contactPage.el);
}

export function showContact() {
    contactPage.show();
}

export function hideContact() {
    contactPage.hide();
}