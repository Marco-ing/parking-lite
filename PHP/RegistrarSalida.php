<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    date_default_timezone_set('America/Mexico_City');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require("ConexionBD.php");
    $conexion = conexion();

    if($params!=null){
        $query = "SELECT DATE(fechainicio) as FechaInicio, TIME(fechainicio) as HoraInicio, TIME (fechafinal) AS HoraFin FROM reservacion WHERE idReservacion = '$params->idReserva'";
        $res = mysqli_query($conexion,$query);
        if ($res->num_rows == 0){
            $datos = 2;
        }
        else{
            if($id = mysqli_fetch_array($res)){
                $today = date("Y-m-d");
                if($id['FechaInicio'] != $today){
                    $datos = 0;
                }
                else{
                    if($id['HoraFin']>$id['HoraInicio'] && $id['HoraFin']!="00:00:00" ){
                        $datos = 3;
                    }
                    else{
                        $fecha = getdate();
                        $insert = $fecha["year"]."-".$fecha["mon"]."-".$fecha["mday"]." ".$fecha["hours"].":".$fecha["minutes"].":".$fecha["seconds"];
                        $query = "UPDATE reservacion SET FechaFinal='$insert' WHERE IdReservacion='$params->idReserva'";
                        if(mysqli_query($conexion,$query)){
                            $datos = 1;
                        }
                    }
                }
            }
        }
        
        echo $datos;
    }
    $conexion->close();

?>