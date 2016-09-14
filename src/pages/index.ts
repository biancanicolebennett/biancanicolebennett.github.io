import "./styles.css";
import { queueTask } from "taskqueue";
import { initHome } from "./home";
import { initAbout } from "./about";
import { initContact } from "./contact";

export function initPages() {
    queueTask(initHome);
    queueTask(initAbout);
    queueTask(initContact);
}