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
	var taskqueue_1 = __webpack_require__(3);
	var nav_1 = __webpack_require__(12);
	var home_1 = __webpack_require__(6);
	var about_1 = __webpack_require__(4);
	var contact_1 = __webpack_require__(5);
	void function init() {
	    taskqueue_1.queueTask(nav_1.initNav);
	    taskqueue_1.queueTask(home_1.initHome);
	    taskqueue_1.queueTask(about_1.initAbout);
	    taskqueue_1.queueTask(contact_1.initContact);
	}();


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	exports.headline = "Bianca is a research-focused UX Designer in New York City.";
	exports.bio = "Bianca's from Hawaii. She does UX stuff.";
	exports.email = "biancanicolebennett@gmail.com";
	exports.aboutPageLists = {
	    "skills": [
	        "wireframing",
	        "prototyping",
	        "Design Studio",
	        "persona profiling",
	        "client interviews",
	        "heatmapping"
	    ],
	    "experience": [
	        "ya"
	    ]
	};
	exports.links = [
	    "contact",
	    "about"
	];


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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(7);
	var config_1 = __webpack_require__(1);
	var taskqueue_1 = __webpack_require__(3);
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
	    var listTitles = Object.keys(config_1.aboutPageLists);
	    listWrap.className = "list-wrap";
	    for (var i = 0, j = listTitles.length; i < j; ++i) {
	        listWrap.appendChild(createList(listTitles[i], config_1.aboutPageLists[listTitles[i]]));
	    }
	    aboutPage.contentEl.appendChild(listWrap);
	}
	function initAbout() {
	    aboutPage = new Page_1["default"]();
	    aboutPage.setContent(config_1.bio);
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(8);
	var Page_1 = __webpack_require__(2);
	var config_1 = __webpack_require__(1);
	var contactPage;
	function initContact() {
	    contactPage = new Page_1["default"]();
	    contactPage.setContent(config_1.email);
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(9);
	var config_1 = __webpack_require__(1);
	var Page_1 = __webpack_require__(2);
	var homePage;
	function initHome() {
	    homePage = new Page_1["default"]();
	    homePage.setClassName("headline");
	    homePage.setContent(config_1.headline);
	    homePage.show();
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
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
7,
/* 9 */
7,
/* 10 */
7,
/* 11 */
7,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(10);
	var config_1 = __webpack_require__(1);
	var taskqueue_1 = __webpack_require__(3);
	var home_1 = __webpack_require__(6);
	var about_1 = __webpack_require__(4);
	var contact_1 = __webpack_require__(5);
	var linkAttr = "data-link";
	var currentPage;
	var onBlur;
	function clickLink(event) {
	    var navTo = event.target.getAttribute(linkAttr);
	    if (navTo && navTo != currentPage)
	        handleNavigate(navTo);
	    history.pushState({ page: currentPage }, currentPage, "#" + currentPage);
	}
	function handleNavigate(dest) {
	    switch (dest) {
	        case "home":
	            taskqueue_1.queueTask(onBlur);
	            taskqueue_1.queueTask(home_1.showHome);
	            onBlur = home_1.hideHome;
	            break;
	        case "about":
	            taskqueue_1.queueTask(onBlur);
	            taskqueue_1.queueTask(about_1.showAbout);
	            onBlur = about_1.hideAbout;
	            break;
	        case "contact":
	            taskqueue_1.queueTask(onBlur);
	            taskqueue_1.queueTask(contact_1.showContact);
	            onBlur = contact_1.hideContact;
	            break;
	        default: return;
	    }
	    currentPage = dest;
	}
	function checkHash() {
	    var hash = window.location.hash;
	    var reg_page = /(home|about|contact)$/;
	    if (reg_page.test(hash)) {
	        handleNavigate(hash.substring(1));
	        history.replaceState({ page: currentPage }, currentPage, hash);
	    }
	}
	function initNav() {
	    currentPage = "home";
	    onBlur = home_1.hideHome;
	    taskqueue_1.queueTask(checkHash);
	    window.addEventListener("popstate", function (event) {
	        if (event.state.page)
	            handleNavigate(event.state.page);
	    });
	    var linksEl = document.getElementById("links");
	    linksEl.addEventListener("click", clickLink, false);
	    for (var i = 0; i < config_1.links.length; ++i) {
	        var el = document.createElement("div");
	        el.className = "link";
	        el.textContent = config_1.links[i];
	        el.setAttribute(linkAttr, config_1.links[i]);
	        linksEl.appendChild(el);
	    }
	}
	exports.initNav = initNav;


/***/ }
/******/ ])));