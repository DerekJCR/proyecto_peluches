<?php
/***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***/
	session_start();
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
	if (isset($_SESSION['usuario'])) {
    	$usuario = $_SESSION['usuario'];
    	$sql = "SELECT rol, correo, contrasena FROM usuarios WHERE usuario = ?";
    	$stmt = $conn->prepare($sql);
    	$stmt->bind_param("s", $usuario);
    	$stmt->execute();
    	$result = $stmt->get_result();
    	if ($result->num_rows > 0) {
        	$row = $result->fetch_assoc();
        	$_SESSION['rol'] = $row['rol'];
        	$_SESSION['correo'] = $row['correo'];
        	$_SESSION['contrasena'] = $row['contrasena'];
    	}
    	$stmt->close();
	}
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    	if (isset($_POST['delete'])) {
        	$sql = "DELETE FROM usuarios WHERE usuario = ?";
        	$stmt = $conn->prepare($sql);
        	$stmt->bind_param("s", $usuario);
        	$stmt->execute();
        	$stmt->close();
        	$sql = "UPDATE chat SET rol = 0 WHERE usuario = ?";
        	$stmt = $conn->prepare($sql);
        	$stmt->bind_param("s", $usuario);
        	$stmt->execute();
        	$stmt->close();
        	$sql = "UPDATE chat SET usuario = 'UsuarioEliminado' WHERE usuario = ?";
        	$stmt = $conn->prepare($sql);
        	$stmt->bind_param("s", $usuario);
        	$stmt->execute();
        	$stmt->close();
        	echo '<script src="js/botones.js"></script>';
        	echo "<script>alert('Cuenta Eliminada con éxito. Serás redireccionado en unos segundos.');</script>";
    		echo '<script>logout1();</script>';
    		exit();
    	}
    	if (isset($_POST['update1'])) {
        	$new_usuario = $_POST['new_usuario'] ?? $usuario;
        	if (usuarioExiste($new_usuario, $conn)) {
            	echo "<script>alert('El nombre de usuario ya está en uso. Por favor, elige otro.');</script>";
        	}
        	else{
        		if ($new_usuario !== $usuario) {
            		$sql = "UPDATE chat SET usuario = ? WHERE usuario = ?";
            		$stmt = $conn->prepare($sql);
            		$stmt->bind_param("ss", $new_usuario, $usuario);
            		$stmt->execute();
            		$stmt->close();
       			}
        		$sql = "UPDATE usuarios SET usuario = ? WHERE usuario = ?";
        		$stmt = $conn->prepare($sql);
        		$stmt->bind_param("ss", $new_usuario, $usuario);
        		$stmt->execute();
        		$stmt->close();
        		echo '<script src="js/botones.js"></script>';
        		echo "<script>alert('Usuario cambiado con éxito. Deberás iniciar sesión de nuevo');</script>";
    			echo '<script>logout1();</script>';
        		exit();
        	}       	
    	}
    	if (isset($_POST['update2'])) {
        	$new_correo = $_POST['new_correo'] ?? $_SESSION['correo'];
        	if (correoExiste($correo, $conn)) {
            	echo "<script>alert('El correo electrónico ya está en uso. Por favor, utiliza otro.');</script>";
        	}
        	else{
        		$sql = "UPDATE usuarios SET correo = ? WHERE usuario = ?";
        		$stmt = $conn->prepare($sql);
        		$stmt->bind_param("ss", $new_correo, $usuario);
        		$stmt->execute();
        		$stmt->close();
        		echo '<script src="js/botones.js"></script>';
        		echo "<script>alert('Correo cambiado con éxito. Deberás iniciar sesión de nuevo');</script>";
    			echo '<script>logout1();</script>';
        		exit();
        	}
    	}
    	if (isset($_POST['update3'])) {
        	$new_password = $_POST['new_password'] ?? null;
        	$sql = "UPDATE usuarios SET contrasena = ? WHERE usuario = ?";
        	$stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $new_password, $usuario);
        	$stmt->execute();
        	$stmt->close();
			echo '<script src="js/botones.js"></script>';
        	echo "<script>alert('Contraseña cambiada con éxito. Deberás iniciar sesión de nuevo');</script>";
    		echo '<script>logout1();</script>';
        	exit();
    	}
    }
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/text.css">
    <link rel="stylesheet" href="css/div.css">
    <link rel="stylesheet" href="css/form.css">
    <script src="js/botones.js" defer></script>
    <script>
    	function validarUser() {
    		var username = document.getElementById("new_usuario").value;
    		if (username.length < 5) {
        		alert("Introduzca un nombre de usuario de al menos 6 caracteres.");
        		return false;
    		}
    		else{
        		return confirm('¿Estás seguro que deseas cambiar tu Nombre de Usuario?');
    		}
		}
		function validarContrasena() {
    		var password = document.getElementById("new_password").value;
    		if (password.length < 7) {
        		alert("Introduzca una contraseña de al menos 8 caracteres.");
        		return false;
    		}
    		else{
        		return confirm('¿Estás seguro que deseas cambiar tu Contraseña?');
    		}
		}
		function validarCorreo() {
    		var email = document.getElementById("new_correo").value;
    		if (!validarEmail(email)) {
       			alert("Introduzca una dirección de correo electrónico válida");
        		return false;
    		}
    		else{
        		return confirm('¿Estás seguro que deseas cambiar tu Correo Electrónico?');
    		}
		}
		function confirmarEli() {
        	return confirm('¿Estás seguro que deseas eliminar tu Cuenta?');
		}
		function validarEmail(email) {
    		var re = /\S+@\S+\.\S+/;
    		return re.test(email);
		}
    </script>
</head>
<body>
	<div width="800" height="800" style="background-color:#FFE4D9;" style="margin:auto;">
		<h3 style="color: #125DFF;">Datos de Usuario</h3>
		<h3 style="color: #E48D08;text-align: left;font-weight:bold; margin: 0px; padding:0px;">Nombre de Usuario</h3>
		<h4 style="color: black;text-align: left; margin: 0px; padding:0px; font-size: 18px;"><?php echo htmlspecialchars($_SESSION['usuario']); ?></h4>
		<h3 style="color: #E48D08;text-align: left;font-weight:bold; margin: 0px; padding:0px;">Correo Electrónico</h3>
		<h4 style="color: black;text-align: left; margin: 0px; padding:0px; font-size: 18px;"><?php echo htmlspecialchars($_SESSION['correo']); ?></h4>
		<h3 style="color: #E48D08;text-align: left;font-weight:bold; margin: 0px; padding:0px;">Contraseña</h3>
		<h4 style="color: black;text-align: left; margin: 0px; padding:0px; font-size: 18px;"><?php echo htmlspecialchars($_SESSION['contrasena']); ?></h4>
		<h3 style="color: #E48D08;text-align: left;font-weight:bold; margin: 0px; padding:0px;">Rol</h3>
		<?php if (isset($_SESSION['rol']) && $_SESSION['rol'] == 1):?>
			<h4 style="color: red;text-align: left; margin: 0px; padding:0px; font-size: 18px;">Administrador</h4>
		<?php else: ?>
			<h4 style="color: #125DFF;text-align: left; margin: 0px; padding:0px; font-size: 18px;">Usuario</h4>
		<?php endif; ?>
		<form method="POST" action="">
            
        </form>
        <div class="fcont">
        	<form method="POST" action="user.php" onsubmit="return validarUser()">
            	<h3 style="color: #125DFF;">Actualizar Datos</h3>
            	<div class="fitem">
            		<label for="new_usuario">Nuevo Usuario:</label>
            		<input type="text" id="new_usuario" name="new_usuario" minlength="6" maxlength="16" required>
        		</div>
            	<button type="submit" class="upd" name="update1">Actualizar Usuario</button>
        	</form>
        	<form method="POST" action="" onsubmit="return validarCorreo()">
            	<br><br>
            	<div class="fitem">
            		<label for="new_correo">Nuevo Correo:</label>
            		<input type="email" id="new_correo" name="new_correo" required>
            	</div>
            	<button type="submit" class="upd" name="update2">Actualizar Correo</button>
        	</form>
        	<form method="POST" action="" onsubmit="return validarContrasena()">
            	<br>
            	<div class="fitem">
            		<label for="new_password">Nueva Contraseña:</label>
            		<input type="password" id="new_password" name="new_password" minlength="8" maxlength="50" required>
            	</div>
            	<button type="submit" class="upd" name="update3">Actualizar Contraseña</button>
        	</form>
    	</div>
    	<div class="fcont">
        	<form method="POST" action="user.php" onsubmit="return confirmarEli()">
            	<h3 style="color: red;">Eliminar Cuenta</h3>
            	<button type="submit" class="eli" name="delete">Eliminar Usuario</button>
        	</form>
    	</div>
		<img style="display: block; margin-left: auto; margin-right: auto;" src="img/bmo.gif" alt="BMO bailando de felicidad">
	</div>	
</body>
<!-- ***Realizado por HTCA***-->
</html>