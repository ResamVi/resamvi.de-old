var reload = function() {
    $("#blog-entries").empty();
    entryCount = 0;
    load();
}

$(document).ready(function(){
    $('#programming').click(reload); 
    $('#baking').click(reload); 
    $('#misc').click(reload);
});