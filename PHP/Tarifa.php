<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require("ConexionBD.php");
    $conexion = conexion();

    $tarifa=mysqli_query($conexion,"SELECT TarifaMembresia from Tarifa where idTarifa=1");
    if($tarifa=mysqli_fetch_array($tarifa)){
        $datos[]=$tarifa;
    }
    $final = json_encode($datos);
    echo $final;
?>