<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    date_default_timezone_set('America/Mexico_City');
    
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require("ConexionBD.php");
    $conexion = conexion();

    if($params!= null){
        $iniciofinal = $params->finicio." ".$params->hinicio;
        $final = $params->ffinal." ".$params->hfinal;


        $horaInicio = new datetime($params->hinicio);
        $horaTermino = new datetime($params->hfinal);

        $interval = $horaInicio->diff($horaTermino);
        if($interval->i >0){
            $calculo = 25*($interval->h+1);
        }
        else{
            $calculo = 25*$interval->h;
        }
        
        $registros = mysqli_query($conexion, "INSERT INTO `reservacion`(`FechaInicio`,`FechaFinal`,`Monto`,`IdSocio`) 
        VALUES('$iniciofinal','$final','$calculo','$params->socio' )");  
        
        $datos = true;

        echo $datos;
    }
?>