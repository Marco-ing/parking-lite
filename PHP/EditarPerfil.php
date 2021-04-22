<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require("ConexionBD.php");
    $conexion = conexion();
    
    if(isset($params)){
        mysqli_query($conexion,"");

        class Result {}

        $respuesta = new Result();

        $respuesta->resultado = 'OK';
        $respuesta->mensaje = 'Cliente registrado';
        
        header('Content-Type: application/json');
        echo json_encode($respuesta);  
    }
?>