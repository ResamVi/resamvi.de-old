$(document).ready(function () {
  $("#searchBox").on("change keyup paste", function () {
    $("#blog-entries").empty();
    entryCount = 0;
    load(); // @see: scroll-blog.js
  });
});
