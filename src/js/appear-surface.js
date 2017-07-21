$(document).ready(function () {

  var isHidden = true;

  $("#trophy").click(function () {

    if (isHidden) {

      // Make it visible (only needed once)
      $("#smallarrow").css("visibility", "visible");

      // Remove previous animation head
      $("#smallarrow").removeClass("animated fadeOut");
      deleteTags();

      // Animate
      $("#smallarrow").addClass("animated fadeInDown");

      for (var i = 1; i <= 4; i++) {
        setTimeout(function (id) {
          fadeInId(id);
        }, i * 150, i);
      }

      isHidden = false;
    } else {

      // Remove previous animation head
      $("#smallarrow").removeClass("animated fadeInDown");
      deleteTags();

      // Animate
      $("#smallarrow").addClass("animated fadeOut");
      fadeOutEach();

      // When animation ends set to invisible
      setTimeout(function () {
        setInvisible();
      }, 700);

      isHidden = true;
    }

  });

  function fadeInId(id) {
    $("#icon" + id).css("visibility", "visible");
    $("#icon" + id).addClass("animated fadeInUp");

  }

  function fadeOutEach() {
    for (var i = 1; i <= 4; i++)
      $("#icon" + i).addClass("animated fadeOut");

  }

  function setInvisible() {
    for (var i = 1; i <= 4; i++)
      $("#icon" + i).css("visibility", "hidden");
  }

  function deleteTags() {
    for (var i = 1; i <= 4; i++) {
      $("#icon" + i).removeClass("animated fadeOut");
      $("#icon" + i).removeClass("animated fadeInUp");
    }
  }

});
