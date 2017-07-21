var reload = function (event) {
  console.log("hi");
  $("#blog-entries").empty();
  entryCount = 0;
  load(); // @see: scroll-blog.js
};

$(document).ready(function () {
  console.log("bonesaw ready");
  $('#programming').click(reload);
  $('#baking').click(reload);
  $('#misc').click(reload);
});
