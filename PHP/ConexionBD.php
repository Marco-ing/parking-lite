<?php
    global $enlace;
    function conexion(){
        $enlace=mysqli_connect('localhost','root','','parkinglite');
        if(!$enlace){
            echo "Error no se puede conectar a MYSQL.".PHP_EOL;
            echo "Error de depuración: ".mysqli_connect_errno().PHP_EOL;
            echo "Error de depuracion: ".mysqli_connect_error().PHP_EOL;
            exit;
        }
        return $enlace;
    }
?>