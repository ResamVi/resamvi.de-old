<?php
    
    libxml_use_internal_errors(true);

    // This is the list of .html file names of entries I've done so far
    // 0 = Programming, 1 = Baking, 2 = Miscallenous
    $entries = array(
        "rheinuferlauf2017.html" => 2,
        "apfelkuchen.html" => 1,
        "charitywalkandrun2017.html" => 2,
        "kaesekuchen.html" => 1, 
        "screenbounce.html" => 2, 
        "bouncingball.html" => 2,
        "chocolatechipcookies.html" => 1,
        "start.html" => 2,
        "erster.html" => 2);

    $filter = [];

    foreach ($entries as $key => $value) {
        
        if(strcmp($_GET["programming"], "true") == 0 && $value == 0) {
            array_push($filter, $key);
        }
        
        if(strcmp($_GET["baking"], "true") == 0 && $value == 1) {
            array_push($filter, $key);
        }
        
        if(strcmp($_GET["misc"], "true") == 0 && $value == 2) {
            array_push($filter, $key);
        }
    }

    if(strcmp($_GET["search"], "") != 0) {
        
        $filter = array();
        
        foreach($entries as $key => $value) {
            if (strpos($key, $_GET["search"]) !== false) {
                array_push($filter, $key);
            }
        }
        
    }

    // I just want a part of the entry for the main blog
    // In this object we save a html document
    $doc = new DOMDocument();
    
    // Load document (if there are any to load)
    if(intval($_GET["count"]) < count($filter)) {
        $doc->loadHTML(file_get_contents("../" . $filter[$_GET["count"]]));
        $entry = $doc->getElementById('blog-entries');
        $footer = $doc->getElementById('footer');

        echo $doc->saveHtml($entry);
        echo $doc->saveHtml($footer);
        echo "<hr class=\"gradient\">";
    }
?>
