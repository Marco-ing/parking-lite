<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    date_default_timezone_set('America/Mexico_City');
    
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require("ConexionBD.php");
    $conexion = conexion();
    
    if(isset($params)){
        

        $fecha = getdate();
        $insert = $fecha["year"]."-".$fecha["mon"]."-".$fecha["mday"]." ".$fecha["hours"].":".$fecha["minutes"].":".$fecha["seconds"];    
       //mysqli_query($conexion, "UPDATE reservacion SET FechaFinal='$insert' WHERE IdReservacion='$params->idReserva'");
        
        class Result {}

        $respuesta = new Result();

        if(mysqli_query($conexion, "UPDATE reservacion SET FechaFinal='$insert' WHERE IdReservacion='$params->idReserva'")!=null){
            $respuesta->resultado = 'OK';
            $respuesta->mensaje = 'Cliente registrado';
        }else{
            $respuesta->resultado = 'OKNT';
            $respuesta->mensaje = 'Cliente no registrado';
        }
        header('Content-Type: application/json');
        echo json_encode($respuesta);  
    }
?>