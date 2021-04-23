<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    date_default_timezone_set('America/Mexico_City');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require("ConexionBD.php");
    $conexion = conexion();

    if($params!=null){
        $query = "SELECT DATE(fechainicio), idestacionamientosocio FROM reservacion WHERE idreservacion = '$params->idreserv' AND idsocio = '$params->socio'";
        $res = mysqli_query($conexion,$query);
        $id = mysqli_fetch_array($res);
        $today = date("Y-m-d");
        if($id[0] != $today){
            $datos = 0;
        }
        else{
            $query = "UPDATE estacionamientosocio SET estatus = 'Ocupado' WHERE idestacionamientosocio = '$id[1]'";
            if(mysqli_query($conexion,$query)){
                $datos=1;
            }
        }
        echo $datos;
    }

?>