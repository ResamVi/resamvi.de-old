var entryCount = 0;
var searchTerm = "";
var ready = true;

$(document).ready(function () {
  $(document).infiniteJscroll({
    offset: 0,
    bottomOfPage: function () {
      addContent();
    }
  });
});

function addContent() {

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
    error: function () {}
  });
}
