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

if(isset($_GET['t'])) define('DEBUG', true);
defined('DEBUG') or define('DEBUG', false);
defined('CACHE_ENABLE') or define('CACHE_ENABLE', false);
defined('CACHE_PATH') or define('CACHE_PATH', 'cache/');
defined('CACHE_TIME') or define('CACHE_TIME', 60);

header('Content-Type: application/json; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');
error_reporting(E_ALL);
ini_set("display_errors", 1);

define('MODX_API_MODE', true);
require_once('../../../index.php');
require_once("functions.php");

// Приём параметров
$id=0;
if(isset($_REQUEST['id'])) $id=preg_replace('/[^0-9]/','',$_REQUEST['id']);
$depth = -1;
if(isset($_REQUEST['depth'])) $depth=preg_replace('/[^0-9\-]/','',$_REQUEST['depth']);

// Проверка кэша
if(CACHE_ENABLE) {
    $cache_filename = CACHE_PATH . "id$id" . "_dep$depth" . ".cache.json";
    $cache = checkCache($cache_filename, CACHE_TIME);
    if (!empty($cache['content'])) {
        print $cache['content'];
        exit(0);
    }
}

/* @var modX $modx */
/* @var modResource $resource */
if(empty($id)) {print "[]"; exit(0); }
$resource = $modx->getObject('modResource', $id);
if($resource==NULL) { die("[]"); }

$data=recurse($resource, $depth);

// Подготовка массива с названием услуг
$services=getServicesArray(556);


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

        // Подстановка названия услуги
        if($key=='service'){
            //$arrServs = explode(',', $val);
            if(gettype($val) == 'string') $val=$services[$val];
            if(gettype($val) == 'array') {
                $multiple_services_array= array();
                foreach($val as $servEl){
                    $multiple_services_array[]=$services[$servEl];
                }
                $val=implode(', ', $multiple_services_array);
            }
        }

        $val=preg_replace('/"/','\"',$val);
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

// Cache save
if(CACHE_ENABLE) {
    file_put_contents($cache_filename, $response_json);
}

print $response_json;

/*
{
"<a href =\"portfolio/industry/construction-material-production/volsk-cement/\">Реконструкция и модернизация цементного завода ОАО &quot;Вольскцемент&quot;</a>" : "Саратовская область, г. Вольск, ул. Цементников, д. 1",
"<a href =\"portfolio/commercial-estate/hotel-complexes/volgskaya-rivera/\">Гостиница &quot;Волжская Ривьера&quot;</a>" : "г. Углич, Успенская площадь, д. 8.",
"<a href =\"portfolio/commercial-estate/hotel-complexes/hampton-by-hilton-volgograd/\">Гостиница HAMPTON BY HILTON VOLGOGRAD</a>" : "г. Волгоград , Центральный р-он, ул. им. Рокоссовского, вл. 51"
}
*/

