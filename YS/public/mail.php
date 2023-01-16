<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$formTheme = $_POST['formTheme'];
$name = $_POST['userName'];
$phone = $_POST['userPhone'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'ys-send@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'Q3P68hiHpLqYW3vqT7Yc'; // Ваш пароль от почты с которой будут отправляться письма


$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('ys-send@mail.ru', 'internet-boosters'); // от кого будет уходить письмо?

$mail->addAddress('yota-system@mail.ru');     // Кому будет уходить письмо 
// $mail->addAddress('info@uneversum.com');     // Кому будет уходить письмо /добавил еще один email
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

// $mail->Subject = 'Заявка с тестового сайта';
// $mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email;
// $mail->AltBody = '';

$mail->Subject = 'Заявка с сайта internet-boosters.ru';
$mail->Body    =    
                    '<b>Форма, с которой отправлена заявка: </b> '.$formTheme.'<br>
                    <b>Пользователь: </b>'.$name.'<br>
				    <b>Номер телефона: </b> '.$phone.'<br>';
$mail->AltBody = '';

if($mail->send()) {
    return true;
} else {
    return false;
}
?>