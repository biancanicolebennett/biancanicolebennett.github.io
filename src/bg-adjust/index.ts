import "./styles.css";
import { queueTask } from "taskqueue";


const cookiename = "bgval="
const reg_bg = /bgval=.*\b/;

var bg;
var slider;


function setCookie() {
    var d = new Date();
    d.setTime(d.getTime() + 31536000000);
    document.cookie = document.cookie.replace(reg_bg,
        cookiename + slider.value + "; expires=" + d.toUTCString());
}

function checkCookie() {
    let matches = document.cookie.match(reg_bg);
    if (matches && matches.length) {
        let val = parseInt(matches[0].substring(cookiename.length));
        if (isFinite(val)) {
            slider.value = val;
            bg.style.opacity = (slider.value / 100).toFixed(3);
        }
    }
}

function updateBackground() {
    bg.style.opacity = (slider.value / 100).toFixed(3);
    queueTask(setCookie);
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
    queueTask(checkCookie);
    document.body.appendChild(slider);
}