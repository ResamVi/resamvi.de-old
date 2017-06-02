var entryCount = 0;

var load = function() {    

    console.log($(document).height() - $(window).height());
    console.log("scrollTop(): " + $(window).scrollTop());

    // End of the document reached?
    if ($(document).height() - $(window).height() - 20 <= $(window).scrollTop()) {

        $.ajax({
            url: 'process/get-post.php',
            data: { count: entryCount },
            dataType: 'html',
            success: function(html) {
                $('#blog-entries').append(html);
            },
            error: function() {
                // Do nothing
            }
        });
        entryCount++;
    }
}

// Each time the user scrolls
$(document).ready(function() {
    $(window).scroll(load);
});

$('body').on({
    'touchmove': load
});
