<?php

    function make_json($array){
        $json_string = 
            "{" .
                "\"x\":\"" . (string)$array[0] . "\"," .
                "\"y\":\"" . (string)$array[1] . "\"," .
                "\"R\":\"" . (string)$array[2] . "\"," .
                "\"res\":\"" . $array[3] . "\"," .
                "\"current_time\":\"" . (string)$array[4] . "\"," .
                "\"working_time\":\"" . (string)$array[5] . "\"" .
            "}";
        return $json_string;
    }

    $time_enter = microtime(true);

    $x = $_GET['x'];
    $y = $_GET['y'];
    $R = $_GET['R'];

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
        $x, $y, $R, $res, $current_time, $working_time
    ));

    echo $server_answer;
        
?>