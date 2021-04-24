<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require("ConexionBD.php");
    $conexion = conexion();
    if(isset($params)){
    $fecha=$params->anio."-".$params->mes."-".$params->dia;
    $fechaf=$params->aniof."-".$params->mesf."-".$params->diaf;
    $lugares=array();
    $lugar;
    $membresias=mysqli_query($conexion,"SELECT IdEstacionamientoSocio FROM Membresia WHERE (FechaInicio>='$fecha 00:00:00' and FechaInicio<='$fechaf 23:59:59') or (FechaFinal>='$fecha 00:00:00' and FechaFinal<='$fechaf 23:59:59')");
    while($row=mysqli_fetch_array($membresias)){
        array_push($lugares,$row['IdEstacionamientoSocio']);
    }
    mysqli_free_result($membresias);
    $membresias=mysqli_query($conexion,"SELECT IdEstacionamientoSocio FROM Reservacion WHERE (FechaInicio>='$fecha 00:00:00' and FechaInicio<='$fechaf 23:59:59') or (FechaFinal>='$fecha 00:00:00' and FechaFinal<='$fechaf 23:59:59')");
    while($row=mysqli_fetch_array($membresias)){
        array_push($lugares,$row['IdEstacionamientoSocio']);
    }
    mysqli_free_result($membresias);
    $membresias=mysqli_query($conexion,"SELECT IdEstacionamientoSocio FROM EstacionamientoSocio");
    while($row=mysqli_fetch_array($membresias)){
        if(!in_array($row['IdEstacionamientoSocio'],$lugares)){
            $lugar=$row['IdEstacionamientoSocio'];
        }
    }
    if($lugar>0){
        if(mysqli_query($conexion,"INSERT INTO Membresia(FechaInicio,FechaFinal,Monto,IdSocio,IdEstacionamientoSocio)
        VALUES('$fecha 00:00:00','$fechaf 23:59:59','$params->monto','$params->id','$lugar')")){
            $new=mysqli_query($conexion,"SELECT max(IdMembresia),IdEstacionamientoSocio FROM Membresia");
            if($resultado=mysqli_fetch_array($new)){
                $datos[]=$resultado;
            }
            $json = json_encode($datos);
            echo $json;
        }
        else{
            echo "ERROR ".mysqli_error($conexion);
        }
    }
    else{
        echo false;
    }
    //$registrar=mysqli_query($conexion,"INSERT INTO prueba(fech)VALUE('$fecha')");
    //echo true;
    }
?>