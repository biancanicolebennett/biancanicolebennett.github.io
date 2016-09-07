import "./styles.css";
import { queueTask } from "./taskqueue";
import { initNav } from "./nav";
import { initHome } from "./home";
import { initAbout } from "./about";
import { initContact } from "./contact";
import { initSlider } from "./bg-adjust";

void function init() {
    queueTask(initNav);
    queueTask(initHome);
    queueTask(initAbout);
    queueTask(initContact);
    queueTask(initSlider);
}();