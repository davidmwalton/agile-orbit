(function (window, $) {
    'use strict';

    var page = {
            init: init
        },
        dom = {};

    function detectMobileBrowser() {
        // modified from: http://detectmobilebrowsers.com/
        var userAgent = navigator.userAgent||navigator.vendor||window.opera;

        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0,4)));
    }

    function init() {
        if (detectMobileBrowser()) {
            cacheMobileDom();
            attachMobileHandlers();
            setMobileMinimumHeights();
            return;
        }

        cacheDom();
        addAtoms();
        attachHandlers();
        onResize();
    }

    function cacheMobileDom() {
        dom.window = $(window);
        dom.htmlBody = $('html,body');
        dom.header = $('header');
        dom.navElements = dom.header.find('nav a');
        dom.h1 = dom.header.find('h1');
        dom.h1Anchor = dom.h1.find('a');
        dom.phone = $('.phone');
        dom.bringToLife = $('.bring-to-life');
        dom.footer = $('footer');
    }

    function attachMobileHandlers() {
        dom.window.on('scroll', onMobileScroll);
        $.each(dom.navElements, function (index, item) {
            $(item).on('click', onMobileNavElementClicked);
        });
        dom.h1Anchor.on('click', onH1AnchorClicked);
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

    function onMobileNavElementClicked() {
        var $this = $(this),
            href = $this.attr('href'),
            $destination = $(href);

        dom.htmlBody.animate({
            scrollTop: $destination.offset().top - 100
        }, 400);

        return false;
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
        if (dom.window.scrollTop() > 0) {
            dom.htmlBody.animate({
                scrollTop: 0
            }, 400);
        } else {
            dom.htmlBody.animate({
                scrollTop: 50
            }, 400);
        }

        return false;
    }

    function onResize() {
        setMinimumHeights();
        positionWhatDoesAgileMean();
        onScroll();
    }

    function onMobileScroll(eventObject) {
        collapseOrExpandHeaderMenu();
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

        if (windowWidth < 915) {
            dom.whatIsAgileCopy.css('width', 'auto');
            dom.whatIsAgileHeader.css('width', 'auto');
            dom.whatIsAgileHeader.css('margin', marginTop + 'px auto 0');
            return;
        }

        dom.whatIsAgileCopy.css('width', width + 'px');
        dom.whatIsAgileHeader.css('width', width + 'px');
        dom.whatIsAgileHeader.css('margin', marginTop + 'px auto 0');
    }

    function setMobileMinimumHeights() {
        var minHeight = dom.window.height();

        dom.phone.css('min-height', minHeight + 'px');

        dom.bringToLife.css('margin', minHeight + 'px 0 0');

        // the footer has a 1px top-padding in order to force the h3 margin to apply *within* the containing
        // div so we take that px off the min-height
        dom.footer.css('min-height', (minHeight - 1) + 'px');
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
            fadeItem(scrollTop, windowHeight, item, 0);
            parallaxItemAndStaggerChildren(scrollTop, windowHeight, item);
        });
    }

    function parallaxAndFadeAboutUs() {
        var scrollTop = dom.window.scrollTop(),
            windowHeight = dom.window.height();

        $.each(dom.aboutUsProfiles, function (index, item) {
            fadeItem(scrollTop, windowHeight, item, 0);
            parallaxItem(scrollTop, windowHeight, item);
        });
    }

    function fadeTechnology() {
        var scrollTop = dom.window.scrollTop(),
            windowHeight = dom.window.height();

        $.each(dom.technologyCopy, function (index, item) {
            fadeItem(scrollTop, windowHeight, item, 150);
        });

        fadeItem(scrollTop, windowHeight, dom.technologyHeader, 150);
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

    function fadeItem(scrollTop, windowHeight, item, pixelDelay) {
        var $item = $(item),
            offset = $item.offset().top,
            //halfHeight = windowHeight / 3,
            halfWindowHeight = windowHeight / 2,
            midway = offset - halfWindowHeight,
            opacity;

        if (scrollTop >= midway) {
            $item.css('opacity', '1');
        } else {
            opacity = (halfWindowHeight - ((midway - scrollTop) + pixelDelay)) / halfWindowHeight;

            if (opacity < 0) {
                opacity = 0;
            }

            $item.css('opacity', opacity);
        }
    }

    function fadeWhatIsAgile() {
        var scrollTop = dom.window.scrollTop(),
            whatIsAgileHeaderOffset = dom.whatIsAgileHeader.offset().top,
            windowHeight = dom.window.height(),
            halfWindowHeight = windowHeight / 2,
            midway = whatIsAgileHeaderOffset - halfWindowHeight,
            opacity;

        fadeItem(scrollTop, windowHeight, dom.whatIsAgileHeader, 150);
        fadeItem(scrollTop, windowHeight, dom.whatIsAgileCopy, 150);

        return;

        if (scrollTop >= midway) {
            dom.whatIsAgileHeader.css('opacity', '1');
            dom.whatIsAgileCopy.css('opacity', '1');
        } else {
            opacity = (halfWindowHeight - ((midway - scrollTop) + 150)) / halfWindowHeight;

            if (opacity < 0) {
                opacity = 0;
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

        fadeItem(scrollTop, windowHeight, dom.subHead, 150);

        return;

        if (scrollTop >= midway) {
            dom.subHead.css('opacity', '1');
        } else {
            opacity = ((scrollTop + windowHeight) - (subHeadOffset + 150)) / midway;

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