(function (window, $) {
    'use strict';

    var page = {
            init: init
        },
        dom = {};


    function init() {
        cacheDom();
        attachHandlers();
        handleScroll();
    }

    function attachHandlers() {
        dom.window.on('scroll', handleScroll);
        dom.window.on('resize', handleScroll);
    }

    function cacheDom() {
        dom.window = $(window);
        dom.header = $('header');
        dom.phone = $('.phone');
        dom.bringToLife = $('.bring-to-life');
        dom.subHead = dom.bringToLife.find('h2');
        dom.whatIsAgile = $('.what-is-agile');
        dom.whatIsAgileHeader = dom.whatIsAgile.find('h3');
        dom.whatIsAgileCopy = dom.whatIsAgile.find('p');
    }

    function handleScroll(eventObject) {
        collapseOrExpandHeaderMenu();
        parallaxPhone();
        fadeSubHead();
        fadeWhatIsAgile();
    }

    function fadeWhatIsAgile() {
        var scrollTop = dom.window.scrollTop(),
            whatIsAgileHeaderOffset = dom.whatIsAgileHeader.offset().top,
            windowHeight = dom.window.height(),
            midway = whatIsAgileHeaderOffset - (windowHeight / 2),
            opacity;

        if (scrollTop >= midway) {
            dom.whatIsAgileHeader.css('opacity', '1');
            dom.whatIsAgileCopy.css('opacity', '1');
        } else {
            opacity = (midway - scrollTop);

            if (opacity > 300) {
                opacity = 0;
            } else {
                opacity = 300 - opacity;
                opacity = opacity / 300;
            }

            dom.whatIsAgileHeader.css('opacity', opacity);
            dom.whatIsAgileCopy.css('opacity', opacity);
        }
    }

    function fadeSubHead() {
        var scrollTop = dom.window.scrollTop(),
            subHeadOffset = dom.subHead.offset().top,
            windowHeight = dom.window.height(),
            midway = subHeadOffset - (windowHeight / 2),
            opacity;

        if (scrollTop >= midway) {
            dom.subHead.css('opacity', '1');
        } else {
            opacity = scrollTop / midway;

            if (opacity < 0.2) {
                opacity = 0.2;
            }
            dom.subHead.css('opacity', opacity);
        }
    }

    function collapseOrExpandHeaderMenu() {
        if (dom.window.scrollTop() > 0) {
            dom.header.removeClass('collapsed');
            dom.phone.removeClass('shaded');
        } else {
            dom.header.addClass('collapsed');
            dom.phone.addClass('shaded');
        }
    }

    function parallaxPhone() {
        var scrollTop = dom.window.scrollTop();

        if (scrollTop > 0) {
            dom.phone.css('top', '-' + (scrollTop/3) + 'px');
        } else {
            dom.phone.css('top', '0');
        }
    }

    window.page = page;

    page.init();
})(window, jQuery);