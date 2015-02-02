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
        onResize();
    }

    function attachHandlers() {
        dom.window.on('scroll', onScroll);
        dom.window.on('resize', onResize);
        $.each(dom.navElements, function (index, item) {
            $(item).on('click', onNavElementClicked);
        });
        dom.h1Anchor.on('click', onH1AnchorClicked);
    }

    function cacheDom() {
        dom.window = $(window);
        dom.htmlBody = $('html,body');
        dom.header = $('header');
        dom.navElements = dom.header.find('nav a');
        dom.h1 = dom.header.find('h1');
        dom.h1Anchor = dom.h1.find('a');
        dom.phone = $('.phone');
        dom.bringToLife = $('.bring-to-life');
        dom.subHead = dom.bringToLife.find('h2');
        dom.whatIsAgile = $('.what-is-agile');
        dom.whatIsAgileInner = dom.whatIsAgile.find('div');
        dom.whatIsAgileHeader = dom.whatIsAgile.find('h3');
        dom.whatIsAgileCopy = dom.whatIsAgile.find('p');
        dom.atomsContainer = $('.atoms');
        dom.technology = $('.technology');
        dom.technologyCopy = dom.technology.find('p');
        dom.technologyHeader = dom.technology.find('h3');
        dom.services = $('.web-applications');
        dom.servicesLogos = dom.services.find('ul');
        dom.aboutUs = $('.about-us');
        dom.aboutUsProfiles = dom.aboutUs.find('li');
        dom.footer = $('footer');
    }

    function addAtoms() {
        var i, rand, div, $div, isFuzzy, width, halfWidth, iIsEven, iMax, iHalf;

        iMax = 16;
        iHalf = 8;
        dom.atoms = [];
        dom.fuzzyAtoms = [];

        for (i = 0; i < iMax; i += 1) {
            div = document.createElement('div');
            $div = $(div);
            $div.addClass('orb');

            iIsEven = i % 2;
            rand = Math.floor(Math.random() * 2);

            if (rand > 0) {
                $div.addClass('blue');
            } else {
                $div.addClass('green');
            }

            //rand = Math.floor(Math.random() * 2);

            // let's make the first 10 orbs normal & the
            // second 10 fuzzy
            rand = i < iHalf ? 0 : 1;

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

            rand = Math.floor(Math.random() * 45) + 20;

            width = rand;
            halfWidth = width / 2;

            $div.css({'height': rand + 'px', 'width': rand + 'px'});

            //rand = Math.floor(Math.random() * dom.window.width());

            if (i < iHalf) {
                rand = Math.floor(Math.random() * 20);
            } else {
                rand = Math.floor(Math.random() * 50);
            }

            if (!iIsEven) {
                rand = (100 - rand);
            }

            $div.css('left', 'calc(' + rand + '% - ' + width + 'px)');

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

    function onH1AnchorClicked() {
        dom.htmlBody.animate({
            scrollTop: 0
        }, 400);

        return false;
    }

    function onResize() {
        setMinimumHeights();
        positionWhatDoesAgileMean();
        onScroll();
    }

    function onScroll(eventObject) {
        collapseOrExpandHeaderMenu();
        parallaxPhone();
        //parallaxWhatIsAgile();
        fadeSubHead();
        fadeWhatIsAgile();
        parallaxAtoms();
        fadeTechnology();
        parallaxAndFadeServiceLogos();
        parallaxAndFadeAboutUs();
    }

    function positionWhatDoesAgileMean() {
        var windowHeight = dom.whatIsAgile.height(),
            windowWidth = dom.window.width(),
            windowRatio = windowWidth / windowHeight,
            photoRatio = 2560 / 1600,
            topOfScreen = 530,
            widthOfScreen = 860,
            width, marginTop, photoHeight;

        if (windowRatio <= photoRatio) {
            // window is more "portrait-y" than photo
            // this means 100% of the photo height is shown & will be centered on-screen, clipping
            // the right & left edges

            width = (widthOfScreen / 2560) * (photoRatio * windowHeight);
            marginTop = (topOfScreen / 1600) * windowHeight;
        } else {
            // window is more "landscape-y" than photo
            // this means the photo height is greater than the height of the view, clipping the top
            // and bottom. width is 100%.

            width = (widthOfScreen / 2560) * windowWidth;
            photoHeight = windowWidth / photoRatio;
            marginTop = (topOfScreen / 1600) * (photoHeight);
            marginTop -= (photoHeight - windowHeight) / 2;
        }

        dom.whatIsAgileCopy.css('width', width + 'px');
        dom.whatIsAgileHeader.css('width', width + 'px');
        dom.whatIsAgileHeader.css('margin', marginTop + 'px auto 0');
    }

    function setMinimumHeights() {
        var minHeight = dom.window.height();

        // the phone area has a tiny bit of parallax & so we need the height to be a little larger than window
        // height to account for the movement
        dom.phone.css('min-height', (minHeight + Math.floor(minHeight * 0.1)) + 'px');

        // the bring to life margin should be a little more than window height in order to push the triangle
        // offscreen to match the collapsed state of the menu
        dom.bringToLife.css('margin', (minHeight + 21) + 'px 0 0');

        dom.whatIsAgile.css('min-height', minHeight + 'px');

        dom.whatIsAgileInner.css('min-height', minHeight + 'px');
        //dom.whatIsAgileInner.css('min-height', (minHeight + Math.floor(minHeight * 0.2)) + 'px');

        // the footer has a 1px top-padding in order to force the h3 margin to apply *within* the containing
        // div so we take that px off the min-height
        dom.footer.css('min-height', (minHeight - 1) + 'px');
    }

    function parallaxAtoms() {
        var scrollTop = dom.window.scrollTop(),
            atomsContainerOffset = dom.atomsContainer.offset().top,
            windowHeight = dom.window.height(),
            visibilityThreshold = atomsContainerOffset - windowHeight,
            fuzzyOffset = (scrollTop - visibilityThreshold) / 4,
            offset = (scrollTop - visibilityThreshold) / 1.8;

        if (offset > 0) {
            $.each(dom.atoms, function (index, item) {
                item.css('top', (item.data('top') - offset) + 'px');
            });

            $.each(dom.fuzzyAtoms, function (index, item) {
                item.css('top', (item.data('top') - fuzzyOffset) + 'px');
            });

        }

    }

    function parallaxAndFadeServiceLogos() {
        var scrollTop = dom.window.scrollTop(),
            windowHeight = dom.window.height();

        $.each(dom.servicesLogos, function (index, item) {
            fadeItem(scrollTop, windowHeight, item);
            parallaxItemAndStaggerChildren(scrollTop, windowHeight, item);
        });
    }

    function parallaxAndFadeAboutUs() {
        var scrollTop = dom.window.scrollTop(),
            windowHeight = dom.window.height();

        $.each(dom.aboutUsProfiles, function (index, item) {
            fadeItem(scrollTop, windowHeight, item);
            parallaxItem(scrollTop, windowHeight, item);
        });
    }

    function fadeTechnology() {
        var scrollTop = dom.window.scrollTop(),
            windowHeight = dom.window.height();

        $.each(dom.technologyCopy, function (index, item) {
            fadeItem(scrollTop, windowHeight, item);
        });

        fadeItem(scrollTop, windowHeight, dom.technologyHeader);
    }

    function parallaxItemAndStaggerChildren(scrollTop, windowHeight, item) {
        var $item = $(item),
            $children = $item.find('li'),
            offset = $item.offset().top,
            halfHeight = windowHeight / 3,
            midway = offset - (halfHeight * 2),
            top;

        if (scrollTop >= midway) {
            $item.css('top', '0');
            $($children[1]).css('top', '0');
            $($children[2]).css('top', '0');
        } else {
            top = (midway - scrollTop);

            if (top > halfHeight) {
                top = halfHeight;
            }

            $item.css('top', top + 'px');
            $($children[1]).css('top', (top / 2) + 'px');
            $($children[2]).css('top', top + 'px');
        }
    }


    function parallaxItem(scrollTop, windowHeight, item) {
        var $item = $(item),
            offset = $item.offset().top,
            halfHeight = windowHeight / 3,
            midway = offset - (halfHeight * 2),
            top;

        if (scrollTop >= midway) {
            $item.css('top', '0');
        } else {
            top = (midway - scrollTop);

            if (top > halfHeight) {
                top = halfHeight;
            }

            $item.css('top', top + 'px');
        }
    }

    function fadeItem(scrollTop, windowHeight, item) {
        var $item = $(item),
            offset = $item.offset().top,
            halfHeight = windowHeight / 3,
            midway = offset - (halfHeight * 2),
            opacity;

        if (scrollTop >= midway) {
            $item.css('opacity', '1');
        } else {
            opacity = (midway - scrollTop);

            if (opacity > 300) {
                opacity = 0;
            } else {
                opacity = 300 - opacity;
                opacity = opacity / 300;
            }

            $item.css('opacity', opacity);
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
            opacity = (scrollTop - 200) / midway;

            if (opacity < 0) {
                opacity = 0;
            }
            dom.subHead.css('opacity', opacity);
        }
    }

    function collapseOrExpandHeaderMenu() {
        if (dom.window.scrollTop() > 0) {
            dom.header.removeClass('collapsed');
            dom.header.removeClass('big-head');
            dom.phone.removeClass('shaded');
        } else {
            dom.header.addClass('big-head');
            dom.phone.addClass('shaded');
            dom.header.addClass('collapsed');
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

    function parallaxWhatIsAgile() {
        var scrollTop = dom.window.scrollTop(),
            whatIsAgileTop = dom.whatIsAgile.offset().top;

        // subtract the window height so that we parallax once the section is in view
        whatIsAgileTop -= dom.window.height();

        if (scrollTop > whatIsAgileTop) {
            dom.whatIsAgileInner.css('top', '-' + ((scrollTop - whatIsAgileTop) / 15) + 'px');
        } else {
            dom.whatIsAgileInner.css('top', '0');
        }
    }

    window.page = page;

    page.init();
})(window, jQuery);