<?php
/***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***/
    include 'conexion.php';
    function usuarioExiste($usuario, $conn) {
        $sql = "SELECT * FROM usuarios WHERE usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    function correoExiste($correo, $conn) {
        $sql = "SELECT * FROM usuarios WHERE correo = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $usuario = $_POST['usuario'];
        $contrasena = $_POST['contrasena'];
        $correo = $_POST['correo'];
        $rol = 2;
        if (usuarioExiste($usuario, $conn)) {
            echo "<script>alert('El nombre de usuario ya está en uso. Por favor, elige otro.');</script>";
        }
        if (correoExiste($correo, $conn)) {
            echo "<script>alert('El correo electrónico ya está en uso. Por favor, utiliza otro.');</script>";
        } else {
            $sql = "INSERT INTO usuarios (rol, usuario, contrasena, correo) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("isss", $rol, $usuario, $contrasena, $correo);

            if ($stmt->execute()) {
                // Registro exitoso
                echo "<script>alert('Usuario registrado con éxito. Será redireccionado a la página principal en unos segundos.');</script>";
                echo "<script>setTimeout(function() { window.location.href = 'index.php'; }, 100);</script>";
                exit;
            } else {
                echo "<script>alert('Ocurrió un error al registrar el usuario. Por favor, intenta nuevamente más tarde.');</script>";
            }
            $stmt->close();
        }
        $conn->close();
    }
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Registrarse</title>
	<link rel="stylesheet" href="css/text.css">
    <link rel="stylesheet" href="css/div.css">
    <link rel="stylesheet" href="css/form.css">
	<script src="js/botones.js" defer></script>
	<script src="js/listamenu.js" defer></script>
    <script src="js/registrar.js" defer></script>
</head>
<body style="background-image: url('img/fondo.gif');background-size: cover;">
	<div class="cajamenu">
		<div class="logo">
			<h1>THE RETROPARADISE</h1>
		</div>
		<div class="menu5">
			<button type="button" class="menu" onclick="index()" style="float: none;width: 150px;">Regresar</button>
			<button type="button" class="menu" style="width:180px;" onclick="login()">Iniciar Sesión</button>
		</div>
	</div>
	<div class="caja">
		<div class="cred">
			<div class="fcont">
				<h2>REGISTRARSE</h2>
				<form method="post" action="registro.php" onsubmit="return validarFormulario()">
					<div class="fitem">
						<label for="usuario">Usuario</label>
        				<input type="text" id="usuario" name="usuario" minlength="6" maxlength="16">
					</div>
					<div class="fitem">
        				<label for="contrasena">Contraseña</label>
        				<input type="password" id="contrasena" name="contrasena" minlength="8" maxlength="50">
        			</div>
        			<div class="fitem">
        				<label for="correo">Correo electrónico</label>
        				<input type="email" id="correo" name="correo" maxlength="50">
        			</div>
        				<button type="submit" class="reg">Registrarse</button>
    			</form>
    		</div>
		</div>
	</div>			
</body>
<!-- ***Realizado por HTCA***-->
</html>