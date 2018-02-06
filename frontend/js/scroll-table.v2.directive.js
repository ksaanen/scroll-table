(function() {
  'use strict';

  app.directive('scrollTable', directive);

  directive.$inject = ['$window', '$timeout'];
  function directive($window, $timeout) {

    function link($scope, $element, $attrs) {

      let delay = 100;

      let $table = $element.find("table");
      let $thead = $table.find("thead");
      let $tbody = $table.find("tbody");
      let $colgroup = $table.find("colgroup");
      let $tfoot = $table.find("tfoot");

      let $thead_cells = $thead.children().eq(0).children();
      let $tbody_cells = $tbody.children().eq(0).children();
      let $colgroup_cols = $colgroup.children();
      let $tfoot_cells = $tfoot.children().eq(0).children();

      let $fixHeader = $attrs.hasOwnProperty('fixedHeader');
      let $fixFooter = $attrs.hasOwnProperty('fixedFooter');

      function styles() {
        $table.addClass('table table-condensed table-striped');
        $thead.addClass('thead-inverse');
        $tfoot.addClass('tfoot-inverse');
      }
      styles();

      function hasEnoughData() {
        return $tbody.children().length > 1;
      }

      function relink() {
        $thead_cells = $thead.children().eq(0).children();
        $tbody_cells = $tbody.children().eq(0).children();
        $tfoot_cells = $tfoot.children().eq(0).children();
        $colgroup_cols = $colgroup.children();
      }

      function apply() {
        for (let i = 0; i < $tbody_cells.length; i++) {
          let $max_value = Math.max($thead_cells.eq(i).prop('offsetWidth') || 0, $tbody_cells.eq(i).prop('offsetWidth') || 0, $tfoot_cells.eq(i).prop('offsetWidth') || 0, $colgroup_cols.eq(i).prop('offsetWidth') || 0);

          if ($fixHeader && $thead && hasEnoughData()) {
            $thead.css('position', 'absolute');
          }
          if ($fixFooter && $tfoot && hasEnoughData()) {
            $tfoot.css('position', 'absolute');
          }
          if ($thead_cells && hasEnoughData()) {
            $thead_cells.eq(i).css('width', $max_value + 'px');
            $thead_cells.eq(i).css('min-width', $max_value + 'px');
          }
          if ($tfoot_cells && hasEnoughData()) {
            $tfoot_cells.eq(i).css('width', $max_value + 'px');
            $tfoot_cells.eq(i).css('min-width', $max_value + 'px');
          }
          if ($tbody_cells && hasEnoughData()) {
            $tbody_cells.eq(i).css('width', $max_value + 'px');
            $tbody_cells.eq(i).css('min-width', $max_value + 'px');
          }
          if ($colgroup_cols && hasEnoughData()) {
            $colgroup_cols.eq(i).css('width', $max_value + 'px');
            $colgroup_cols.eq(i).css('min-width', $max_value + 'px');
          }
        }
      }
      
      function position() {
        if ($fixHeader && $thead_cells && hasEnoughData()) {
          $element.css('padding-top', $thead.prop('offsetHeight') + 'px');
          $thead.css('top', $element.prop('scrollTop') + 'px');
        }
        if ($fixFooter && $tfoot_cells && hasEnoughData()) {
          $element.css('padding-bottom', $tfoot.prop('offsetHeight') + 'px');
          $tfoot.css('top', ($element.prop('scrollTop') + ($element.prop('clientHeight') - $tfoot.prop('offsetHeight'))) + 'px');
        }
      }

      function reset() {
        if ($fixHeader && $thead) {
          $thead.css('position', '');
        }
        if ($fixFooter && $tfoot) {
          $tfoot.css('position', '');
        }
        for (let i = 0; i < $tbody_cells.length; i++) {
          if ($fixHeader && $thead_cells) {
            $thead_cells.eq(i).css('width', '');
            $thead_cells.eq(i).css('min-width', '');
          }
          if ($fixFooter && $tfoot_cells) {
            $tfoot_cells.eq(i).css('width', '');
            $tfoot_cells.eq(i).css('min-width', '');
          }
          if ($tbody_cells) {
            $tbody_cells.eq(i).css('width', '');  
            $tbody_cells.eq(i).css('min-width', '');
          }
          if ($colgroup_cols) {
            $colgroup_cols.eq(i).css('width', '');  
            $colgroup_cols.eq(i).css('min-width', '');
          }
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
      angular.element($window).bind('resize', function(){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          reset();
          init();
        }, delay);
      });

      init();

      $scope.$watch(
        function () {
          return $tbody.children().length
        },
        function (newValue, oldValue) {
          if (newValue !== oldValue) {
            setTimeout(function () {
              relink();
              reset();
              init();
            }, delay);
          }
        }
      );
    }
    return {
      link: link,
      scope: {}
    }
  }
})();