<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require("ConexionBD.php");
    $conexion = conexion();
    
    $registros = mysqli_query($conexion, "SELECT * FROM usuario where Correo='$params->email'");    
    if ($resultado = mysqli_fetch_array($registros)) {
        mysqli_free_result($registros);
        $registros=mysqli_query($conexion,"SELECT idusuario,nombre,apaterno,amaterno,correo,contrasenia,numtarjeta,titulartarjeta FROM Usuario inner join Socio on IdUsuario=IdSocio WHERE Correo='$params->email'");
        if($result=mysqli_fetch_array($registros)){
            $datos[] = $result;
            $datos[0]['tipo']="Usuario";
            if($datos[0]['contrasenia']!=$params->password){
                $datos[0]['contrasenia']="";
            }      
        }
        mysqli_free_result($registros);
        $registros=mysqli_query($conexion,"SELECT idusuario,nombre,apaterno,amaterno,correo,contrasenia FROM Usuario inner join Administrador on IdUsuario=IdAdministrador WHERE Correo='$params->email'");
        if($result=mysqli_fetch_array($registros)){
            $datos[] = $result;
            $datos[0]['tipo']="Administrador";
            if($datos[0]['contrasenia']!=$params->password){
                $datos[0]['contrasenia']="";
            }      
        }
    }
    $json = json_encode($datos);

    echo $json;
?>