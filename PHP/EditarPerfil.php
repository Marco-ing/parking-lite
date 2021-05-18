<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require("ConexionBD.php");
    $conexion = conexion();
    
    if(isset($params)){
        mysqli_query($conexion,"UPDATE usuario AS us 
                                INNER JOIN socio AS so 
                                ON us.IdUsuario=so.IdSocio 
                                SET us.Apaterno='$params->paterno',us.Amaterno='$params->materno',us.Nombre='$params->nombre', so.NumTarjeta='$params->numeroTarjeta',so.TitularTarjeta='$params->titularTarjeta'
                                WHERE us.Correo='$params->correo'");
        class Result {}

        $respuesta = new Result();

        $respuesta->resultado = 'OK';
        $respuesta->mensaje = 'Información actualizada';
        
        header('Content-Type: application/json');
        echo json_encode($respuesta);  
    }
?>