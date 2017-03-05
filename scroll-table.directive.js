(function() {
    'use strict';

    angular
        .module('Module')
        .directive('scrollTable', directive);

    function directive(dependency1) {

        var directive = {
            bindToController: true,
            controller: controller,
            controllerAs: '$ctrl',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }

    function controller () {
        
    }
})();