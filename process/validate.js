$(document).ready(function() {
    $("#form").submit(function(e) {
        if(grecaptcha.getResponse().length == 0) {
            $("#fail").css("visibility", "visible");
            e.preventDefault();
        }

    });               
});