<?php
/***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***/
	session_start();
	include 'conexion.php';
	if (isset($_SESSION['usuario'])) {
    	$usuario = $_SESSION['usuario'];
    	$sql = "SELECT rol FROM usuarios WHERE usuario = ?";
    	$stmt = $conn->prepare($sql);
    	$stmt->bind_param("s", $usuario);
    	$stmt->execute();
    	$result = $stmt->get_result();
    	if ($result->num_rows > 0) {
        	$row = $result->fetch_assoc();
        	$_SESSION['rol'] = $row['rol'];
    	}
    	$stmt->close();
	}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>The RetroParadise</title>
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">
    <link rel="stylesheet" href="css/text.css">
    <link rel="stylesheet" href="css/div.css">
    <link rel="stylesheet" href="css/form.css">
    <script src="js/botones.js" defer></script>
    <script src="js/listamenu.js" defer></script>
    <script src="js/chat.js" defer></script>
    <script src="js/reproductor.js" defer></script>
</head>
<body onload="ajax();" style="background-image: url('img/fondo.gif'); background-size: cover;">
    <div class="cajamenu">
        <div class="logo">
            <h1>THE RETROPARADISE</h1>
        </div>
        <div class="menu1">
            <button type="button" class="menu" onclick="inicio()">Inicio</button>
        </div>
        <div class="menu2">
            <select>
                <option value="Emu1">Emuladores</option>
                <option value="Emu2">¿Qué Son?</option>
                <option value="NES">NES</option>
                <option value="SNES">SNES</option>
                <option value="GBA">GBA/GBC</option>
                <option value="NDS">NDS</option>
                <option value="N3DS">N3DS</option>
                <option value="PSX">PSX</option>
                <option value="PS2">PS2</option>
            </select>
        </div>
        <div class="menu3">
            <button type="button" class="menu" style="width:150px;" onclick="about()">Acerca De</button>
        </div>
        <div class="menu4">
            <?php if (isset($_SESSION['usuario'])): ?>
                <button type="button" class="menu" style="width:170px;" onclick="logout()">Cerrar Sesión</button>
                <button type="button" class="menu" style="width:220px;" onclick="user()"><?php echo htmlspecialchars($_SESSION['usuario']); ?></button>
            <?php else: ?>
                <button type="button" class="menu" style="width:170px;" onclick="registro()">Registrarse</button>
                <button type="button" class="menu" style="width:180px;" onclick="login()">Iniciar Sesión</button>
            <?php endif; ?>
        </div>
    </div>
    <div class="caja">
        <div class="info">
            <iframe src="inicio.html" height="800" width="800" title="informacion" name="info"></iframe>
        </div>
        <div class="contenedor">
            <div class="caja-chat">
                <div id="chat" class="chat" style="overflow-y: scroll; height: 465px;">    
                </div>
            </div>
            <form id="chatForm" method="POST" onsubmit="enviarMensaje(event)">
            	<?php if (isset($_SESSION['usuario'])): ?>
                	<textarea name="mensaje" placeholder="Escribe tu mensaje..." onkeydown="detectarEnter(event)" maxlength=100></textarea>
                	<button type="submit" name="enviar" class="env">Enviar</button>
                <?php else: ?>
                	<textarea name="mensaje" placeholder="Debes iniciar sesión para poder escribir un mensaje." disabled></textarea>
                	<button type="submit" name="enviar" class="env" disabled>Enviar</button>
                <?php endif; ?>
            </form>
        </div>
        <div class="reproductor" id="reproductorBox">
        	<select class="listacanciones" id = "selectTrack" multiple onchange="cambiarTrack(this.options[this.selectedIndex]);">
				<option value="music/bestfriend.mp3" selected>Lofi - Best Friend 8 Bits</option>
				<option value="music/roller.mp3">TechnoAXE - Roller Derby</option>
				<option value="music/darling.mp3">Lofi - Darling, remember tomorrow</option>
				<option value="music/upinmyjam.mp3">Kubi - Up In My Jam</option>
				<option value="music/thewholeother.mp3">8 Bit Dreamscape - The Whole Other</option>
			</select>
			<audio id="reproductor" controls autoplay>
        		<source src="music/bestfriend.mp3" type="audio/mpeg">
        	</audio>
        </div>          
</body>
<!-- ***Realizado por HTCA***-->
</html>
