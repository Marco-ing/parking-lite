<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    date_default_timezone_set('America/Mexico_City');
    
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require("ConexionBD.php");
    $conexion = conexion();
    $calculo = 0;

    if($params!= null){
        $today = getdate();
        $newfecha = substr($params->finicio,-2);

        if($newfecha < $today["mday"]){
            $datos = 2;
        }
        else{
            if($params->hinicio < "05:00" || $params->hfinal < "05:00" || $params->hfinal > "23:00"){
                $datos = 3;
            }
            else{
                if($params->hfinal < $params->hinicio){
                    $datos = 4;
                }
                else{
                    $iniciofinal = $params->finicio." ".$params->hinicio;
                    $final = $params->ffinal." ".$params->hfinal;

                    $fechainicio = new datetime($params->finicio);
                    $fechafinal = new datetime($params->ffinal);
                    $intevalofechas = $fechafinal->diff($fechainicio);

                    if($intevalofechas->d > 0){
                        $calculo = (24*15*$intevalofechas->d);
                    }

                    $horaInicio = new datetime($params->hinicio);
                    $horaTermino = new datetime($params->hfinal);

                    $interval = $horaInicio->diff($horaTermino);
                    if($interval->i > 0){
                        $calculo += (15*($interval->h+1));
                    }
                    else{
                        $calculo += (15*$interval->h);
                    }

                    $registros = mysqli_query($conexion, "INSERT INTO `reservacion`(`FechaInicio`,`FechaFinal`,`Monto`,`IdSocio`) 
                    VALUES('$iniciofinal','$final','$calculo','$params->socio' )");  
                    
                    $datos = true;
                }
            }
        }

        
        /*$intevalofechas = $fechafinal->diff($fechainicio);

        if($intevalofechas->d > 0){
            $calculo = (24*25*$intevalofechas->d);
        }

        $horaInicio = new datetime($params->hinicio);
        $horaTermino = new datetime($params->hfinal);

        $interval = $horaInicio->diff($horaTermino);
        if($interval->i > 0){
            $calculo += (25*($interval->h+1));
        }
        else{
            $calculo += (25*$interval->h);
        }

        $registros = mysqli_query($conexion, "INSERT INTO `reservacion`(`FechaInicio`,`FechaFinal`,`Monto`,`IdSocio`) 
        VALUES('$iniciofinal','$final','$calculo','$params->socio' )");  
        
        $datos = true;*/

        echo $datos;
    }
?>