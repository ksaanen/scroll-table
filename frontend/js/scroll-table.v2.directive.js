(function() {
  'use strict';

  app.directive('scrollTable', directive);

  directive.$inject = ['$window', '$timeout'];
  function directive($window, $timeout) {

    function link($scope, $element, $attrs) {

      let $table = $element.find("table");
      let $thead = $table.find("thead");
      let $tbody = $table.find("tbody");
      let $tfoot = $table.find("tfoot");

      let $thead_cells = $thead.find("tr").children();
      let $tbody_cells = $tbody.children().eq(0).children();
      let $tfoot_cells = $tfoot.find("tr").children();

      let $fixHeader = $attrs.hasOwnProperty('fixedHeader');
      let $fixFooter = $attrs.hasOwnProperty('fixedFooter');

      function styles() {
        $table.addClass('table table-sm');
        $thead.addClass('thead-dark');
        $tfoot.addClass('thead-light');
      }
      styles();

      function apply() {
        for (let i = 0; i < $tbody_cells.length; i++) {
          let $max_value = Math.max($thead_cells.eq(i).prop('offsetWidth'), $tbody_cells.eq(i).prop('offsetWidth'), $tfoot_cells.eq(i).prop('offsetWidth'));
         
          if ($fixHeader) {
            $thead_cells.eq(i).css('width', $max_value + 'px');
            $thead_cells.eq(i).css('min-width', $max_value + 'px');
          }
          if ($fixFooter) {
            $tfoot_cells.eq(i).css('width', $max_value + 'px');
            $tfoot_cells.eq(i).css('min-width', $max_value + 'px');
          }
          $tbody_cells.eq(i).css('width', $max_value + 'px');
          $tbody_cells.eq(i).css('min-width', $max_value + 'px');
        }
      }
      
      function position() {
        if ($fixHeader && $thead) {
          $element.css('padding-top', $thead.prop('offsetHeight') + 'px');
          $thead.css('top', $element.prop('scrollTop') + 'px');
        }
        if ($fixFooter && $tfoot) {
          $element.css('padding-bottom', $tfoot.prop('offsetHeight') + 'px');
          $tfoot.css('top', ($element.prop('scrollTop') + ($element.prop('clientHeight') - $tfoot.prop('offsetHeight'))) + 'px');
        }
      }

      function reset() {
        for (let i = 0; i < $tbody_cells.length; i++) {
          if ($fixHeader) {
            $thead_cells.eq(i).css('width', null);
            $thead_cells.eq(i).css('min-width', null);
          }
          if ($fixFooter) {
            $tfoot_cells.eq(i).css('width', null);
            $tfoot_cells.eq(i).css('min-width', null);
          }
          $tbody_cells.eq(i).css('width', null);
          $tbody_cells.eq(i).css('min-width', null);
        }
      }
      
      function init() {
        apply();
        position();
      }

      $element.bind('scroll', function(e) {
        position();
      });

      let resizeTimer; // debounced timer
      angular.element($window).bind('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          reset();
          init();
        }, 250);
      });

      init();

    }
    return {
      link: link,
      scope: {}
    }
  }
})();