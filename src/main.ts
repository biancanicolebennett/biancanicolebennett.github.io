import { queueTask } from "./taskqueue";
import { initPages } from "./pages";
import { initNav } from "./nav";
import { initSlider } from "./bg-adjust";

void function init() {
    queueTask(initPages);
    queueTask(initNav);
    queueTask(initSlider);
}();