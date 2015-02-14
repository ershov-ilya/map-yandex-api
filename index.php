<?php
/**
 * Created by PhpStorm.
 * Author:   ershov-ilya
 * GitHub:   https://github.com/ershov-ilya/
 * About me: http://about.me/ershov.ilya (EN)
 * Website:  http://ershov.pw/ (RU)
 * Date: 12.02.2015
 * Time: 13:57
 */

function escape_quotes($str){
    $res = preg_replace('/"/','\"',$str);
    return $res;
}

function replace_quotes($str){
    $res = preg_replace('/"/','&quot;',$str);
    return $res;
}

function recurse($resource, $limit=-1, $level=0){
    $data = array();
    if($limit<0 || $level<$limit) {
        $children = $resource->getMany('Children');
        foreach ($children as $child) {
            $subdata = recurse($child, $limit, $level + 1);
            if (!empty($subdata)) $data = array_merge($data, $subdata);
        }
    }
    $migx = $resource->getTVValue(55);
    $data = array_merge(json_decode($migx), $data);
    return $data;
}

defined('DEBUG') or define('DEBUG', true);
header('Content-Type: application/json; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');
error_reporting(E_ALL);
ini_set("display_errors", 1);

define('MODX_API_MODE', true);
require('../../index.php');

$id=553;
if(isset($_REQUEST['id'])) $id=preg_replace('/[^0-9]/','',$_REQUEST['id']);
//if(DEBUG) print '$id='.$id."\n";

$depth = -1;
if(isset($_REQUEST['depth'])) $depth=preg_replace('/[^0-9\-]/','',$_REQUEST['depth']);


/* @var modX $modx */
/* @var modResource $resource */
$resource = $modx->getObject('modResource', $id);

$data=recurse($resource, $depth);

$i=1;
$size=sizeof($data);
$response_json = "[\n";
foreach($data as $el)
{
    unset($el->MIGX_id);
    $response_json .= "{ ";
    $j=1;
    $j_size=sizeof((array)$el);
    foreach($el as $key => $val){
        $response_json .= "\"$key\" : \"$val\"";
        if($j<$j_size) $response_json .= ", ";
        $j++;
    }
    $response_json .= " }";
    if($i<$size) $response_json .= ",";
    $response_json .= "\n";
    $i++;
}
$response_json .= "]\n\n";
print $response_json;

/*
{
"<a href =\"portfolio/industry/construction-material-production/volsk-cement/\">Реконструкция и модернизация цементного завода ОАО &quot;Вольскцемент&quot;</a>" : "Саратовская область, г. Вольск, ул. Цементников, д. 1",
"<a href =\"portfolio/commercial-estate/hotel-complexes/volgskaya-rivera/\">Гостиница &quot;Волжская Ривьера&quot;</a>" : "г. Углич, Успенская площадь, д. 8.",
"<a href =\"portfolio/commercial-estate/hotel-complexes/hampton-by-hilton-volgograd/\">Гостиница HAMPTON BY HILTON VOLGOGRAD</a>" : "г. Волгоград , Центральный р-он, ул. им. Рокоссовского, вл. 51"
}
*/

