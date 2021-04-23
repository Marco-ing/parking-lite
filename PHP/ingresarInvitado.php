<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    date_default_timezone_set('America/Mexico_City');
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require("ConexionBD.php");
    $conexion = conexion();
    
    if($params!=null){
        $result = 0;
        $query = "SELECT idestacionamientovisitante FROM estacionamientovisitante WHERE estatus = 'Disponible'";
        $res = mysqli_query($conexion,$query);
        $lugares = mysqli_fetch_array($res);
        $fecha = getdate();
        $insert = $fecha["year"]."-".$fecha["mon"]."-".$fecha["mday"]." ".$fecha["hours"].":".$fecha["minutes"].":".$fecha["seconds"];    
        $query = "INSERT INTO venta(fechainicio, idestacionamientovisitante) VALUES('$insert','$lugares[0]')";
        if(mysqli_query($conexion,$query)){
            $result = mysqli_insert_id($conexion);
            mysqli_query($conexion,"UPDATE estacionamientovisitante SET Estatus = 'Ocupado' WHERE idestacionamientovisitante = '$lugares[0]'");
            
        }
        $json = json_encode(array("lugar"=>$lugares[0], "resultado"=>$result));
        echo $json;

    }
?>