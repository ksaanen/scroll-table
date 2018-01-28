(function() {
  'use strict';

  app.directive('scrollTable', directive);

  directive.$inject = ['$window'];
  function directive($window) {

    return {
      transclude: true,
      restrict: 'E',
      scope: {
        rows: '=watch',
        sortFn: '='
      },
      template: '<div class="scrollableContainer">' +
                  '<div class="headerSpacer"></div>' +
                  '<div class="scrollArea" ng-transclude></div>' +
                '</div>',
      controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

    let $table = angular.element(element)[0];
    let $thead = $table.querySelector('thead');
    let $tbody = $table.querySelector('tbody');
    let $tfoot = $table.querySelector('tfoot');

    let $thead_cells = $thead.rows[0].children;
    let $tbody_cells = $tbody.rows[0].children;
    let $tfoot_cells = $tfoot.rows[0].children;

    let $fixHeader = attrs.hasOwnProperty('fixedHeader');
    let $fixFooter = attrs.hasOwnProperty('fixedFooter');

    function apply() {
      for (let i = 0; i < $tbody_cells.length; i++) {
        let $max_value = Math.max($thead_cells[i].clientWidth, $tbody_cells[i].clientWidth, $tfoot_cells[i].clientWidth);
        if ($fixHeader) {
          angular.element($thead_cells[i]).css('width', $max_value+'px');
          angular.element($thead_cells[i]).css('min-width', $max_value+'px');
        }
        if ($fixFooter) {
          angular.element($tfoot_cells[i]).css('width', $max_value+'px');
          angular.element($tfoot_cells[i]).css('min-width', $max_value+'px');
        }
        angular.element($tbody_cells[i]).css('width', $max_value+'px');
        angular.element($tbody_cells[i]).css('min-width', $max_value+'px');
      }
    }
    
    function position() {
      if ($fixHeader && $thead) {
        element.css('padding-top', $thead.offsetHeight+'px');
        angular.element($thead).css('top', $table.scrollTop+'px');
      }
      if ($fixFooter && $tfoot) {
        element.css('padding-bottom', $tfoot.offsetHeight+'px');
        angular.element($tfoot).css('top', ($table.scrollTop + ($table.clientHeight - $tfoot.offsetHeight))+'px');
      }
    }

    function reset() {
      for (let i = 0; i < $tbody_cells.length; i++) {
        if ($fixHeader) {
          angular.element($thead_cells[i]).css('width',null);
          angular.element($thead_cells[i]).css('min-width',null);
        }
        if ($fixFooter) {
          angular.element($tfoot_cells[i]).css('width',null);
          angular.element($tfoot_cells[i]).css('min-width',null);
        }
        angular.element($tbody_cells[i]).css('width',null);
        angular.element($tbody_cells[i]).css('min-width',null);
      }
    }
    
    function init() {
      apply();
      position();
    }

    $table.addEventListener('scroll', function() {
      position();
    });

    $window.addEventListener('resize', function(){
      reset();
      init();
    });

    init();

    scope.$on('$destroy', function () {
      $window.removeEventListener('resize');
      element.remove();
    });
  }]

  
}     
    

  }
})();