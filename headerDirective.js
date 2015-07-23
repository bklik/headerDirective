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
            var oldScroll = 0;

            var scrollHander = function(event) {
                if(document.body.scrollTop <= 104) {
                    $element.removeClass('animate');
                    $element.attr('style', 'top: -'+document.body.scrollTop+'px;');
                } else if(document.body.scrollTop < oldScroll) {
                    $element.attr('style', 'top: -56px;');
                } else {
                    $element.attr('style', 'top: -104px;');

                    // Timeout corrects animation glitch
                    $timeout(function() {
                        $element.addClass('animate');
                    }, 0);
                }

                oldScroll = document.body.scrollTop;
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
            };
            $timeout(init, 0);
        }
    }
}]);