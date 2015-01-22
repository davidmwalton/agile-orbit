(function (window, $) {
    'use strict';

    var page = {
            init: init
        },
        dom = {};


    function init() {
        cacheDom();
        addAtoms();
        attachHandlers();
        onScroll();
    }

    function attachHandlers() {
        dom.window.on('scroll', onScroll);
        dom.window.on('resize', onResize);
        $.each(dom.navElements, function (index, item) {
            $(item).on('click', onNavElementClicked);
        });
    }

    function cacheDom() {
        dom.window = $(window);
        dom.htmlBody = $('html,body');
        dom.header = $('header');
        dom.navElements = dom.header.find('nav a');
        dom.phone = $('.phone');
        dom.bringToLife = $('.bring-to-life');
        dom.subHead = dom.bringToLife.find('h2');
        dom.whatIsAgile = $('.what-is-agile');
        dom.whatIsAgileHeader = dom.whatIsAgile.find('h3');
        dom.whatIsAgileCopy = dom.whatIsAgile.find('p');
        dom.atomsContainer = $('.atoms');
    }

    function addAtoms() {
        var i, rand, div, $div, isFuzzy;

        dom.atoms = [];
        dom.fuzzyAtoms = [];

        for (i = 0; i < 10; i += 1) {
            div = document.createElement('div');
            $div = $(div);
            $div.addClass('orb');

            rand = Math.floor(Math.random() * 2);

            if (rand > 0) {
                $div.addClass('blue');
            } else {
                $div.addClass('green');
            }

            rand = Math.floor(Math.random() * 2);

            if (rand > 0) {
                $div.addClass('fuzzy');
                isFuzzy = true;
            } else {
                isFuzzy = false;
            }

            rand = Math.floor(Math.random() * 2);

            if (rand > 0) {
                $div.addClass('reversed');
            }

            rand = Math.floor(Math.random() * 115) + 35;

            $div.css({'height': rand + 'px', 'width': rand + 'px'});

            rand = Math.floor(Math.random() * dom.window.width());

            $div.css('left', rand + 'px');

            rand = Math.floor(Math.random() * 1100) + 600;

            $div.css('top', rand + 'px');
            $div.data('top', rand);

            if (isFuzzy) {
                dom.fuzzyAtoms.push($div);
            } else {
                dom.atoms.push($div);
            }

            dom.atomsContainer.append($div);
        }
    }

    function onNavElementClicked() {
        var $this = $(this),
            href = $this.attr('href'),
            $destination = $(href);

        dom.htmlBody.animate({
            scrollTop: $destination.offset().top
        }, 400);

        return false;
    }

    function onResize() {
        onScroll();
    }

    function onScroll(eventObject) {
        collapseOrExpandHeaderMenu();
        parallaxPhone();
        fadeSubHead();
        fadeWhatIsAgile();
        parallaxAtoms();
    }

    function parallaxAtoms() {
        var scrollTop = dom.window.scrollTop(),
            atomsContainerOffset = dom.atomsContainer.offset().top,
            windowHeight = dom.window.height(),
            visibilityThreshold = atomsContainerOffset - windowHeight,
            fuzzyOffset = (scrollTop - visibilityThreshold) / 4,
            offset = (scrollTop - visibilityThreshold) / 2;

        if (offset > 0) {
            $.each(dom.atoms, function (index, item) {
                item.css('top', (item.data('top') - offset) + 'px');
            });

            $.each(dom.fuzzyAtoms, function (index, item) {
                item.css('top', (item.data('top') - fuzzyOffset) + 'px');
            });

        }

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