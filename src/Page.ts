export default function Page() {
    let el, wrap, contentEl;
    el = document.createElement("div");
    el.className = "page";
    el.style.top = "-100%"; // starts offscreen
    el.setAttribute("aria-hidden", "true");

    wrap = document.createElement("div");
    wrap.className = "content";

    contentEl = document.createElement("div");
    contentEl.className = "inner-block";

    wrap.appendChild(contentEl);
    el.appendChild(wrap);

    this.el = el;
    this.contentEl = contentEl;
}

Page.prototype.show = function() {
    this.el.setAttribute("aria-hidden", "false");
    this.el.style.top = "0";
};

Page.prototype.hide = function() {
    this.el.style.top = "-100%";
    this.el.setAttribute("aria-hidden", "true");
};

Page.prototype.setContent = function(text: string) {
    this.contentEl.textContent = text;
};

Page.prototype.setClassName = function(className: string) {
    this.contentEl.classList.add(className);
};