<?php
/***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***/
    include 'conexion.php';
    function usuarioExiste($usuario, $contrasena, $conn) {
        $sql = "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $usuario, $contrasena);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $usuario = $_POST['usuario'];
        $contrasena = $_POST['contrasena'];
        if (usuarioExiste($usuario, $contrasena, $conn)) {
            session_start();
            $_SESSION['usuario'] = $usuario;
            echo "<script>alert('Inicio de sesión exitoso. Será redireccionado a la página principal en unos segundos.');</script>";
            echo "<script>setTimeout(function() { window.location.href = 'index.php'; }, 100);</script>";
            exit;
        }
        else {
            echo "<script>alert('El usuario o la contraseña son incorrectos. Por favor, inténtelo nuevamente.');</script>";
        }
    }
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Iniciar Sesión</title>
	<link rel="stylesheet" href="css/text.css">
    <link rel="stylesheet" href="css/div.css">
    <link rel="stylesheet" href="css/form.css">
	<script src="js/botones.js" defer></script>
	<script src="js/listamenu.js" defer></script>
</head>
<body style="background-image: url('img/fondo.gif');background-size: cover;">
	<div class="cajamenu">
		<div class="logo">
			<h1>THE RETROPARADISE</h1>
		</div>
		<div class="menu5">
			<button type="button" class="menu" onclick="index()" style="float: none;width: 150px;">Regresar</button>
			<button type="button" class="menu" style="width:170px;" onclick="registro()">Registrarse</button>
		</div>
	</div>
	<div class="caja">
		<div class="cred">
			<div class="fcont">
				<h2>INICIAR SESIÓN</h2>
				<form method="post" action="login.php">
					<div class="fitem">
						<label for="usuario">Usuario</label>
        				<input type="text" id="usuario" name="usuario" minlength="6" maxlength="16">
					</div>
					<div class="fitem">
        				<label for="contrasena">Contraseña</label>
        				<input type="password" id="contrasena" name="contrasena" minlength="8" maxlength="50">
        			</div>
        				<button type="submit" class="reg">Ingresar</button>
    			</form>
    		</div>
		</div>
	</div>			
</body>
<!-- ***Realizado por HTCA***-->
</html>