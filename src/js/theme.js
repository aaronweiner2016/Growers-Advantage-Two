/*

Theme: Square - Premium Bootstrap Theme
Product Page: https://themes.getbootstrap.com/product/square
Author: Webinning
Author URI: https://webinning.co.uk

---

Copyright 2020 Webinning

*/

'use strict';


// Preloader
var Preloader = new Promise(function(resolve) {
    // Variables
    var preloader = document.querySelector('.preloader');

    // Methods
    function init() {
        setTimeout(function(){
            preloader.classList.add('fadeOut');
            setTimeout(function(){
                preloader.style.display = 'none';
            }, 500);
            
            resolve();
        }, 1500); // minimum loading time in second
    }

    // Events
    if (isExist(preloader)) {
        document.onreadystatechange = function () {
            if (document.readyState === 'complete') {
                init();
            }
        }
    }
});


// Navbar dropdown on hover
var NavbarHover = (function() {
    // Variables
    var navbar = document.querySelectorAll('.navbar-nav .dropdown');

    // Methods
    function init() {
        [].forEach.call(navbar, function(el, i){
            addListenerMulti(el, 'mouseenter mouseleave click', function(e){
                if(window.innerWidth > 991.98) {
                    var dropdown = el.querySelector('[data-toggle="dropdown"]'),
                        instance = new bootstrap.Dropdown(dropdown);

                    e.type === 'mouseenter' ? (instance.show(), dropdown.setAttribute('aria-expanded', true)) : (instance.hide(), dropdown.blur(), dropdown.setAttribute('aria-expanded', false));
                }
            });
        });
    }

    // Events
    if (navbar.length > 0) {
        init();
    }
}());


// Navbar Toggler
var NavbarToggler = (function() {
    // Variables
    var navbarToggler = document.querySelector('.navbar-toggler');

    // Methods
    function init() {
        navbarState();
        
        navbarToggler.addEventListener('click', function() {
            setTimeout(function(){
                navbarState();
            })
        }, false);
    }

    function navbarState(){
        // Inner variables
        var expanded = navbarToggler.getAttribute('aria-expanded');
        
        if(expanded == 'true') {
            document.documentElement.style.overflow = "hidden";
            document.body.style.paddingRight = getScrollbarWidth() + "px";
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.paddingRight = "";
        }
    }

    // Events
    if (isExist(navbarToggler)) {
        init();
    }
}());


// Cookie Consent
var CC = (function() {
    // Variables
    var cookie = document.getElementById('cookie-consent');
    var template = document.getElementById('cookie-template');

    
    // Methods
    function init() {
        detatch(template);

        window.cookieconsent.initialise({
            container: cookie,
            overrideHTML: template.innerHTML
        });
    }


    // Events
    if(isExist(cookie)) {
        fetchInject([
            '../assets/vendor/cookieconsent/build/cookieconsent.min.js',
            '../assets/vendor/cookieconsent/build/cookieconsent.min.css'
        ]).then(() => {
            init();
        });
    }
}());


// Swiper
var SwiperSlider = (function() {
    // Variables
    var swiper = document.querySelectorAll('.swiper');

    
    // Methods
    function init(elem, index) {
        // Inner variables
        var parents = closest(elem, 'section'),
            prevEl = parents.querySelectorAll('.swiper-btn-prev'),
            nextEl = parents.querySelectorAll('.swiper-btn-next'),
            paginationEl = parents.querySelectorAll('.swiper-pagination'),
            dataOptions = JSON.parse(elem.querySelector('.swiper-container:not(.swiper-thumbs)').getAttribute('data-options')),
            hasThumb = Boolean(elem.querySelector('.swiper-thumbs')),
            swiperThumbs;

        if (hasThumb) {
            var dataOptionsThumbs = JSON.parse(elem.querySelector('.swiper-thumbs').getAttribute('data-options'));

            // Swiper default options for thumbnails
            var options = {
                slidesPerView: 4,
                spaceBetween: 10,
                watchSlidesVisibility: true,
                watchSlidesProgress: true
            };
            var mergedOptions = mergeObjects(options, dataOptionsThumbs);
            var swiperThumbs = new Swiper(elem.querySelector('.swiper-thumbs'), mergedOptions);
        }

        // Swiper default options
        var options = {
            navigation: {
                prevEl: prevEl,
                nextEl: nextEl
            },
            pagination: {
                el: paginationEl,
                clickable: true
            },
            keyboard: {
                enabled: true,
            },
            spaceBetween: 32,
            speed: 750,
            watchOverflow: true,
        };
        if (hasThumb) {
            options.thumbs = {
                swiper: swiperThumbs
            }
        }
        var mergedOptions = mergeObjects(options, dataOptions);
        var swiper = new Swiper(elem.querySelector('.swiper-container:not(.swiper-thumbs)'), mergedOptions);
    }


    // Events
    if(swiper.length > 0) {
        fetchInject([
            '../assets/vendor/swiper/css/swiper.min.css',
            '../assets/vendor/swiper/js/swiper.min.js'
        ]).then(() => {
            [].forEach.call(swiper, function(el, i){
                init(el, i);
            });
        });
    }
}());


// TypedJS
var TypedJS = (function() {
    // Variables
    var typed = document.querySelectorAll('[data-typed]'),
        preloader = document.querySelector('.preloader');

    
    // Methods
    function init(elem) {
        // Inner variables
        var dataOptions = JSON.parse(elem.getAttribute('data-options')),
            options = {
                startDelay: 1000,
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 1000,
                loop: true
            },
            mergedOptions = mergeObjects(options, dataOptions);

        if(isExist(preloader)) {
            Preloader.then(function() {
                var typed = new Typed(elem, mergedOptions);
            }, function(error) {
                // error goes here
            });
        } else {
            var typed = new Typed(elem, mergedOptions);
        }
    }


    // Events
    if(typed.length > 0) {
        fetchInject([
            '../assets/vendor/typed.js/lib/typed.min.js'
        ]).then(() => {
            [].forEach.call(typed, function(el, i){
                init(el);
            });
        });
    }
}());


// Photoswipe
var Photoswipe = (function() {
    // Variables
    var gallery = document.querySelectorAll('.gallery');
    var photoswipe = document.querySelectorAll('.gallery figure');
    var ssRunning = false, 
        ssOnce = false,
        ssDelay = 3000 /*ms*/,
        ssButtonClass = document.querySelector('.pswp__button--playpause');

    var dataOptions = {
        bgOpacity: 0.97
    };
    
    // Methods
    function init() {
        var galleryElements = gallery;
        var dataOptions = {};
        
        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    }

    var parseThumbnailElements = function(elem) {
        var all = photoswipe;
        var items = [];
        var figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < all.length; i++) {
            figureEl = all[i];
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0];

            if (linkEl.getAttribute('data-type') == 'video') {
                item = {
                    html: linkEl.getAttribute('data-video')
                };
            } else {
                size = linkEl.getAttribute('data-size').split('x');

                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    minZoom: 3
                };
            }
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if(linkEl.children.length > 0) {
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl;
            items.push(item);
        }
        return items;
    };

    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, 'figure');
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = photoswipe,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);

        function setSlideshowState(el, running) {
            if (running) {
                setTimeout(gotoNextSlide, ssDelay / 2.0 /* first time wait less */);
            }
            var title = running ? "Pause Slideshow" : "Play Slideshow";
            el.classList.remove(running ? "play" : "pause"); // change icons defined in css
            el.classList.add(running ? "pause" : "play");
            el.title =  title;
            ssRunning = running;
        }
        
        function gotoNextSlide() {
            if (ssRunning && !!gallery) {
                ssOnce = true;
                gallery.next();
            }
        }

        var dataOptions = JSON.parse(galleryElement.parentNode.getAttribute('data-options')) || JSON.parse(galleryElement.getAttribute('data-options'));

        var options = {
            maxSpreadZoom: 5,
            minZoom: 3,
            closeOnScroll: false,
            preload: [1,3],
            galleryUID: galleryElement.parentNode.getAttribute('data-pswp-uid') || galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0] || items[index].el.getElementsByTagName('svg')[0],
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }
        };

        var mergedOptions = mergeObjects(options, dataOptions);

        if(fromURL) {
            if(mergedOptions.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid === index) {
                        mergedOptions.index = j;
                        break;
                    }
                }
            } else {
                mergedOptions.index = parseInt(index, 10) - 1;
            }
        } else {
            mergedOptions.index = parseInt(index, 10);
        }
        if(isNaN(mergedOptions.index)) {
            return;
        }
        if(disableAnimation) {
            mergedOptions.showAnimationDuration = 0;
        }

        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, mergedOptions);

        setSlideshowState(ssButtonClass, false /* not running from the start */);

        gallery.listen('beforeChange', function() {
            var videos = document.querySelectorAll('.pswp__video');
            var currItem = gallery.currItem.container;
            
            if (currItem.getAttribute('data-type') == 'video') {
                for (var i = 0; i < videos.length; ++i) {
                    videos[i].classList.remove('active')
                }
                currItem.querySelectorAll('.pswp__video')[0].classList.add('active');
                [].forEach.call(videos, function(el, i){
                    if (!el.classList.contains('active')) {
                        el.setAttribute('src', el.getAttribute('src'));
                    }
                });
            }
        });

        gallery.listen('close', function() {
            var currItem = gallery.currItem.container;

            if (currItem.getAttribute('data-type') == 'video') {
                [].forEach.call(videos, function(el, i){
                    el.setAttribute('src', el.getAttribute('src'));
                });
            }
        });

        gallery.listen('afterChange', function() { 
            if(gallery.options.getNumItemsFn() > 1) {
                if (ssRunning && ssOnce) {
                    ssOnce = false;
                    setTimeout(gotoNextSlide, ssDelay);
                }

                ssButtonClass.addEventListener('click', function (event) {
                    setSlideshowState(this, !ssRunning);
                }, false);
            } else {
                ssButtonClass.style.display = 'none';
            }
        });

        gallery.listen('destroy', function() {
            gallery = null;
        });

        return gallery.init();
    };


    // Events
    if(photoswipe.length > 0) {
        fetchInject([
            '../assets/vendor/photoswipe/dist/photoswipe.min.js',
            '../assets/vendor/photoswipe/dist/photoswipe-ui-default.min.js',
        ]).then(() => {
            init();
        });
    }
}());


// AOS
var AOSAnimation = (function() {
    // Variables
    var aos = document.querySelectorAll('[data-aos]'),
        preloader = document.querySelector('.preloader');
    

    // Methods
    function init() {
        // Inner variables

        var options = {
            once: true,
            duration: 750
        };

        if(isExist(preloader)) {
            Preloader.then(function() {
                setTimeout(function(){
                    AOS.init(options);
                }, 200);
            }, function(error) {
                // error goes here
            });
        } else {
            AOS.init(options);
        }
    }


    // Events
    if(aos.length > 0) {
        init();
    }
}());


// Smooth scroll
var Scroll = (function() {
    // Variables
    var smoothScroll = document.querySelector('[data-scroll]');

    
    // Methods
    function init() {
        var scroll = new SmoothScroll('[data-scroll]', {
            updateURL: false,
            durationMin: 1000,
            header: '.navbar.fixed-top'
        });
    }


    // Events
    if(isExist(smoothScroll)) {
        fetchInject([
            '../assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js'
        ]).then(() => {
            init();
        });
    }
}());


// Countdown
var Countdown = (function() {
    // Variables
    var counter = document.querySelectorAll('[data-countdown]'),
        days, hours, minutes, seconds;

    
    // Methods
    function init(elem) {
        // Inner variables
        var endDate = new Date(elem.getAttribute('data-end-date')),
            endMessage = elem.getAttribute('data-end-message') || "Let's Begin!",
            now = new Date().getTime();

        if(endDate.getTime() - now < 0) {
            elem.innerHTML = endMessage;
        } else {
            updateCounter(elem, endDate, endMessage);
        }
    }

    function updateCounter(elem, endDate, endMessage) {
        // Inner variables
        var daysElem = elem.querySelector('.days'),
            hoursElem = elem.querySelector('.hours'),
            minutesElem = elem.querySelector('.minutes'),
            secondsElem = elem.querySelector('.seconds');

        var x = setInterval(function() {
            var startDate = new Date().getTime(),
                timeRemaining = parseInt((endDate - startDate) / 1000);

            if (timeRemaining >= 0) {
                days = parseInt(timeRemaining / 86400);
                timeRemaining = (timeRemaining % 86400);
                hours = parseInt(timeRemaining / 3600);
                timeRemaining = (timeRemaining % 3600);
                minutes = parseInt(timeRemaining / 60);
                timeRemaining = (timeRemaining % 60);
                seconds = parseInt(timeRemaining);

                daysElem.innerHTML = days;
                hoursElem.innerHTML = hours > 0 && hours < 10 ? "0" + hours : hours;
                minutesElem.innerHTML = minutes > 0 && minutes < 10 ? "0" + minutes : minutes;
                secondsElem.innerHTML = seconds < 10 ? "0" + seconds : seconds;
            } else {
                clearInterval(x);
                elem.innerHTML = endMessage;
            }
        }, 1000);
    }


    // Events
    if(counter.length > 0) {
        [].forEach.call(counter, function(el, i){
            init(el);
        });
    }
}());


// Sticky
var StickyElement = (function() {
    // Variables
    var stickyItem = document.querySelector('[data-sticky]');

    
    // Methods
    function init() {
        var sticky = new Sticky('[data-sticky]');
    }


    // Events
    if(isExist(stickyItem)) {
        fetchInject([
            '../assets/vendor/sticky-js/dist/sticky.min.js'
        ]).then(() => {
            init();
        });
    }
}());


// CountUp
var CounterUp = (function() {
    // Variables
    var countup = document.querySelectorAll('[data-countup]'),
        preloader = document.querySelector('.preloader');

    
    // Methods
    function init(elem) {
        // Inner variables
        var from = elem.getAttribute('data-from') || 0,
            to = elem.getAttribute('data-to'),
            decimals = elem.getAttribute('data-decimals') || 0,
            duration = elem.getAttribute('data-duration') || 2,
            options = JSON.parse(elem.getAttribute('data-options'));
            
        var counter = new CountUp(elem, from, to, decimals, duration, options);

        if (!counter.error) {
            addListenerMulti(window, 'load scroll', function(e){
                if(isExist(preloader)) {
                    Preloader.then(function() {
                        if(isInViewport(elem)) {
                            counter.start();
                        }
                    }, function(error) {
                        // error goes here
                    });
                } else {
                    if(isInViewport(elem)) {
                        counter.start();
                    }
                }
            });
        }
    }


    // Events
    if(countup.length > 0) {
        fetchInject([
            '../assets/vendor/countup.js/dist/countUp.min.js'
        ]).then(() => {
            [].forEach.call(countup, function(el, i){
                init(el);
            });
        });
    }
}());


// Jarallax
var Jarallax = (function() {
    // Variables
    var jarallax = document.querySelector('[data-jarallax]'),
        jarallaxVideo = document.querySelector('[data-jarallax-video]');


    // Events
    if(isExist(jarallax)) {
        fetchInject([
            '../assets/vendor/jarallax/dist/jarallax.min.js',
            '../assets/vendor/jarallax/dist/jarallax.css'
        ]);
    }
    if(isExist(jarallaxVideo)) {
        fetchInject([
            '../assets/vendor/jarallax/dist/jarallax-video.min.js'
        ]);
    }
}());


// Floating objects
var FloatingObjects = (function() {
    // Variables
    var container = document.querySelector('.floating-objects');
    var objects = document.querySelectorAll(".floating-objects span");
    var transitionDurations = ["transitionDuration", "msTransitionDuration", "webkitTransitionDuration", "mozTransitionDuration", "oTransitionDuration"];
    var transitionDurationProperty = getSupportedPropertyName(transitionDurations);
    var transforms = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
    var transformProperty = getSupportedPropertyName(transforms);
    
    // Methods
    function init() {
        setInitialProperties();
    }

    function setInitialProperties() {
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            var circleSize = Math.round(250 + Math.random() * 100);
            
            object.style.width = circleSize + "px";
            object.style.height = circleSize + "px";
            object.style.opacity = .005 + Math.random() * .06;
    
            setTranslate3DTransform(object);	
        }
        setTimeout(addTransition, 100);

        window.addEventListener('resize', addTransition);
    }

    function addTransition() {
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            
            object.addEventListener("transitionend", updatePosition, false);
            object.addEventListener("webkitTransitionEnd", updatePosition, false);
            object.addEventListener("mozTransitionEnd", updatePosition, false);
            object.addEventListener("msTransitionEnd", updatePosition, false);
            object.addEventListener("oTransitionEnd", updatePosition, false);
            
            setTranslate3DTransform(object);
            setTransitionDuration(object);
        }
    }
    
    function updatePosition(e) {
        var object = e.currentTarget;
        
        if (e.propertyName.indexOf("transform") != -1) {
            setTranslate3DTransform(object);
            setTransitionDuration(object);
        }
    }

    function getContainerWidth(){
        return container.offsetWidth;
    }

    function getContainerHeight(){
        return container.offsetHeight;
    }
    
    function getRandomXPosition() {
        return Math.round(-250 + Math.random() * getContainerWidth() + 250);
    }
    
    function getRandomYPosition() {
        return Math.round(-100 + Math.random() * getContainerHeight() + 100);
    }
    
    function getRandomDuration() {
        return (25 + Math.random() * 50) + "s";
    }
    
    function getRandomSize() {
        return (0.1 + Math.random() * .7);
    }
    
    function getSupportedPropertyName(properties) {
        for (var i = 0; i < properties.length; i++) {
            if (typeof document.body.style[properties[i]] != "undefined") {
                return properties[i];
            }
        }
        return null;
    }
    
    function setTranslate3DTransform(element) {
        element.style[transformProperty] = "translate3d(" + getRandomXPosition() + "px" + ", " + getRandomYPosition() + "px" + ", 0) scale(" + getRandomSize() + ")";
    }
    
    function setTransitionDuration(element) {
        if (transitionDurationProperty) {
            element.style[transitionDurationProperty] = getRandomDuration();
        }
    }


    // Events
    if(isExist(objects)) {
        init();
    }
}());


// Alert
var Alert = (function() {
    // Variables
    var alert = document.querySelectorAll('.alert'),
        navbarCollapse = document.querySelector('.navbar-collapse');


    // Methods
    function init(elem) {
        // Inner variables
        var elemId = elem.getAttribute('id');

        if(!isExist(getCookie(elemId))) {
            manageAlert(elem);
        }
    }

    function manageAlert(elem){
        // Inner variables
        var elemId = elem.getAttribute('id'),
            alertClose = elem.querySelector('[data-dismiss="alert"]');

        if(elem.style.display == 'none') {
            elem.style.display = '';
        }

        if(isExist(alertClose)) {
            alertClose.addEventListener('click', function() {
                setCookie(elemId, 'dismissed', 30);

                // Alert Ad specific
                if(elem.classList.contains('alert-ad')) {
                    document.body.style.transition = 'padding-top .4s linear';
                    document.body.style.paddingTop = '';
                    if(isExist(navbarCollapse)) {
                        navbarCollapse.style.top = '';
                        navbarCollapse.style.maxHeight = '';
                    }
                    
                }
            }, false);
        }


        // Alert Ad specific
        if(elem.classList.contains('alert-ad')) {
            manageAnimations(elem);

            window.addEventListener('resize', function(){
                manageAnimations(elem);
            });
        }
    }

    function manageAnimations(elem){
        setTimeout(function(){
            var alertHeight = elem.offsetHeight;

            document.body.style.transition = 'padding-top .4s linear';
            document.body.style.paddingTop = alertHeight + 'px';
            elem.style.transition = 'margin-top .3s linear';
            elem.style.marginTop = 0;
            if(isExist(navbarCollapse)) {
                navbarCollapse.style.top = 'calc(5.5rem + ' + alertHeight + 'px)';
                navbarCollapse.style.maxHeight = 'calc(100% - 6.25rem - ' + alertHeight + 'px)';
            }
        }, 250);
    }


    // Events
    if(alert.length > 0) {
        [].forEach.call(alert, function(el, i){
            init(el);
        });
    }
}());


// Isotope
var Isotope = (function() {
    // Variables
    var grid = document.querySelector('[data-isotope]'),
        filter = document.querySelectorAll('[data-filter]');

    
    // Methods
    function init() {
        var iso = new Isotope(grid);

        imagesLoaded(grid).on('progress', function() {
            iso.layout();
        });

        [].forEach.call(filter, function(el, i){
            el.addEventListener('click', function() {
                iso.arrange({
                    filter: el.getAttribute('data-filter')
                })
            }, false);
        });
    }
    

    // Events
    if(isExist(grid)) {
        fetchInject([
            '../assets/vendor/imagesloaded/imagesloaded.pkgd.min.js',
            '../assets/vendor/isotope-layout/dist/isotope.pkgd.min.js'
        ]).then(() => {
            init();
        });
    }
}());


// Mapbox
var Mapbox = (function() {
    // Variables
    var mapbox = document.querySelectorAll('[data-toggle="map"]');

    
    // Methods
    function init(elem) {
        // Inner variables
        var dataOptions = JSON.parse(elem.getAttribute('data-options')),
            options = {
                container: elem,
                style: 'mapbox://styles/mapbox/light-v8',
                zoom: 13,
                scrollZoom: false,
                interactive: false
            },
            mergedOptions = mergeObjects(options, dataOptions);
            
        mapboxgl.accessToken = 'pk.eyJ1IjoibGV2aXBhZHJlIiwiYSI6ImNrZGtmN3JmdjBueGsyeXF4d3BvM3F2MWsifQ.gImQw8-AIIZJxr0LzFo1sw'; // Create a new access token on https://account.mapbox.com/access-tokens/

        var map = new mapboxgl.Map(mergedOptions);

        if(isExist(elem.getAttribute('data-marker'))) {
            var marker = new mapboxgl.Marker({
                color: getCssVariable('--map-marker-color')
            })
            .setLngLat(mergedOptions.center)
            .addTo(map);
        }
        if(isExist(elem.getAttribute('data-controls'))){
            map.addControl(new mapboxgl.NavigationControl());
        }
    }


    // Events
    if(mapbox.length > 0) {
        fetchInject([
            'https://api.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.js',
            'https://api.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.css'
        ]).then(() => {
            [].forEach.call(mapbox, function(el, i){
                init(el);
            });
        });
    }
}());


// Price toggle
var Prices = (function() {
    // Variables
    var priceSwitcher = document.querySelectorAll('[data-toggle="price"]');


    // Methods
    function init(elem) {
        // Inner variables
        var targetElem = elem.getAttribute('data-target'),
            target = document.querySelectorAll(targetElem);

        elem.addEventListener('click', function() {
            // Inner variables
            var switchedValues = elem.getAttribute('data-switcher');

            [].forEach.call(target, function(t, i){
                var from = 0,
                    to = t.getAttribute('data-' + switchedValues);
                
                var counter = new CountUp(t, from, to);
    
                if (!counter.error) {
                    counter.start();
                }
            });
        }, false);
    }


    // Events
    if(priceSwitcher.length > 0) {
        fetchInject([
            '../assets/vendor/countup.js/dist/countUp.min.js'
        ]).then(() => {
            [].forEach.call(priceSwitcher, function(el, i){
                init(el);
            });
        });
    }
}());


// Link group
var LinkGroup = (function() {
    // Variables
    var linkGroup = document.querySelectorAll('[data-link-group]');


    // Methods
    function init(elem) {
        elem.addEventListener('click', function(e) {
            // Inner variables
            var linkGroupName = elem.getAttribute('data-link-group'),
                linkGroups = document.querySelectorAll('[data-link-group="' + linkGroupName + '"]');

            [].forEach.call(linkGroups, function(el, i){
                el.classList.remove('active');
            });
            elem.classList.add('active');

            if (elem.getAttribute("href") && elem.getAttribute("href").slice(0,1) == "#") {
                e.preventDefault();
            }
        }, false);
    }


    // Events
    if(linkGroup.length > 0) {
        [].forEach.call(linkGroup, function(el, i){
            init(el);
        });
    }
}());


// Navbar togglable
var NavbarTogglable = (function() {
    // Variables
    var navbarTogglable = document.querySelector('.navbar-togglable');


    // Methods
    function init() {
        // Inner variables
        var logo = document.querySelector('.logo'),
            navbarColorOrig = 'navbar-light',
            isNavbarColorDark = false,
            logoColorOrig1 = logo.querySelectorAll('path')[0].getAttribute('fill'),
            logoColorOrig2 = logo.querySelectorAll('path')[1].getAttribute('stroke');

        if(navbarTogglable.classList.contains('navbar-dark')) {
            navbarColorOrig = 'navbar-dark';
            isNavbarColorDark = true;
        }

        window.addEventListener('scroll', function(e) {
            // Inner variables
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;

            if(pageYScroll > 10) {
                navbarTogglable.classList.add('bg-white');

                if(isNavbarColorDark) {
                    navbarTogglable.classList.remove('navbar-dark');
                    navbarTogglable.classList.add('navbar-light');
                }

                logo.querySelectorAll('path')[0].style.fill = getCssVariable('--primary');
                logo.querySelectorAll('path')[1].style.stroke = getCssVariable('--primary');
            } else {
                navbarTogglable.classList.remove('bg-white');

                if(isNavbarColorDark) {
                    navbarTogglable.classList.remove('navbar-light');
                    navbarTogglable.classList.add('navbar-dark');
                }

                logo.querySelectorAll('path')[0].style.fill = logoColorOrig1;
                logo.querySelectorAll('path')[1].style.stroke = logoColorOrig2;
            }
        }, false);
    }


    // Events
    if(isExist(navbarTogglable)) {
        init();
    }
}());


// Rotating cube
var Cube = (function() {
    // Variables
    var cube = document.querySelector('.cube');
    const defaultPerspective = '-170px',
          speed = 0.05;
    var mouseX = 0,
        mouseY = 0,
        clientX = 0,
        clientY = 0,
        lastXDeg = 180,
        lastYDeg = 180;


    // Methods
    function init() {
        setInterval(rotateCube, 66);
        document.addEventListener('mousemove', updateMousePosition, false);
        cube.addEventListener('touchstart', touchPositionStart, false);
        cube.addEventListener('touchend', touchPositionEnd, false)
    }

    function updateMousePosition(e) {
        mouseX = e.pageX / (getWidth() / 4);
        mouseY = e.pageY / (getHeight() / 4);
    }

    function touchPositionStart(e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    function touchPositionEnd(e) {
        var deltaX, deltaY;
        
        deltaX = e.changedTouches[0].clientX - clientX;
        deltaY = e.changedTouches[0].clientY - clientY;
    }

    function rotateCube() {
        lastXDeg = lastXDeg + (getAngle(mouseX) - lastXDeg) * speed;
        lastYDeg = lastYDeg + (getAngle(mouseY) - lastYDeg) * speed;
        var newStyle = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
        document.querySelector('.cube').style.transform = newStyle;
    }
    
    function getAngle(x) {
        return 45 - 90 * x; // 180 - 360 * x
    }
    
    function getWidth() {
        return closest(cube, 'section').offsetWidth;
    }
    
    function getHeight() {
        return closest(cube, 'section').offsetHeight;
    }


    // Events
    if(isExist(cube)) {
        init();
    }
}());


// Helper functions
function isExist(el) {
    if(typeof(el) != 'undefined' && el != null) {
        return true;
    } else {
        return false;
    }
}

function addListenerMulti(el, s, fn) {
    s.split(' ').forEach(function (e) {
        return el.addEventListener(e, fn, false);
    });
}

function mergeObjects(){
    var res = {};
    for(var i = 0; i < arguments.length; i++){
        for(var x in arguments[i]){
            res[x] = arguments[i][x];
        };
    };
    return res;
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function detatch(el) {
    return el.parentElement.removeChild(el);
}

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        } else {
            el = el.parentElement;
        }
    }
    return null;
}

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

function getCssVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function isInViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}