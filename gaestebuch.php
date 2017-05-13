<!DOCTYPE html>
<html>
    <head>
        <title>Gästebuch</title>
        
        <!-- CSS -->
        <link rel="stylesheet"  type="text/css" href="css/style.css">
        <link rel="stylesheet"  type="text/css" href="css/gaestebuchStyle.css">
        
        <!-- Meta Tags -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8" /> 
		
        <!-- Favicon -->
        <link rel="icon" href="img/favicon.ico" type="image/gif" size="48x48">
        
        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        
        <!-- jQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">
        
        <!-- Google Captcha -->
        <script src='https://www.google.com/recaptcha/api.js'></script>
        
        <!-- Client side validation -->
        <script src="process/validate.js"></script>
        
    </head>

    
    <body>
        <div class="container-fluid">    
            
            <!-- First Page -->
            <div id="vertical-alignment">
                
                <div id="horizontal-alignment">

                    <div class="row caption">
                        <h1 class="title">Gästebuch</h1>
                    </div>
                    
                    <!-- Failure message HIDDEN -->
                    <div id="fail" class="col-md-offset-4 col-md-4 alert" style="border">
                        Bitte beweise, dass du ein Mensch bist.
                    </div>
                    
                    <!-- Form Page -->
                    <div class="col-md-offset-4 col-md-4">
                        <form id="form" method="post">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="name" class="form-control" id="name" name="name" placeholder="Name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">E-Mail</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="E-Mail (optional)">
                            </div>
                            <div class="form-group">
                                <label for="content">Inhalt</label>
                                <textarea class="form-control" id="content" rows="3" name="content" placeholder="Fühl dich frei mich in jeder Art zu kritiseren.
Ich behalte mir jedoch vor alles Extreme zu löschen." required></textarea>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-10 col-md-offset-1 g-recaptcha" data-sitekey="6LepQyAUAAAAAGTGHOhumDTpFEczGIuvUWUvUiDx"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-md-offset-4">
                                    <button type="submit" class="btn btn-default">Bestätigen</button>
                                </div>
                            </div>
                        </form>
                        
                        <?php
                        
                        // Used to combat evil user inputs
                        function fix($data) {
                            $data = trim($data);
                            $data = stripslashes($data);
                            $data = htmlspecialchars($data);
                            $data = strip_tags($data);
                            return $data;
                        }
                        
                        // RECAPTCHA
                        $captcha    = $_POST["g-recaptcha-response"];
                        $secretKey  = "6LepQyAUAAAAADabd_wC3R9-JrMkJKxUhvLYDMhD";
                        $ip         = $_SERVER['REMOTE_ADDR'];
                        $response   = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
                        
                        $responseKeys = json_decode($response, true);
                        
                        if(intval($responseKeys["success"]) === 1) {
                            
                            // *************************************** SEND ************************************************
                            if(!empty($_POST)) {

                                $conn = new mysqli("localhost", "resatult", "Z2DYTa7-YnVHN", "resatult_guestbook");
                                $conn->set_charset("utf8");

                                // check connection
                                if ($conn->connect_errno) {
                                    printf("Connect failed: %s\n", $mysqli->connect_error);
                                    exit();
                                }

                                // Get data
                                $ip = $_SERVER["REMOTE_ADDR"];
                                $date = date("j. F Y");
                                $name = fix($_POST["name"]);
                                $email = fix($_POST["email"]);
                                $content = fix($_POST["content"]);
                                $captcha = $_POST["g-recaptcha-response"];

                                $query = "INSERT INTO entries (id, ip, date, name, email, message) VALUES (\"\", \""
                                    . $ip . "\", \""
                                    . $date . "\", \""
                                    . $name . "\", \""
                                    . $email . "\", \""
                                    . $content . "\")";

                                $conn->query($query);

                                // close connection
                                $conn->close();
                            }
                        }?>
                        
                    </div>
                </div>
            </div>    
            
            <!-- Second Page -->
            <div class="row" id="guestbook-entries">
                
                
                <?php
                
                // *************************************** CONNECT ************************************************
                $conn = new mysqli("localhost", "resatult", "Z2DYTa7-YnVHN", "resatult_guestbook");
                $conn->set_charset("utf8");
                        
                // check connection
                if ($conn->connect_errno) {
                    printf("Connect failed: %s\n", $mysqli->connect_error);
                    exit();
                }
                
                // *************************************** FETCH & DISPLAY ****************************************
                $query = "SELECT * FROM entries ORDER by ID DESC";
        
                if ($data = $conn->query($query)) {
                    
                    // iterate entries
                    while ($entry = $data->fetch_assoc()) {
                        
                        // fetch data
                        $date       = strip_tags($entry["date"]);
                        $name       = strip_tags($entry["name"]);
                        $message    = nl2br(strip_tags($entry["message"]));
                        
                        // display data
                        echo
                        "<div class=\"guestbook-entry\">
                            <h4 class=\"guestbook-date\">" . $date . "</h4>
                            <h2 class=\"guestbook-title\">" . $name . "</h2>
                            <div class=\"guestbook-content\">" . $message . "</div>
                        </div>
                        <hr class=\"style\">";
                        
                    }
                    
                    // free memory
                    $data->free();
                }

                // close connection
                $conn->close();
                ?>
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