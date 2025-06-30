<?php
/***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***/
    session_start();
    include 'conexion.php';
    if (isset($_SESSION['usuario']) && isset($_POST['mensaje'])) {
        $usuario = $_SESSION['usuario'];
        $mensaje = $_POST['mensaje'];
        $rol = $_SESSION['rol'];
        $consulta = "INSERT INTO chat (rol, usuario, mensaje) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($consulta);
        $stmt->bind_param("sss", $rol, $usuario, $mensaje);
        $stmt->execute();
        $stmt->close();
    }
/***Realizado por HTCA***/
?>

