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

defined('DEBUG') or define('DEBUG', true);
//header('Content-Type: application/json; charset=utf-8');
header('Content-Type: text/plain; charset=utf-8');
error_reporting(E_ALL);
ini_set("display_errors", 1);

define('MODX_API_MODE', true);
require('../../index.php');

$id=550;
if(isset($_REQUEST['id'])) $id=preg_replace('/[^0-9]/','',$_REQUEST['id']);
if(DEBUG) print '$id='.$id."\n";

/* @var modX $modx */
/* @var modResource $resource */
$resource = $modx->getObject('modResource', $id);
$migx = $resource->getTVValue(54);
$data = json_decode($migx);
if(DEBUG) print_r($data);

$response_arr = array();
$i=0;
foreach($data as $el)
{
    $response_arr[$i] = $el->link;
    $i++;
}
if(DEBUG) print_r($response_arr);

/*
{
"<a href =\"portfolio/industry/construction-material-production/volsk-cement/\">Реконструкция и модернизация цементного завода ОАО &quot;Вольскцемент&quot;</a>" : "Саратовская область, г. Вольск, ул. Цементников, д. 1",
"<a href =\"portfolio/commercial-estate/hotel-complexes/volgskaya-rivera/\">Гостиница &quot;Волжская Ривьера&quot;</a>" : "г. Углич, Успенская площадь, д. 8.",
"<a href =\"portfolio/commercial-estate/hotel-complexes/hampton-by-hilton-volgograd/\">Гостиница HAMPTON BY HILTON VOLGOGRAD</a>" : "г. Волгоград , Центральный р-он, ул. им. Рокоссовского, вл. 51"
}
*/
