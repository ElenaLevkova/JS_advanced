<?php
$_POST = json_decode(file_get_contents("php://input"), true); //строка для работы с json файлами в php
echo var_dump($_POST);