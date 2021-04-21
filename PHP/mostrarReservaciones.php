<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require("ConexionBD.php");
    $conexion = conexion();

  $query = "SELECT r.IdReservacion, r.FechaInicio, r.FechaFinal, r.Monto, r.IdSocio,r.IdEstacionamientoSocio FROM reservacion as r INNER JOIN socio as s ON r.IdSocio = s.IdSocio WHERE Correo = '$params->correo';";
  $reservaciones = [];
  $registros = mysqli_query($conexion,$query);

  while($res = mysqli_fetch_array($registros)){
    $reservaciones[] = $res;
  }
    $json = json_encode($reservaciones);

    echo $json;
    header('Content-Type: application/json');


?>
