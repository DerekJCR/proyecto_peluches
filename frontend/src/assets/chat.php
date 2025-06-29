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
	$coloresRol = [
    	'1' => 'red',
    	'2' => '#125DFF',
	];
	$consulta = "SELECT * FROM chat ORDER BY id ASC";
	$ejecutar = $conn->query($consulta);
	while($fila = $ejecutar->fetch_array()):
		$color = isset($coloresRol[$fila['rol']]) ? $coloresRol[$fila['rol']] : 'black'; 
?>
<div class="datosChat">
	<span style="color: <?php echo $color; ?>;"><?php echo $fila['usuario'];?>: </span>
	<span><?php echo $fila['mensaje'];?></span>
	<span style="float: right;"><?php echo formatearFecha($fila['fecha']);?></span>
</div>
<!-- ***Realizado por HTCA***-->
<?php endwhile; ?>