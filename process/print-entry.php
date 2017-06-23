<?php
    
    libxml_use_internal_errors(true);

    // This is the list of .html file names of entries I've done so far
    $entries = array("apfelkuchen.html", "charitywalkandrun2017.html","kaesekuchen.html", "screenbounce.html", "bouncingball.html","chocolatechipcookies.html", "start.html", "erster.html");
    
    // I just want a part of the entry for the main blog
    // In this object we save a html document
    $doc = new DOMDocument();
    
    // Load document (if there are any to load)
    if(intval($_GET["count"]) < count($entries)) {
        $doc->loadHTML(file_get_contents("../" . $entries[$_GET["count"]]));
    }else{
         header("HTTP/1.1 404 Not Found");
    }
    
    // Find element with id
    $entry = $doc->getElementById('blog-entries');
    $footer = $doc->getElementById('footer');

    // Output
    echo $doc->saveHtml($entry);
    echo $doc->saveHtml($footer);
    echo "<hr class=\"gradient\">";
?>