<!DOCTYPE html><html><head><title>ResamVi | Code, Edit, Bake</title><meta name="viewport" content="width=device-width,initial-scale=0.8"><meta charset="utf-8"><link rel="icon" href="img/favicon.ico" type="image/gif" size="48x48"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><link rel="stylesheet" type="text/css" href="css/style.css"><link rel="stylesheet" type="text/css" href="css/loading.css"><link href="https://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet"><script src="js/script.js"></script></head><body> <?php
        // ---------------------------------------------- Track user ---------------------------------------------
        $conn = new mysqli("localhost", "resatult", "Z2DYTa7-YnVHN", "resatult_data");
        $conn->set_charset("utf8");

        // check connection
        if ($conn->connect_errno) {
            printf("Connect failed: %s\n", $mysqli->connect_error);
            exit();
        }

        // Get data
        $date = date("Y-m-d H:i:s", time() + 21600);
        $ip = $_SERVER["REMOTE_ADDR"];
        $agent = $_SERVER['HTTP_USER_AGENT'];
        $language = $_SERVER['HTTP_ACCEPT_LANGUAGE'];

        $query = "REPLACE INTO visits (date, ip, agent, language) VALUES (\""
            . $date . "\", \""
            . $ip . "\", \""
            . $agent . "\", \""
            . $language . "\")";

        $conn->query($query);

        // close connection
        $conn->close();
        ?> <section class="jumbotron blog-start"><div class="container"><div class="row" id="header"><div class="col-md-3 col-md-offset-3"><a href="index.html"><img src="img/logo.png" class="img-responsive logo"></a></div><img src="img/vline.png" class="img-responsive"><div class="col-md-6"><h1 class="title">ResamVi</h1></div></div><div class="row" id="description" style="font-family: 'Space Mono'">Hey, ich bin Julien.<br>Informatikstudent.</div><div class="row" id="iconRow"><div class="col-md-8 col-md-offset-2 text-center"><a href="https://github.com/ResamVi" class="icons"><img src="img/icons/github48.png" alt="github"> </a><a href="https://www.hackerrank.com/ResamVi" class="icons"><img src="img/icons/HackerRank_logo.png" alt="hackerrank"> </a><a href="https://www.youtube.com/channel/UCXUsCsOauNNuUwFLjYeyTPA" class="icons"><img src="img/icons/youtube48.png" alt="youtube"></a></div></div></div></section><hr class="separate" style="padding:0px;margin:auto"><div class="sandwich btn-lg"><span class="glyphicon glyphicon-menu-hamburger"></span></div><form class="form center-block search"><div class="col-md-4 col-md-offset-4 text-center"><div class="input-group"><span class="input-group-addon">&#128270;</span> <input type="text" class="form-control" placeholder="Suche" id="searchBox"></div><div style="margin-top:5px"><div class="btn btn-success" style="margin-right:5%" id="programming">Programmierung</div><div class="btn btn-success" style="margin-right:5%" id="baking">Backen</div><div class="btn btn-success" id="misc">Sonstiges</div></div></div></form><section class="row" id="blog-entries" style="margin-top:5%; margin-bottom:5%"></section><div class="page-load-status"><div class="infinite-scroll-request loader-ellips"><span class="loader-ellips__dot"></span> <span class="loader-ellips__dot"></span> <span class="loader-ellips__dot"></span> <span class="loader-ellips__dot"></span></div></div></body></html>