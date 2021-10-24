<?php

    function make_json($array){
        $json_string = 
            "{" .
                "\"x\":\"" . (string)$array[0] . "\"," .
                "\"y\":\"" . (string)$array[1] . "\"," .
                "\"R\":\"" . (string)$array[2] . "\"," .
                "\"res\":\"" . $array[3] . "\"," .
                "\"current_time\":\"" . (string)$array[4] . "\"," .
                "\"working_time\":\"" . (string)$array[5] . "\"," .
                "\"correct\":\"" . $array[6] . "\"" .
            "}";
        return $json_string;
    }

    $time_enter = microtime(true);

    $x = $_GET['x'];
    $x = substr($x, 0, 9);
    $y = $_GET['y'];
    $y = substr($y, 0, 9);
    $R = $_GET['R'];
    $R = substr($R, 0, 9);
    if (!(($x < 5 && $x >-3)
        && ($y == -5 || $y == -4 || $y == -3
        || $y == -2 || $y == -1 || $y == 0
        || $y == 1 || $y == 2 || $y == 3)
        && ($R == 1 || $R == 1.5 || $R == 2 || $R == 2.5
        || $R == 3))){
            $server_answer = make_json(array(
                0, 0, 0, 0, 0, 0, "false"
            ));
            echo $server_answer;
    }
    else{
        if (($x <= 0 && $y <=0 && $x >= -$R && $y >= -$R)
            || ($x <= 0 && $y >= 0 && $x * $x + $y * $y <= ($R/2)*($R/2))
            || ($x >= 0 && $y <= -2*$x + $R)){
                $res = "Попадает";
        }
        else $res = "Не попадает";

        date_default_timezone_set('Europe/Moscow');
        $current_time = date('h:i:s a', time());
        $working_time = (10**6 * (microtime(true) - $time_enter));

        $server_answer = make_json(array(
            $x, $y, $R, $res, $current_time, $working_time, "true"
        ));

        echo $server_answer;
    }
        
?>