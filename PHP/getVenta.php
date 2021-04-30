<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json');
    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require("ConexionBD.php");
    $conexion = conexion();

    if($params!=null){
        $query = "SELECT TIME(FechaInicio) FROM venta WHERE IdVenta = '$params'";
        $venta = mysqli_query($conexion,$query);
        if ($venta->num_rows == 0){
            $datos[] = 0;
        }
        else{
            if($venta=mysqli_fetch_array($venta)){
                $datos = $venta;
            }
        }
        $json = json_encode($datos[0]);
        echo $json;
    }
?>