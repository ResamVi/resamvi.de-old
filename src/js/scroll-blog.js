var entryCount = 0;
var searchTerm = "";

function load() {    

    //console.log($(document).height() - $(window).height());
    //console.log("scrollTop(): " + $(window).scrollTop());
    //console.log("Screen size: " + $(window).height());
    
    // End of the document reached?
    if ($(document).height() - $(window).height() - 100 <= $(window).scrollTop()) {
        
        console.log("JS läuft");
        
        $.ajax({
            url: 'php/print-entry.php',
            data: {
                count:          entryCount,
                search:         $('#searchBox').val(),
                programming:    $("#programming").prop("checked"),
                baking:         $("#baking").prop("checked"),
                misc:           $("#misc").prop("checked")
            },
            async: false, 
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
