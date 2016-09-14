import "./styles.css";
import { queueTask } from "taskqueue";

var val;
var bg;
var slider;


function updateBackground() {
    bg.style.opacity = (slider.value / 100).toFixed(3);
}

function handleChange(event) {
    queueTask(updateBackground);
}

export function initSlider() {
    bg = document.getElementById("background");

    slider = document.createElement("input");
    slider.type = "range";
    slider.className = "slider";
    slider.min = "0";
    slider.max = "100";
    slider.addEventListener("change", handleChange);

    document.body.appendChild(slider);
}