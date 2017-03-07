(function() {
  'use strict';

  app.directive('scrollTable', directive);

  directive.$inject = ['$window'];
  function directive($window) {

    var directive = {
      bindToController: true,
      controller: controller,
      controllerAs: '$ctrl',
      link: link,
      restrict: 'A',
      scope: {}
    };
    return directive;

    function link(scope, element, attrs) {

      element.addClass('scroll');

      var updateLayout = debounce(function(e) {
        var theadCols = element.find("thead").find("tr").children();
        var tbodyCols = element.find("tbody").find("tr").children();
        var tfootCols = element.find("tfoot").find("tr").children();

        for (var i = 0; i < theadCols.length; i++) {
          if (theadCols) {
            theadCols[i].width = elementWidth(tbodyCols[i])
          }
          if (tfootCols) {
            tfootCols[i].width = elementWidth(tbodyCols[i])
          }
        }
        scope.$digest();
      }, 150);

      updateLayout();

      angular.element($window).bind('resize', updateLayout);
    }

    function elementWidth(el) {
      var compStyle = $window.getComputedStyle(el);
      var calcPadding = parseFloat(compStyle.paddingLeft) + parseFloat(compStyle.paddingRight);
      return el.clientWidth - calcPadding;
    }

    //
    // Debounce function from underscore.js
    // http://underscorejs.org/
    //
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

  }

  function controller () {

  }
})();