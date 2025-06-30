<?php
/***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***/
	session_start();
	session_unset();
	session_destroy();
	header("Location: index.php");
	exit();
/***Realizado por HTCA***/
?>