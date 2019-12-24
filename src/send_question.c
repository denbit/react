<?php
header("Content-type:application/json");
array_walk($_POST,'strip_tags');
const TO = 'info@langivi.technology';
const Subject = 'Contact form from ';
["email"=>$from,"message"=>$message,'name'=> $name] = $_POST;
$name = filter_var($name,FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_BACKTICK);
$message = filter_var($message,FILTER_SANITIZE_FULL_SPECIAL_CHARS);
 if (filter_var($from,FILTER_VALIDATE_EMAIL,FILTER_FLAG_EMAIL_UNICODE) && $message && $name){
 	$from_header = ["From" => $from ];
	echo json_encode(['sent'=>mail(TO,Subject . $name , $message, $from_header)]);
	exit();
 }
 echo json_encode(['sent'=>false]);