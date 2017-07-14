var reload = function() {
    $("#blog-entries").empty();
    entryCount = 0;
    load(); // @see: scroll-blog.js
}

$(document).ready(function(){
    $('#programming').click(reload); 
    $('#baking').click(reload); 
    $('#misc').click(reload);
});