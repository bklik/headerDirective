/***********************************************************************
 * Header Directive
 * Author: Brenton Klik
 * 
 * Prerequisites:
 *  - AngularJS
 *  - styleSheetFactory (https://github.com/bklik/styleSheetFactory)
 * 
 * Description:
 * Creates a header control with responsive sub navigation.
/**********************************************************************/
angular.module('headerDirective', ['styleSheetFactory'])

.directive('header', ['$timeout', 'styleSheetFactory', function($timeout, styleSheetFactory) {
    return {
        scope: {
            api: '=',
        },
        restrict: 'E',
        link: function($scope, $element, $attrs) {
            // The document's stylesheet.
            var styleSheet = styleSheetFactory.getStyleSheet();

            // The prefix used by the browser for non-standard properties.
            var prefix = styleSheetFactory.getPrefix();

            // Add this directive's styles to the document's stylesheet.
            styleSheetFactory.addCSSRule(styleSheet, 'header',
                'background-color: black;' +
                'color: white;' +
                'display: block;' +
                'overflow: hidden;' +
                'position: fixed;' +
                'top: 0;' +
                'right: 0;' +
                'left: 0;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header.animate',
                'box-shadow: 0 2px 8px rgba(0, 0, 0, .25);' +
                'transition: top ease 250ms;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header nav',
                'background-color: grey;' +
                'color: white;' +
                'display: block;' +
                'height: 48px;' +
                'overflow: hidden;' +
                'position: relative;' +
                '-'+prefix+'-transition: all ease 250ms;' +
                'transition: all ease 250ms;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header nav:after',
                'content: \'\\25be\';' +
                'display: none;' +
                'line-height: 48px;' +
                'text-align: center;' +
                '-'+prefix+'-transition: all ease 250ms;' +
                'transition: all ease 250ms;' +
                'position: absolute;' +
                'top: 0;' +
                'right: 0;' +
                'height: 48px;' +
                'width: 48px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header nav.show:after',
                '-'+prefix+'-transform: rotate(180deg);' +
                'transform: rotate(180deg);'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header nav button',
                'border-bottom: 0px solid white;' +
                'cursor: pointer;' +
                'display: block;' +
                'float: left;' +
                'height: 48px;' +
                'overflow: hidden;' +
                'padding: 0 16px;' +
                'text-overflow: ellipsis;' +
                '-'+prefix+'-transition: border-bottom-width ease 250ms;' +
                'transition: border-bottom-width ease 250ms;' +
                'white-space: nowrap;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header nav button.selected',
                'border-bottom-width: 4px;' +
                'max-height: 48px !important;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header nav.show button',
                'max-height: 48px !important;'
            ,1);

            /***********************************************************************
             * Function: scrollHander
             * 
             * Description:
             * If the user is scrolling up, allow the header to animate.
             *
             * If the distance from the top if <= to the height of the main header
             * stop animating the header.
             * 
             * If the user is scrolling up, faster than the tolerance, show the
             * sub navigation.
             *
             * If the user is scrolling down, faster than the tolerance, hide
             * the header.
            /**********************************************************************/
            var headerHeight = null;
            var navHeight = null;
            var oldScroll = 0;
            var scrolltolerance = 7;
            var scrollUp = false;

            var scrollHander = function(event) {
                var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                var height = document.body.scrollHeight;

                scrollUp = (top < oldScroll) ? true : false;

                if(!scrollUp) {
                    $element.addClass('animate');
                }

                if(!nav.hasClass('show')) {
                    if(top <= 56) {
                        $element.removeClass('animate');
                        $element.attr('style', 'top: -'+top+'px;');
                    } else if(top <= 200 || oldScroll - top > scrolltolerance) {
                        $element.attr('style', 'top: -'+(headerHeight - navHeight)+'px;');
                    } else if(!scrollUp && top - oldScroll > scrolltolerance) {
                        $element.attr('style', 'top: -'+headerHeight+'px;');
                    }
                }

                oldScroll = top;
            };

            /***********************************************************************
             * Function: tabHandler
             * 
             * Description:
             * When a button is clicked in the sub navigation, remove all selected
             * styles from the buttons.
             *
             * Crawl up the DOM from the target, until you reach the button (incase
             * there are other elements in the button).
             *
             * If the sub navigation meets the responsive criteria, show the all the
             * sub navigation buttons. Otherwise, cause a selection, and hide the
             * sub navigation (if applicable).
            /**********************************************************************/
            var nav = null;
            var responsiveMQ = null;

            var tabHandler = function(event) {
                $element.find('button').removeClass('selected');

                var parent = event.target;
                while(parent.nodeName != 'BUTTON' || typeof parent.nodeName == 'undefined') {
                    parent = parent.parentNode;
                }

                if(responsiveMQ.matches && !nav.hasClass('show')) {
                    nav.addClass('show');

                    // Delay the window click event to prevent imemdiate closure 
                    $timeout(function() {
                        window.addEventListener('click', closeSelect, false);
                    },100);
                } else {
                    window.scrollTo(0, 0);
                }

                parent.classList.add('selected');
            };

            // Allows the responsive nav to be dismissed
            var closeSelect = function() {
                if(nav.hasClass('show')) {
                    nav.removeClass('show');
                }
                window.removeEventListener('click', closeSelect, false);
            }

            var resizeHandler = function(event) {
                nav.removeClass('show');
                window.removeEventListener('click', closeSelect, false);
            }

            /***********************************************************************
             * Function: configureResponsiveNav
             * 
             * Description:
             * Detect the width of all the buttons in sub navigation.
             * 
             * Add a rule for a responsive sub navigation menu.
             * 
             * Add a Javascript media query of the same responsive rule.
            /**********************************************************************/
            var configureResponsiveNav = function() {
                var scrollbarOffset = 17;
                var navWidth = 0;
                var buttons = $element.find('button');

                for(var i=0; i<buttons.length; i++) {
                    navWidth += buttons[i].clientWidth;
                }
                
                styleSheetFactory.addCSSRule(styleSheet, '@media screen and (max-width: '+(navWidth + scrollbarOffset)+'px)',
                    'header nav:after {' +
                        'display: block !important;' +
                    '}' +
                    'header nav button {' +
                        'border-bottom-width: 0 !important;' +
                        'float: auto;' +
                        'max-height: 0;' +
                        'text-align: left;' +
                        'width: 100%;' +
                    '}' +
                    'header nav button.selected {' +
                        'background-color: rgba(0,0,0,.1);' +
                    '}'
                ,1);

                styleSheetFactory.addCSSRule(styleSheet, 'header nav.show',
                    'height: '+(48 * buttons.length)+'px;'
                ,1);

                responsiveMQ = window.matchMedia('(max-width: '+(navWidth + scrollbarOffset)+'px)');
            };

            /***********************************************************************
             * Function: init
             * 
             * Description:
             * Initialize the component with it has been fully drawn to the DOM.
            /**********************************************************************/
            var init = function() {
                // Configure responsive nav classes
                nav = $element.find('nav');
                configureResponsiveNav();

                // Calculate heights
                headerHeight = $element[0].clientHeight;
                navHeight = nav[0].clientHeight;

                // Add events
                $element.find('button').bind('click', tabHandler);
                window.addEventListener('scroll', scrollHander, true);
                window.addEventListener('resize', resizeHandler, true);
                scrollHander(null);
            };
            $timeout(init, 0);
        }
    }
}]);
