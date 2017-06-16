<!DOCTYPE html>
<html>
    <head>
        <title>ResamVi | Coding, Animation, Video Editing</title>
        
        <!-- Meta Tags -->
        <meta name="viewport" content="width=device-width, initial-scale=0.8">
        <meta charset="utf-8" /> 
        
        <!-- Favicon -->
        <link rel="icon" href="img/favicon.ico" type="image/gif" size="48x48">
        
        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        
        <!-- CSS -->
        <link rel="stylesheet"  type="text/css" href="css/style.css">
        
        <!-- jQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">
        
        <script async src="process/scroll-blog.js"></script>
    </head>

    
    <body>
        
        <?php
        // ---------------------------------------------- Track user ---------------------------------------------
        $conn = new mysqli("localhost", "resatult", "Z2DYTa7-YnVHN", "resatult_data");
        $conn->set_charset("utf8");

        // check connection
        if ($conn->connect_errno) {
            printf("Connect failed: %s\n", $mysqli->connect_error);
            exit();
        }

        // Get data
        $array = get_browser(null, true);
        $date = date("l jS \of F Y H:i:s A", time() + 21600);
        $ip = $_SERVER["REMOTE_ADDR"];
        $agent = $_SERVER['HTTP_USER_AGENT'];
        $browser = $array["browser"];
        $language = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
        $platform = $array["platform"];

        $query = "INSERT INTO visits (date, ip, agent, browser, language, platform, dump) VALUES (\""
            . $date . "\", \""
            . $ip . "\", \""
            . $agent . "\", \""
            . $browser . "\", \""
            . $language . "\", \""
            . $platform . "\", \""
            . implode(", ", $array)  . "\")";

        $conn->query($query);

        // close connection
        $conn->close();
        ?>
        
        <div class="container-fluid">    
            
            <!-- First Page -->
            <div id="vertical-alignment">
                <div id="horizontal-alignment">

                    <div class="row" id="header">
                        <div class="col-md-3 col-md-offset-3"><img src="img/logo.png" class="img-responsive logo"></div>
                        <img src="img/vline.png" class="img-responsive">
                        <div class="col-md-6"><h1 class="title align-middle">ResamVi</h1></div>
                    </div>

                    <div class="row" id="description">
                        Hey, ich bin Julien. <br />Informatikstudent.
                    </div>

                    <div class="row" id="iconRow">
                        <div class="col-md-4 col-md-offset-4" id="iconContainer">
                            <a href="https://github.com/ResamVi">
                                <img src="img/icons/github48.png" alt="github" class="icons">
                            </a>
                            <a href="http://hyunsdojo.com/user.php?u=resamvi">
                                <img src="img/icons/dojo.jpg" alt="hyunsdojo" class="icons">
                            </a>
                            <a href="https://www.youtube.com/channel/UCXUsCsOauNNuUwFLjYeyTPA">
                                <img src="img/icons/youtube48.png" alt="youtube" class="icons">
                            </a>
                        </div>
                    </div>
                </div>
            
            </div>
            
            <div class="row arrow-down">
              <div class="col-md-12">
                <img class="img-responsive center-block" src="img/arrowDown.png" alt="arrow">
              </div>
            </div>
            
            <!-- Second Page -->
            <div class="row" id="blog-entries">
                <!-- Entries displayed here -->
            </div>
            
            <!-- Last Page -->
            <div class="entry-content" style="height:100px;">
                &nbsp;
            </div>
        </div>
    </body>

    <!-- Google Analytics -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-96453810-1', 'auto');
      ga('send', 'pageview');

    </script>
</html>