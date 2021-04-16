<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require("ConexionBD.php");
    $conexion = conexion();
    
    $registros = mysqli_query($conexion, "SELECT idusuario,nombre,apaterno,amaterno,correo FROM usuario inner join socio on idusuario=idsocio where correo='$params->email' and contrasenia='$params->password'");    
    if ($resultado = mysqli_fetch_array($registros)) {
        $datos[] = $resultado;
    }
    $json = json_encode($datos);

    echo $json;
?>