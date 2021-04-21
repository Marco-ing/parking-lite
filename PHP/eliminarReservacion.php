<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require("ConexionBD.php");
    $conexion = conexion();

  $query = "DELETE FROM reservacion WHERE IdReservacion = $params->id_reservacion;";
  $query2 = "UPDATE estacionamientosocio set Estatus='Disponible' where IdEstacionamientoSocio = $params->id_estacionamiento;";




  $result = mysqli_query($conexion,$query);
  $result2 = mysqli_query($conexion,$query2);

  if(!$result && !$result2)
  {
    $json_response = ['response' => '-1'];
  }
  $json_response = ['response' => '1'];
  $json = json_encode($json_response);

  echo $json;










?>
