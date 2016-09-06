/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(11);
	var taskqueue_1 = __webpack_require__(1);
	var nav_1 = __webpack_require__(13);
	var home_1 = __webpack_require__(5);
	var about_1 = __webpack_require__(3);
	var contact_1 = __webpack_require__(4);
	var bg_adjust_1 = __webpack_require__(12);
	void function init() {
	    taskqueue_1.queueTask(nav_1.initNav);
	    taskqueue_1.queueTask(home_1.initHome);
	    taskqueue_1.queueTask(about_1.initAbout);
	    taskqueue_1.queueTask(contact_1.initContact);
	    taskqueue_1.queueTask(bg_adjust_1.initSlider);
	}();


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var now = window.performance && window.performance.now ?
	    window.performance.now.bind(window.performance) : Date.now;
	var tasks = [];
	var index = 0;
	var total = 0;
	var ready = true;
	var end;
	function dedupe() {
	    var i = index, task = tasks[i];
	    while (++i < total) {
	        if (tasks[i] == task)
	            tasks[i] = null;
	    }
	    task = tasks[i] = null;
	}
	function runTasks(start) {
	    do {
	        if (tasks[index] !== null) {
	            tasks[index]();
	            dedupe();
	        }
	        end = now();
	    } while ((++index < total) && end - start < 3);
	    if (index >= total) {
	        index = total = 0;
	        ready = true;
	    }
	    else {
	        requestAnimationFrame(runTasks);
	    }
	}
	function queueTask(task) {
	    tasks[total++] = task;
	    if (ready) {
	        ready = false;
	        requestAnimationFrame(runTasks);
	    }
	}
	exports.queueTask = queueTask;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	function Page() {
	    var el, wrap, contentEl;
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
	exports.__esModule = true;
	exports["default"] = Page;
	Page.prototype.show = function () {
	    this.el.setAttribute("aria-hidden", "false");
	    this.el.style.top = "0";
	};
	Page.prototype.hide = function () {
	    this.el.style.top = "-100%";
	    this.el.setAttribute("aria-hidden", "true");
	};
	Page.prototype.setContent = function (text) {
	    this.contentEl.textContent = text;
	};
	Page.prototype.setClassName = function (className) {
	    this.contentEl.classList.add(className);
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(6);
	var taskqueue_1 = __webpack_require__(1);
	var Page_1 = __webpack_require__(2);
	var aboutPage;
	function createList(title, items) {
	    var listEl, titleEl, listItems, itemGroup;
	    listEl = document.createElement("div");
	    listEl.className = "list";
	    titleEl = document.createElement("h6");
	    titleEl.className = "list-title";
	    titleEl.textContent = title;
	    listItems = document.createElement("div");
	    for (var i = 0; i < items.length; i += 4) {
	        itemGroup = document.createElement("div");
	        itemGroup.className = "list";
	        itemGroup.textContent = items.slice(i, i + 4).join("\n");
	        listItems.appendChild(itemGroup);
	    }
	    listEl.appendChild(titleEl);
	    listEl.appendChild(listItems);
	    return listEl;
	}
	function initLists() {
	    var listWrap = document.createElement("div");
	    listWrap.className = "list-wrap";
	    for (var group in config.aboutPageLists) {
	        listWrap.appendChild(createList(group, config.aboutPageLists[group]));
	    }
	    aboutPage.contentEl.appendChild(listWrap);
	}
	function initAbout() {
	    aboutPage = new Page_1["default"]();
	    aboutPage.setContent(config.bio);
	    document.body.appendChild(aboutPage.el);
	    taskqueue_1.queueTask(initLists);
	}
	exports.initAbout = initAbout;
	function showAbout() {
	    aboutPage.show();
	}
	exports.showAbout = showAbout;
	function hideAbout() {
	    aboutPage.hide();
	}
	exports.hideAbout = hideAbout;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(8);
	var Page_1 = __webpack_require__(2);
	var contactPage;
	function initContact() {
	    contactPage = new Page_1["default"]();
	    contactPage.setContent(config.email);
	    contactPage.setClassName("contact-info");
	    document.body.appendChild(contactPage.el);
	}
	exports.initContact = initContact;
	function showContact() {
	    contactPage.show();
	}
	exports.showContact = showContact;
	function hideContact() {
	    contactPage.hide();
	}
	exports.hideContact = hideContact;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(9);
	var Page_1 = __webpack_require__(2);
	var homePage;
	function initHome() {
	    homePage = new Page_1["default"]();
	    homePage.setClassName("headline");
	    homePage.setContent(config.headline);
	    document.body.appendChild(homePage.el);
	}
	exports.initHome = initHome;
	function showHome() {
	    homePage.show();
	}
	exports.showHome = showHome;
	function hideHome() {
	    homePage.hide();
	}
	exports.hideHome = hideHome;


/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */
6,
/* 8 */
6,
/* 9 */
6,
/* 10 */
6,
/* 11 */
6,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(7);
	var taskqueue_1 = __webpack_require__(1);
	var val;
	var bg;
	var slider;
	function updateBackground() {
	    bg.style.opacity = (slider.value / 100).toFixed(3);
	}
	function handleChange(event) {
	    taskqueue_1.queueTask(updateBackground);
	}
	function initSlider() {
	    bg = document.getElementById("background");
	    slider = document.createElement("input");
	    slider.type = "range";
	    slider.className = "slider";
	    slider.min = "0";
	    slider.max = "100";
	    slider.addEventListener("change", handleChange);
	    document.body.appendChild(slider);
	}
	exports.initSlider = initSlider;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(10);
	var taskqueue_1 = __webpack_require__(1);
	var home_1 = __webpack_require__(5);
	var about_1 = __webpack_require__(3);
	var contact_1 = __webpack_require__(4);
	var linkAttr = "data-link";
	var currentPage, pageNames, showActions, blurActions;
	/**
	 * @param  {string}  dest name of page
	 * @return {boolean}      true if current page will change
	 */
	function handleNavigate(dest) {
	    var i = pageNames.indexOf(dest);
	    if (~i && i !== currentPage) {
	        if (~currentPage) {
	            taskqueue_1.queueTask(blurActions[currentPage]);
	        }
	        currentPage = i;
	        taskqueue_1.queueTask(showActions[currentPage]);
	        return true;
	    }
	    return false;
	}
	/**
	 * event handlers
	 */
	function clickLink(event) {
	    if (handleNavigate(event.target.getAttribute(linkAttr))) {
	        history.pushState({ page: pageNames[currentPage] }, pageNames[currentPage], "#/" + pageNames[currentPage]);
	    }
	}
	function handlePopState(event) {
	    if (event.state && event.state.hasOwnProperty("page")) {
	        handleNavigate(event.state.page);
	    }
	}
	/**
	 * init tasks
	 */
	function checkHash() {
	    var hash = window.location.hash.match(/(home|about|contact)$/);
	    handleNavigate(hash && hash.length ? hash[0] : "home");
	    window.addEventListener("popstate", handlePopState);
	    history.replaceState({ page: pageNames[currentPage] }, pageNames[currentPage], "#/" + pageNames[currentPage]);
	}
	function initLinks() {
	    var links = config.links;
	    var linksEl = document.getElementById("links");
	    linksEl.addEventListener("click", clickLink, false);
	    for (var i = 0; i < links.length; ++i) {
	        var el = document.createElement("div");
	        el.className = "link";
	        el.textContent = links[i];
	        el.setAttribute(linkAttr, links[i]);
	        linksEl.appendChild(el);
	    }
	}
	function initNav() {
	    currentPage = -1;
	    pageNames = ["home", "about", "contact"];
	    showActions = [home_1.showHome, about_1.showAbout, contact_1.showContact];
	    blurActions = [home_1.hideHome, about_1.hideAbout, contact_1.hideContact];
	    taskqueue_1.queueTask(checkHash);
	    taskqueue_1.queueTask(initLinks);
	}
	exports.initNav = initNav;


/***/ }
/******/ ])));