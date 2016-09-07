import { queueTask } from "./taskqueue";
var now = window.performance && window.performance.now ?
    window.performance.now.bind(window.performance) : Date.now;

// root level config.js
declare var config;

const c0 = config.pageTransition[0];
const c1 = config.pageTransition[1];
const c2 = config.pageTransition[2];
const c3 = config.pageTransition[3] * -1;


function cubicBezierStr( t: number, p0: number, p1: number, p2: number, p3: number) : string {
    let u = 1 - t;
    let tt = t * t;
    let uu = u * u;

    let p = (uu * u * p0) +
            (3 * uu * t * p1) +
            (3 * u * tt * p2) +
            (tt * t * p3);

    return p + "px";
}

export default function Page() {
    let self, el, wrap, contentEl,
        p0, p1, p2, p3,
        duration, startTime,
        isMoving, isVisible;

    isVisible = false;
    duration = 300;

    el = document.createElement("div");
    el.className = "page";

    wrap = document.createElement("div");
    wrap.className = "content";

    contentEl = document.createElement("div");
    contentEl.className = "inner-block";

    wrap.appendChild(contentEl);
    el.appendChild(wrap);

    self = this;

    function finish() {
        if (isVisible) {
            el.style.top = "0px";
        } else {
            el.remove();
        }
    }

    function animate() {
        let t = (now() - startTime) / duration;
        if (t < 0.99) {
            el.style.top = cubicBezierStr(t, p0, p1, p2, p3);
            queueTask(animate);
        } else {
            queueTask(finish);
        }
    }

    this.contentEl = contentEl;

    this.show = function() {
        if (!isVisible) {
            isVisible = true;
            p0 = c3 * window.innerHeight;
            p1 = p0 * c2;
            p2 = p0 * c1;
            p3 = p0 * c0;
            el.style.top = p0 + "px";

            self.parent.appendChild(el);
            startTime = now();
            queueTask(animate);
        }
    };

    this.hide = function() {
        if (isVisible) {
            isVisible = false;
            p3 = c3 * window.innerHeight;
            p2 = p3 * c2;
            p1 = p3 * c1;
            p0 = p3 * c0;
            startTime = now();
            queueTask(animate);
        }
    };
}

Page.prototype.parent = document.body;

Page.prototype.mountTo = function(parent: HTMLElement) {
    this.parent = parent;
};

Page.prototype.setContent = function(text: string) {
    this.contentEl.textContent = text;
};

Page.prototype.setClassName = function(className: string) {
    this.contentEl.classList.add(className);
};