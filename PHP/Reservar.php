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

            if($params->hinicio < "05:00" || $params->hfinal < "05:00" || $params->hfinal > "23:00"){
                $datos = 3;
            }
            else{
                if($params->hfinal < $params->hinicio){
                    $datos = 4;
                }
                else{
                    $iniciofinal = $params->finicio." ".$params->hinicio;
                    $final = $params->finicio." ".$params->hfinal;

                    $horaInicio = new datetime($params->hinicio);
                    $horaTermino = new datetime($params->hfinal);

                    $interval = $horaInicio->diff($horaTermino);
                    if($interval->i > 0){
                        $calculo += ($params->tarifa*($interval->h+1));
                    }
                    else{
                        $calculo += ($params->tarifa*$interval->h);
                    }

                    $lugar = getLugares($iniciofinal,$final,$conexion);

                    if($registros = mysqli_query($conexion, "INSERT INTO `reservacion`(`FechaInicio`,`FechaFinal`,`Monto`,`IdSocio`,`idestacionamientosocio`) 
                    VALUES('$iniciofinal','$final','$calculo','$params->socio','$lugar[0]')"))  {
                        $datos = true;
                    }else{
                        $datos = false;
                    }
                }
            }
        
        echo $datos;
    }

    function getLugares($inicio,$fin,$conect){
        $espacios = [];
        $test = [];
        $place = 0;
        $query = "SELECT idestacionamientosocio FROM reservacion where fechafinal between '$inicio' AND '$fin'";
        $registros = mysqli_query($conect,$query);
        while($res = mysqli_fetch_array($registros)){
            $espacios[] = $res;
        }
        $query = "SELECT idestacionamientosocio FROM reservacion where fechainicio between '$inicio' AND '$fin'";
        $registros = mysqli_query($conect,$query);
        while($res = mysqli_fetch_array($registros)){
            $espacios[] = $res;
        }
        $query = "SELECT idestacionamientosocio FROM reservacion where '$inicio' between fechainicio AND fechafinal";
        $registros = mysqli_query($conect,$query);
        while($res = mysqli_fetch_array($registros)){
            $espacios[] = $res;
        }
        $query = "SELECT idestacionamientosocio FROM reservacion where '$fin' between fechainicio AND fechafinal";
        $registros = mysqli_query($conect,$query);
        while($res = mysqli_fetch_array($registros)){
            $espacios[] = $res;
        }
        $query = "SELECT idestacionamientosocio from estacionamientosocio";
        $registros = mysqli_query($conect,$query);
        while($res = mysqli_fetch_array($registros)){
            $test[] = $res;
        }
        for($i=0;$i<sizeof($test)-1;$i++){
            if(!in_array($test[$i],$espacios)){
                $place = $test[$i];
                break;
            }
        }

        return $place;
    }
?>