(function(){

  // ScrollTable Layout

  let table = document.querySelector('[scroll-table]');
  let thead = table.querySelector('thead');
  let tbody = table.querySelector('tbody');
  let tfoot = table.querySelector('tfoot');

  let thead_cells = thead.rows[0].children;
  let tbody_cells = tbody.rows[0].children;
  let tfoot_cells = tfoot.rows[0].children;

  let fixHeader = table.hasAttribute('fixed-header');
  let fixFooter = table.hasAttribute('fixed-footer');

  function apply() {
    for (let i = 0; i < tbody_cells.length; i++) {
      let max_value = Math.max(thead_cells[i].offsetWidth, tbody_cells[i].offsetWidth, tfoot_cells[i].offsetWidth);
      if (thead) {
        thead_cells[i].style.width = max_value + 'px';
        thead_cells[i].style.minWidth = max_value + 'px';
      }
      if (tfoot) {
        tfoot_cells[i].style.width = max_value + 'px';
        tfoot_cells[i].style.minWidth = max_value + 'px';
      }
      tbody_cells[i].style.width = max_value + 'px';
      tbody_cells[i].style.minWidth = max_value + 'px';
    }
  }

  function position() {
    if (fixHeader && thead) {
      table.style.paddingTop = thead.offsetHeight;
      thead.style.top = table.scrollTop;
    }
    if (fixFooter && tfoot) {
      table.style.paddingBottom = tfoot.offsetHeight;
      tfoot.style.top = table.scrollTop + (table.clientHeight - tfoot.offsetHeight);
    }
  }

  function reset() {
    for (let i = 0; i < tbody_cells.length; i++) {
      if (fixHeader) {
        thead_cells[i].style.width = null;
        thead_cells[i].style.minWidth = null;
      }
      if (fixFooter) {
        tfoot_cells[i].style.width = null;
        tfoot_cells[i].style.minWidth = null;
      }
      tbody_cells[i].style.width = null;
      tbody_cells[i].style.minWidth = null;
    }
  }

  table.addEventListener('scroll', function(e) {
    position();
  });

  window.addEventListener('resize', function(e) {
    reset();
    apply();
  });

  apply();
  position();

})();