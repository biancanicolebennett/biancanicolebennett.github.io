import "./styles.css";
import { headline } from "../config";
import Page from "../Page";

var homePage;

export function initHome() {
    homePage = new Page();
    homePage.setClassName("headline");
    homePage.setContent(headline);
    homePage.show();
    document.body.appendChild(homePage.el);
}

export function showHome() {
    homePage.show();
}

export function hideHome() {
    homePage.hide();
}