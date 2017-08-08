<!DOCTYPE html><html><head><title>Feedbackkasten</title><link rel="stylesheet" type="text/css" href="css/style.css"><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"><link rel="icon" href="img/favicon.ico" type="image/gif" size="48x48"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><link href="https://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet"><script src="https://www.google.com/recaptcha/api.js"></script><script src="js/script.js" async></script></head><body><section class="jumbotron blog-start"><div class="container"><div class="row caption"><h1 class="title">Feedbackkasten</h1></div><div id="fail" class="col-md-offset-4 col-md-4 alert" style="border">Bitte beweise, dass du ein Mensch bist.</div><div class="col-md-offset-4 col-md-4"><form id="form" method="post"><div class="form-group"><label for="content">Feedback</label><textarea class="form-control" id="content" rows="12" name="content" placeholder="Anonyme Kritik an Julien schreiben.
" required></textarea></div><div class="form-group"><div class="row"><div class="col-md-10 col-md-offset-1 g-recaptcha" data-sitekey="6LepQyAUAAAAAGTGHOhumDTpFEczGIuvUWUvUiDx"></div></div></div><div class="row"><div class="col-md-4 col-md-offset-4"><button type="submit" class="btn btn-default">Senden</button></div></div></form></div></div></section></body></html> <?php 
require 'php/PHPMailerAutoload.php';


// Used to combat evil user inputs
function fix($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    $data = strip_tags($data);
    return $data;
}

// RECAPTCHA
$responseKeys = array("success" => 0);

if(!empty($_POST)) {
    $captcha    = $_POST["g-recaptcha-response"];
    $secretKey  = "6LepQyAUAAAAADabd_wC3R9-JrMkJKxUhvLYDMhD";
    $ip         = $_SERVER['REMOTE_ADDR'];
    $response   = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);

    $responseKeys = json_decode($response, true);
}

if(intval($responseKeys["success"]) === 1) {

    // *************************************** SEND ************************************************
    if(!empty($_POST)) {

        $mail = new PHPMailer;

        $mail->isSMTP();
        $mail->Host = 'server102.web-hosting.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'admin@resamvi.de';
        $mail->Password = 'spongebob110';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('admin@resamvi.de', 'Feedback');
        $mail->addAddress('admin@resamvi.de', 'Julien Midedji');
        $mail->addAddress('Julien.Midedji@gmail.com', 'Julien Midedji');

        $mail->isHTML(true);

        $mail->Subject = 'Du hast Feedback bekommen';
        $mail->Body    = fix($_POST["content"]);

        if(!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            echo 'Nachricht wurde gesendet. Vielen Dank für dein Feedback';
        }

    }
}
?>