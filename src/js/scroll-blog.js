var entryCount = 0;
var searchTerm = "";
var ready = true;

function load() {

  //console.log($(document).height() - $(window).height());
  //console.log("scrollTop(): " + $(window).scrollTop());
  //console.log("Screen size: " + $(window).height());

  // End of the document reached?
  if ($(document).height() - $(window).height() - 100 <= $(window).scrollTop() && (programming || baking || misc)) {

    if (ready) {
      ready = false;
      $.ajax({
        url: 'php/print-entry.php',
        data: {
          count: entryCount,
          search: $('#searchBox').val(),
          programming: programming, // @see filter-blog.js
          baking: baking,
          misc: misc
        },
        dataType: 'html',
        success: function (html) {
          $('#blog-entries').append(html);
          ready = true;
        },
        error: function () { }
      });
      entryCount++;
    }
  }
}

// Each time the user scrolls
$(document).ready(function () {
  $(window).scroll(load);
});

$('body').on({
  'touchmove': load
});
