<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("ConexionBD.php");
    $conexion = conexion();
    $reservacion=mysqli_query($conexion,"SELECT * FROM Reservacion");
    $datos=array();
    while($row=$reservacion->fetch_assoc()){
        $datos[]=$row;
    }
    $final = json_encode($datos);
    echo $final;
?>