var programming = true;
var baking = true;
var misc = true;

var reload = function (event) {
  $("#blog-entries").empty();
  entryCount = 0;
  load(); // @see: scroll-blog.js
};

$(document).ready(function () {

  $('#programming').click(function () {
    programming = !programming;

    if (!programming) {
      $('#programming').removeClass('btn-success');
      $('#programming').addClass('btn-default');
    } else {
      $('#programming').addClass('btn-success');
      $('#programming').removeClass('btn-default');
    }

    reload();
  });

  $('#baking').click(function () {
    baking = !baking;

    if (!baking) {
      $('#baking').removeClass('btn-success');
      $('#baking').addClass('btn-default');
    } else {
      $('#baking').addClass('btn-success');
      $('#baking').removeClass('btn-default');
    }

    reload();
  });
  $('#misc').click(function () {
    misc = !misc;

    if (!misc) {
      $('#misc').removeClass('btn-success');
      $('#misc').addClass('btn-default');
    } else {
      $('#misc').addClass('btn-success');
      $('#misc').removeClass('btn-default');
    }

    reload();
  });
});
