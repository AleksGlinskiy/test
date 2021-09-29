<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);

$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer/language/');
$mail->isHTML(true);

$mail->setFrom('from@derhunt.com', 'Обратная связь с сайта');

$mail->addAddress('glinskiy_1997@mail.ru');

$body = "<h1>Новая заявка</h1>";

if(trim(!empty($_POST['name']))) {
    $body .= "<p>Имя: <b>".$_POST['name']."</b>";
}

if(trim(!empty($_POST['tel']))) {
    $body .= "<p>Телефон: <b>".$_POST['tel']."</b>";
}

if(trim(!empty($_POST['message']))) {
    $body .= "<p>Сообщение: <b>".$_POST['message']."</b>";
}

//Content

$mail->Subject = 'Обратная связь с сайта!';
$mail->Body    = $body;

if(!$mail->send()) {
    $mes = "0";
} else {
    $mes = "1";
}

$res = ['message' => $mes];
header('Content-type: application/json');
echo json_encode($res);