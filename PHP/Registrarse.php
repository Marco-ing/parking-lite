<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require("ConexionBD.php");
    $conexion = conexion();
    
    mysqli_query($conexion,"CALL AgregarUsuario('$params->nombre','$params->paterno','$params->materno','$params->password','$params->correo','$params->numeroTarjeta','$params->titularTarjeta')");

    class Result {}

    $respuesta = new Result();

    $respuesta->resultado = 'OK';
    $respuesta->mensaje = 'Cliente registrado';
    
    header('Content-Type: application/json');
    echo json_encode($respuesta);  
?>