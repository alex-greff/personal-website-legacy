$( document ).ready(function() {
    Barba.Pjax.start();
});

// Detect mobile device
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // TOOD: do some code...
    window.location.replace("http://stackoverflow.com");
}

const PAGE_BACKGROUND = "page-background";



var home_page = null;
var project_pages = [];
var about_page = null;

const NUM_PROJECTS = 3;

instantiate_pages();

function instantiate_pages() {
    // Initialize the projects' Page objects
    for (var i = 0; i < NUM_PROJECTS; i++) {
        project_pages.push(new Page("#project-" + (i+1), "./projects", null, null) ); // nextPage and prevPage get set later
    }

    // Populate the next and previous page references post-object initialization
    for (var i = 0; i < NUM_PROJECTS; i++) {
        var curr_project = project_pages[i];

        var prev_idx = (i-1) % NUM_PROJECTS;
        if (prev_idx == -1) {
            prev_idx = NUM_PROJECTS - 1;
        }
        var next_idx = (i+1) % NUM_PROJECTS;

        curr_project.nextPage = project_pages[next_idx];
        curr_project.prevPage = project_pages[prev_idx];

        // curr_project.infoPage = new Page("#project-"+(i+1)+"__info", curr_project.nextPage, curr_project.prevPage);
    }

    home_page = new Page("#front-page__container", ".", project_pages[0], null);

    about_page = new Page("#about-page__container", "./about", null, null);
}


setup_pages();

function setup_pages() {
    setup_home_page.call(home_page);

    setup_project_page.call(project_pages[0], "#9292EA", "#D27ECC");
    setup_project_page.call(project_pages[1], "#7CFFBF", "#5AE8A3");
    setup_project_page.call(project_pages[2], "#F56F77", "#DF575F");

    // setup_project_1_page.call(project_pages[0]);
    // setup_project_2_page.call(project_pages[1]);
    // setup_project_3_page.call(project_pages[2]);
    // setup_project_4_page.call(project_pages[3]);
    // setup_project_5_page.call(project_pages[4]);

    // setup_about_page.call(about_page);
}


init_pages_state();

function init_pages_state() {
    home_page.close("no-anim"); // Direction doesnt matter here

    for (var i = 0; i < NUM_PROJECTS; i++) {
        var curr_project = project_pages[i];
        curr_project.close("no-anim"); // Direction doesnt matter here
    }

    // about_page.close("no-anim"); // Direction doesnt matter here
}


var htmlPageToPageObjectMap = {

};

// get_current_page();

// function get_current_page() {
//     console.log(location.href.split("/"));
// }



// window.onload = function() {
//     console.log(location.href + " loaded");
// }

var current_page = home_page; // TODO: get the actual page that it was loaded on
// var current_page = project_pages[0];


// Loading effect
var loading_page = $(".loading-page");
var loading_page_bar = $(".loading-page__bar");
var page_background = $(".page-background");

var stage_interval = 0.5;

TweenMax.set(page_background, {backgroundColor: current_page.page_background_color_1});
TweenMax.set(loading_page_bar, {width: "0%", backgroundColor: current_page.page_background_color_1 });

var tl = new TimelineMax({ onComplete: () => { current_page.open("anim"); } });
tl.to(loading_page_bar, stage_interval, {width: "20%" });
tl.to(loading_page_bar, stage_interval, {width: "30%" });
tl.to(loading_page_bar, stage_interval, {width: "50%" });
tl.to(loading_page_bar, stage_interval, {width: "100%" });
tl.to(loading_page_bar, stage_interval, {height: "100%"});
tl.to(loading_page, stage_interval, {opacity: 0});



















// class Page {
//     // String, ScrollableElement[], Page, Page, function(int, String), function(bool, String, function()), function(bool, String, function())
//     constructor (element_identifier, scrollable_elements, nextPage, prevPage) {
//         this.element_identifier = element_identifier;
//         this.scrollable_elements = scrollable_elements;
//         this.nextPage = nextPage;
//         this.prevPage = prevPage;

//         this.element_ref = $(element_identifier); 

//         // Default on delta change function
//         // [int, int], bool
//         this.onDeltaYChange = function (total_deltaY, animate) {
//             if (animate) {
//                 TweenMax.to(this.element_ref, 0.2, { y: total_deltaY, ease: Power2.easeOut });
//             }
//             else {
//                 TweenMax.set(this.element_ref, { y: total_deltaY});
//             }
//         }

//         this.onDeltaYReset = function(deltaY, animate) {
//             var element = $(element_identifier);
//             if (animate) {
//                 TweenMax.to(this.element_ref, 0.5, { y: total_deltaY, ease: Elastic.easeOut.config(1.2, 0.4) });
//             }
//             else {
//                 TweenMax.set(this.element_ref, { y: total_deltaY});
//             }
//         }

//         // Default open function (type = ["nextPage", "prevPage", "none", default="regular"] )
//         this.open = function (type, onComplete_fcn) {
//             if (type == "none") {
//                 TweenMax.set(this.element_ref, { y: 0, onComplete: onComplete_fcn });
//             }
//             else if (type == "nextPage") {
//                 // From bottom of page
//                 TweenMax.fromTo(this.element_ref, 1,
//                     { y: "100vh" }, 
//                     { y: 0, onComplete: onComplete_fcn }
//                 );
//             }
//             else if (type == "prevPage") {
//                 // From top of page
//                 TweenMax.fromTo(this.element_ref, 1,
//                     { y: "-100vh" }, 
//                     { y: 0, onComplete: onComplete_fcn  }
//                 );
//             } else {
//                 // TODO: some cool fade animation
//             }
//         }

//         // Default close function
//         this.close = function (type, onComplete_fcn) {
//             if (type == "none") {
//                 TweenMax.set(this.element_ref, { y: "-100vh", onComplete: onComplete_fcn });
//             }
//             else if (type == "nextPage") {
//                 // To top of page
//                 TweenMax.to(this.element_ref, 1, 
//                     { y: "-100vh", onComplete: onComplete_fcn }
//                 );
//             }
//             else if (type == "prevPage") {
//                 // To bottom of page
//                 TweenMax.to(this.element_ref, 1, 
//                     { y: "100vh", onComplete: onComplete_fcn }
//                 );
//             } else {
//                 // TODO: some cool fade animation
//             }
//         }
//     }

//     hasNext() {
//         return this.nextPage != null;
//     }

//     hasPrev() {
//         return this.prevPage != null;
//     }
// }

// class ScrollableElement {
//     // String, int
//     constructor (element_identifier, deltaY_change_multiplier) {
//         this.element_identifier = element_identifier;
//         this.deltaY_change_multiplier = deltaY_change_multiplier;

//         this.element_ref = $(element_identifier);
//     }
// }



