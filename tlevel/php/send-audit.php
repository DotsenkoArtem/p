<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

//Load Composer's autoloader
// require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);


$name           = $_POST['userName'];
$company        = $_POST['company'];
$phone          = $_POST['userPhone'];
$formTheme      = $_POST['formTheme'];

try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                       //Enable verbose debug output
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
    $mail->isSMTP();                                             //Send using SMTP
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;                                       //Enable SMTP authentication

    $mail->Host       = 'smtp.mail.ru';                             //Set the SMTP server to send through
    $mail->Username   = 'artemdoc1@inbox.ru';                       //SMTP username
    $mail->Password   = 'h8pZW5Wa8QjUGGbRJnDX';                     //SMTP password

    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;             //Enable implicit TLS encryption

    $mail->SMTPSecure = 'ssl';                                      //Enable implicit TLS encryption
    $mail->Port       = 465;                                        //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    


    //Recipients
    // $mail->setFrom('artemdoc1@inbox.ru', 'Фамилия Имя Отчество');
    $mail->setFrom('artemdoc1@inbox.ru');
    $mail->addAddress('doclko31@gmail.com');                        //Add a recipient
    // $mail->addAddress('ellen@example.com');                      //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');                //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');           //Optional name


  


    //Content
    $mail->isHTML(true);                                            //Set email format to HTML
    $mail->Subject = 'Заявка с сайта "tlevel.ru"';
    $mail->Body    =    
                    "<b>Тема: </b>{$formTheme}<br>
                    <b>Пользователь: </b>{$name}<br>
                    <b>Компания: </b>{$company}<br>
                    <b>Телефон: </b>{$phone}<br>";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';




    if ($mail->send()) {
        $result = "success"; 
    } else {
        $result = "error";
    }

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status, "myuploads['size']" => $myuploads['size'], "attachmentSize" => $attachmentSize]);
?>