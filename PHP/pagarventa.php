<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json');
    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require("ConexionBD.php");
    $conexion = conexion();

    if($params!=null){
        $query = "UPDATE venta SET FechaFinal = '$params->ffinal', Monto = '$params->monto' WHERE IdVenta = '$params->id'";
        $venta = mysqli_query($conexion,$query);
        if(mysqli_query($conexion,$query)){
            mysqli_query($conexion,"UPDATE estacionamientovisitante SET Estatus = 'Disponible' WHERE idestacionamientovisitante = (SELECT idestacionamientovisitante FROM venta WHERE idventa = '$params->id')");
            $datos = 1;
        }
        echo $datos;
    }
?>