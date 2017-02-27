(function(){

  /* calculate element width without padding etc. (IE9+) */
  function elementWidth(selector) {
    var compStyle = window.getComputedStyle(selector);
    var calcPadding = parseFloat(compStyle.paddingLeft) + parseFloat(compStyle.paddingRight);
    return selector.clientWidth - calcPadding;
  }

  function scrollTables(){
    /* Get all tables in current DOM */
    var domTables = document.querySelectorAll('table.scroll');

    /* Loop through "tbody > td" nodes and set "thead > th" nodes for each table */
    for (var i = 0; i < domTables.length; i++) {
      var theadCols = domTables[i].querySelectorAll('thead th');
      var tbodyCols = domTables[i].querySelectorAll('tbody > tr:first-of-type > td');
      var tfootCols = domTables[i].querySelectorAll('tfoot td');

      for (var i = 0; i < theadCols.length; i++) {
        theadCols[i].style.width = elementWidth(tbodyCols[i]);
        tfootCols[i].style.width = elementWidth(tbodyCols[i]);
      }
    }
  }

  scrollTables();

  window.addEventListener('resize', function(e){
    scrollTables();
  });

})();