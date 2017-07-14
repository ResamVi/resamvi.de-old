$(document).ready( function(){
    
    var visible = false;
    
    $(".sandwich").click(function(){
        visible = !visible;
        if(visible) {
            $(".search").css("visibility", "visible");
            $(".search").addClass("animated fadeIn");
        }else{
            $(".search").css("visibility", "hidden");
            $(".search").removeClass("animated fadeIn");
        }
    });
    
});