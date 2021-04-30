<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("ConexionBD.php");
    $conexion = conexion();
    $membresia=mysqli_query($conexion,"SELECT * FROM Membresia");
    $datos=array();
    while($row=$membresia->fetch_assoc()){
        $datos[]=$row;
    }
    $final = json_encode($datos);
    echo $final;
?>