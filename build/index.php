<!DOCTYPE html><html><head><title>ResamVi | Code, Edit, Bake</title><meta name="viewport" content="width=device-width,initial-scale=0.8"><meta charset="utf-8"><link rel="icon" href="img/favicon.ico" type="image/gif" size="48x48"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"><link rel="stylesheet" type="text/css" href="css/style.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><link href="https://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet"><script src="js/script.js"></script></head><body> <?php
        // ---------------------------------------------- Track user ---------------------------------------------
        $conn = new mysqli("localhost", "resatult", "Z2DYTa7-YnVHN", "resatult_data");
        $conn->set_charset("utf8");

        // check connection
        if ($conn->connect_errno) {
            printf("Connect failed: %s\n", $mysqli->connect_error);
            exit();
        }

        // Get data
        $date = date("l jS \of F Y H:i:s A", time() + 21600);
        $ip = $_SERVER["REMOTE_ADDR"];
        $agent = $_SERVER['HTTP_USER_AGENT'];
        $language = $_SERVER['HTTP_ACCEPT_LANGUAGE'];

        $query = "INSERT INTO visits (date, ip, agent, language) VALUES (\""
            . $date . "\", \""
            . $ip . "\", \""
            . $agent . "\", \""
            . $language . "\")";

        $conn->query($query);

        // close connection
        $conn->close();
        ?> <div class="container-fluid" style="padding:0"><div id="vertical-alignment"><div id="horizontal-alignment"><div class="row" id="header"><div class="col-md-3 col-md-offset-3"><img src="img/logo.png" class="img-responsive logo"></div><img src="img/vline.png" class="img-responsive"><div class="col-md-6"><h1 class="title align-middle">ResamVi</h1></div></div><div class="row" id="description">Hey, ich bin Julien.<br>Informatikstudent.</div><div class="row" id="iconRow"><div class="col-md-4 col-md-offset-4" id="iconContainer"><a href="https://github.com/ResamVi"><img src="img/icons/github48.png" alt="github" class="icons"> </a><a id="trophy" style="cursor: pointer"><img src="img/icons/progress48.png" alt="trophy" class="icons"> </a><a href="https://www.youtube.com/channel/UCXUsCsOauNNuUwFLjYeyTPA"><img src="img/icons/youtube48.png" alt="youtube" class="icons"></a></div><div class="col-md-4 col-md-offset-4" id="iconContainer"><img src="img/arrowDownSmall.png" alt="arrow down" id="smallarrow" style="visibility:hidden"></div><div class="col-md-4 col-md-offset-4" id="subiconContainer"><div id="vertical"><a href="https://www.hackerrank.com/ResamVi" style="visibility:hidden"><img id="icon1" src="img/icons/hackerrank48.png" alt="hackerrank" class="subicons"> </a><a href="https://www.codingame.com/profile/1d2bfec1d536931514190d98cd20a8369171221" style="visibility:hidden"><img id="icon2" src="img/icons/codingame48.png" alt="codingame" class="subicons"> </a><a href="http://codeforces.com/profile/ResamVi" style="visibility:hidden"><img id="icon3" src="img/icons/codeforces48.png" alt="codeforces" class="subicons"> </a><a href="https://www.codewars.com/users/ResamVi" style="visibility:hidden"><img id="icon4" src="img/icons/codewars48.png" alt="codewars" class="subicons"></a></div></div></div></div></div><hr class="separate" style="padding:0px;margin:auto"><div class="sandwich">&#9776;</div><form class="form center-block search"><div class="col-md-4 col-md-offset-4 text-center"><div class="input-group"><span class="input-group-addon">&#128270;</span> <input type="text" class="form-control" placeholder="Suche" id="searchBox"></div><div style="margin-top:5px"><div class="checkbox-inline"><label style="font-weight: normal"><input type="checkbox" id="programming" checked="checked"> Programmierung</label></div><div class="checkbox-inline"><label style="font-weight: normal"><input type="checkbox" id="baking" checked="checked"> Backen</label></div><div class="checkbox-inline"><label style="font-weight: normal"><input type="checkbox" id="misc" checked="checked"> Sonstiges</label></div></div></div></form><div class="row" id="blog-entries"></div><div class="entry-content" style="height:100px">&nbsp;</div></div></body></html>