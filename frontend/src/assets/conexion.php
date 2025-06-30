<?php
/***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***/
    $server = "localhost";
    $username = "root";
    $pass = "";
    $database = "retroparadise";
    $conn = new mysqli($server, $username, $pass, $database);
    if ($conn->connect_error) {
        die("Error Fatal: Conexión Fallida: " . $conn->connect_error);
    }
    function formatearFecha($fecha){
        return date('g:i a', strtotime($fecha));
    }
/***Realizado por HTCA***/
?>
