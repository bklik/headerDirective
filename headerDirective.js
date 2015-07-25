/***********************************************************************
 * Header Directive
 * Author: Brenton Klik
 * 
 * Prerequisites:
 *  - AngularJS
 *  - styleSheetFactory (https://github.com/bklik/styleSheetFactory)
 * 
 * Description:
 * Creates a header control.
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
                'display: flex;' +
                'height: 56px;'
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
                'background-color: black;' +
                'color: white;' +
                'display: flex;' +
                'height: 48px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive sub-navigation navigation-tab',
                'border-bottom: 0px solid white;' +
                'cursor: pointer;' +
                'display: block;' +
                'line-height: 48px;' +
                'overflow: hidden;' +
                'padding: 0 16px;' +
                'text-align: center;' +
                'text-overflow: ellipsis;' +
                'transition: all ease 250ms;' +
                'white-space: nowrap;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'header-directive sub-navigation navigation-tab.selected',
                'border-bottom-width: 4px;'
            ,1);

            var oldScroll = 0;
            var scrollUp = false;

            var scrollHander = function(event) {
                var top = document.body.scrollTop;
                var height = document.body.scrollHeight;

                scrollUp = (top < oldScroll) ? true : false;

                if(!scrollUp) {
                    $element.addClass('animate');
                }

                if(top <= 56) {
                    $element.removeClass('animate');
                    $element.attr('style', 'top: -'+top+'px;');
                } else if(top <= 200 || oldScroll - top > 8) {
                    $element.attr('style', 'top: -56px;');
                } else if(!scrollUp) {
                    $element.attr('style', 'top: -104px;');
                }

                oldScroll = top;
            };

            var tabHandler = function(event) {
                $element.find('navigation-tab').removeClass('selected');

                var parent = event.target;
                while(parent.nodeName != 'NAVIGATION-TAB' || typeof parent.nodeName == 'undefined') {
                    parent = parent.parentNode;
                }

                parent.classList.add('selected');
            };

            var init = function() {
                $element.find('navigation-tab').bind('click', tabHandler);
                window.addEventListener('scroll', scrollHander);
                scrollHander(null);
            };
            $timeout(init, 0);
        }
    }
}]);