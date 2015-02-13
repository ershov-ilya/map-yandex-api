<?php
/**
 * Created by PhpStorm.
 * Author:   ershov-ilya
 * GitHub:   https://github.com/ershov-ilya/
 * About me: http://about.me/ershov.ilya (EN)
 * Website:  http://ershov.pw/ (RU)
 * Date: 13.02.2015
 * Time: 15:25
 */

function escape_quotes($str){
    $res = preg_replace('/"/','\"',$str);
    return $res;
}

function replace_quotes($str){
    $res = preg_replace('/"/','&quot;',$str);
    return $res;
}

defined('DEBUG') or define('DEBUG', false);
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set("display_errors", 1);

define('MODX_API_MODE', true);
require('../../../index.php');

$id=550;
if(isset($_REQUEST['id'])) $id=preg_replace('/[^0-9]/','',$_REQUEST['id']);
if(DEBUG) print '$id='.$id."\n";

/* @var modX $modx */
/* @var modResource $resource */
$resource = $modx->getObject('modResource', $id);
$migx = $resource->getTVValue(54);
$data = json_decode($migx);

// Сбор точек из вложенных
$children=$resource->getMany('Children');
foreach($children as $child){
    //$migx[] = $child->getTVValue(54);
    $migx = $child->getTVValue(54);
    $data = array_merge($data, json_decode($migx));
}
if(DEBUG) print_r($data);

$response_arr = array();
$i=0;
foreach($data as $el)
{
    $response_arr[$i] = array();
    $value = $el->address;

    $index='';
    if(!empty($el->link)) $index.='<a href="'.$el->link.'">';
    $index.=replace_quotes($el->name);
    if(!empty($el->link)) $index.='</a>';

    $response_arr[$i]['index'] = $index;
    $response_arr[$i]['value'] = $value;
//    $el->link;
    $i++;
}
if(DEBUG) print_r($response_arr);

$i=0;
$size=sizeof($response_arr);
$response_json = "{\n";
foreach($response_arr as $el)
{
    $i++;
    $response_json .= '"'.escape_quotes($el['index']).'"';
    $response_json .= ' : ';
    $response_json .= '"'.escape_quotes($el['value']).'"';
    if($i<$size) $response_json .= ",\n";
}
$response_json .= "\n}\n\n";
print $response_json;