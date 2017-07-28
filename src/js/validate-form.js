/* Handle when captcha has not been clicked yet */
$(document).ready(function () {
  $("#form").submit(function (e) {
    if (grecaptcha.getResponse().length == 0) {
      $('#fail').fadeIn(1000).delay(1500).fadeOut(1000);
      e.preventDefault();
    }
  });
});
