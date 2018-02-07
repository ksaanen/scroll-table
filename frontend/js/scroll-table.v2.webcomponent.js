'use strict';

// Webcomponents try-out as documented at:
// https://developer.mozilla.org/en-US/docs/Web/Web_Components

class scrollTable extends HTMLElement {

  constructor() {

    super();

    let $style = document.createElement('style');
    $style.textContent = `
      * {
        box-sizing: border-box;
      }
      
      scroll-table,
      [scroll-table] {
        display:block;
        position: relative;
        height: 33vh;
        overflow-x: auto;
        overflow-y: auto;
      }
      
      scroll-table table,
      [scroll-table] table {
        width: 100%;
      }
      
      .thead-inverse > tr > th,
      .thead-inverse > tr > td,
      .tfoot-inverse > tr > th,
      .tfoot-inverse > tr > td {
        color: #fff;
        background-color: black;
        padding-top:5px !important;
        padding-bottom:5px !important;
      }    
    `;
    this.insertBefore($style, this.firstChild);

    let $element = this;
    let $delay = 100;

    let $table = this.querySelector('table');
    let $thead = $table.querySelector('thead');
    let $tbody = $table.querySelector('tbody');
    let $colgroup = $table.querySelector('colgroup');
    let $tfoot = $table.querySelector('tfoot');

    let $thead_cells = $thead ? $thead.children[0].children : null;
    let $tbody_cells = $tbody ? $tbody.children[0].children : null;
    let $colgroup_cols = $colgroup ? $colgroup.children : null;
    let $tfoot_cells = $tfoot ? $tfoot.children[0].children : null;

    let $fixHeader = this.getAttribute('fixedHeader');
    let $fixFooter = this.getAttribute('fixedFooter');

    function className() {
      $table.className = 'table table-condensed table-striped';
      $thead.className = 'thead-inverse';
      $tfoot.className = 'tfoot-inverse';
    }
    className();

    function hasEnoughData() {
      return $tbody.children.length > 1;
    }

    function relink() {
      $thead_cells = $thead.children[0].children;
      $tbody_cells = $tbody.children[0].children;
      $tfoot_cells = $tfoot.children[0].children;
      $colgroup_cols = $colgroup.children;
    }

    function apply() {
      for (let i = 0; i < $tbody_cells.length; i++) {
        let $max_value = Math.max($thead_cells ? $thead_cells[0].offsetWidth : 0, $tbody_cells ? $tbody_cells[0].offsetWidth : 0, $tfoot_cells ? $tfoot_cells[0].offsetWidth : 0, $colgroup_cols ? $colgroup_cols[0].offsetWidth : 0);

        if ($fixHeader && $thead && hasEnoughData()) {
          $thead.style.position = 'absolute';
        }
        if ($fixFooter && $tfoot && hasEnoughData()) {
          $tfoot.style.position = 'absolute';
        }
        if ($thead_cells && hasEnoughData()) {
          $thead_cells[i].style.width = $max_value + 'px';
          $thead_cells[i].style.minWidth = $max_value + 'px'
        }
        if ($tfoot_cells && hasEnoughData()) {
          $tfoot_cells[i].style.width = $max_value + 'px';
          $tfoot_cells[i].style.minWidth = $max_value + 'px'
        }
        if ($tbody_cells && hasEnoughData()) {
          $tbody_cells[i].style.width = $max_value + 'px';
          $tbody_cells[i].style.minWidth = $max_value + 'px'
        }
        if ($colgroup_cols && hasEnoughData()) {
          $colgroup_cols[i].style.width = $max_value + 'px';
          $colgroup_cols[i].style.minWidth = $max_value + 'px'
        }
      }
    }
      
    function position() {
      if ($fixHeader && $thead_cells && hasEnoughData()) {
        $element.style.paddingTop = $thead.offsetHeight + 'px';
        $thead.style.top = $element.scrollTop + 'px';
      }
      if ($fixFooter && $tfoot_cells && hasEnoughData()) {
        $element.style.paddingBottom = $tfoot.offsetHeight + 'px';
        $tfoot.style.top = ($element.scrollTop + ($element.clientHeight - $tfoot.offsetHeight)) + 'px';
      }
    }

    function reset() {
      if ($fixHeader && $thead) {
        $thead.style.position = '';
      }
      if ($fixFooter && $tfoot) {
        $tfoot.style.position = '';
      }
      for (let i = 0; i < $tbody_cells.length; i++) {
        if ($fixHeader && $thead_cells) {
          $thead_cells[i].style.width = '';
          $thead_cells[i].style.minWidth = '';
        }
        if ($fixFooter && $tfoot_cells) {
          $tfoot_cells[i].style.width = '';
          $tfoot_cells[i].style.minWidth = '';
        }
        if ($tbody_cells) {
          $tbody_cells[i].style.width = '';
          $tbody_cells[i].style.minWidth = '';
        }
        if ($colgroup_cols) {
          $colgroup_cols[i].style.width = '';
          $colgroup_cols[i].style.minWidth = '';
        }
      }
    }
    
    function init() {
      apply();
      position();
    }

    $element.addEventListener('scroll', function(e) {
      position();
    });

    let resizeTimer; // debounced timer
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        reset();
        init();
      }, $delay);
    });

    init();

    // $scope.$watch(
    //   function () {
    //     return $tbody.children.length
    //   },
    //   function (newValue, oldValue) {
    //     if (newValue !== oldValue) {
    //       setTimeout(function () {
    //         relink();
    //         reset();
    //         init();
    //       }, $delay);
    //     }
    //   }
    // );

  }
}

customElements.define('scroll-table', scrollTable);