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

.directive('headerDirective', ['$timeout', 'styleSheetFactory', function($timeout, styleSheetFactory) {
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
            styleSheetFactory.addCSSRule(styleSheet, 'header-directive',
                'display: block;' +
                'overflow: hidden;' +
                'position: fixed;' +
                'top: 0;' +
                'right: 0;' +
                'left: 0;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive.animate',
                'box-shadow: 0 2px 8px rgba(0, 0, 0, .25);' +
                'transition: top ease 250ms;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive main-header',
                'background-color: black;' +
                'color: white;' +
                'display: block;' +
                'height: 56px;' +
                'text-align: center;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive main-header header-title',
                'flex-grow: 1;' +
                'line-height: 56px;' +
                'overflow: hidden;' +
                'padding: 0 16px;' +
                'text-align: center;' +
                'text-overflow: ellipsis;' +
                'white-space: nowrap;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive main-header header-title center',
                'position: absolute;' +
                'top: 0;' +
                'right: 0;' +
                'left: 0;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive sub-navigation',
                'background-color: grey;' +
                'color: white;' +
                'display: block;' +
                'height: 48px;' +
                'overflow: hidden;' +
                '-'+prefix+'-transition: all ease 250ms;' +
                'transition: all ease 250ms;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive sub-navigation button',
                'border-bottom: 0px solid white;' +
                'cursor: pointer;' +
                'display: block;' +
                'float: left;' +
                'height: 48px;' +
                'overflow: hidden;' +
                'padding: 0 16px;' +
                'text-overflow: ellipsis;' +
                '-'+prefix+'-transition: all ease 250ms;' +
                'transition: all ease 250ms;' +
                'white-space: nowrap;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive sub-navigation button.selected',
                'border-bottom-width: 4px;' +
                'max-height: 48px !important;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive sub-navigation.show button',
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

                if(top <= 56) {
                    $element.removeClass('animate');
                    $element.attr('style', 'top: -'+top+'px;');
                } else if(top <= 200 || oldScroll - top > scrolltolerance) {
                    $element.attr('style', 'top: -56px;');
                } else if(!scrollUp && top - oldScroll > scrolltolerance) {
                    $element.attr('style', 'top: -104px;');
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
            var subNav = null;
            var subMQ = null;

            var tabHandler = function(event) {
                $element.find('button').removeClass('selected');

                var parent = event.target;
                while(parent.nodeName != 'BUTTON' || typeof parent.nodeName == 'undefined') {
                    parent = parent.parentNode;
                }

                if(subMQ.matches && !subNav.hasClass('show')) {
                    subNav.addClass('show');
                } else {
                    subNav.removeClass('show');
                    parent.classList.add('selected');
                }
            };

            /***********************************************************************
             * Function: configureResponsiveSubNavigation
             * 
             * Description:
             * Detect the width of all the buttons in sub navigation.
             * 
             * Add a rule for a responsive sub navigation menu.
             * 
             * Add a Javascript media query of the same responsive rule.
            /**********************************************************************/
            var configureResponsiveSubNavigation = function() {
                var subNavWidth = 0;
                var buttons = $element.find('button');
                for(var i=0; i<buttons.length; i++) {
                    subNavWidth += buttons[i].clientWidth;
                }
                
                styleSheetFactory.addCSSRule(styleSheet, '@media screen and (max-width: '+subNavWidth+'px)',
                    'header-directive sub-navigation button {' +
                        'border-bottom-width: 0 !important;' +
                        'float: auto;' +
                        'max-height: 0;' +
                        'text-align: left;' +
                        'width: 100%;' +
                    '}'
                ,1);

                styleSheetFactory.addCSSRule(styleSheet, 'header-directive sub-navigation.show',
                    'height: '+(48 * buttons.length)+'px;'
                ,1);

                subMQ = window.matchMedia('(max-width: '+subNavWidth+'px)');
            };

            /***********************************************************************
             * Function: init
             * 
             * Description:
             * Initialize the component with it has been fully drawn to the DOM.
            /**********************************************************************/
            var init = function() {
                subNav = $element.find('sub-navigation');
                configureResponsiveSubNavigation();
                $element.find('button').bind('click', tabHandler);
                window.addEventListener('scroll', scrollHander);
                scrollHander(null);
            };
            $timeout(init, 0);
        }
    }
}]);
