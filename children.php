<?php
/**
 * Created by PhpStorm.
 * Author:   ershov-ilya
 * GitHub:   https://github.com/ershov-ilya/
 * About me: http://about.me/ershov.ilya (EN)
 * Website:  http://ershov.pw/ (RU)
 * Date: 13.02.2015
 * Time: 13:35
 */


defined('DEBUG') or define('DEBUG', true);
header('Content-Type: application/json; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');
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
$migx=array();
$migx[] = $resource->getTVValue(54);


$children=$resource->getMany('Children');

print "Size of array:";
print sizeof($children);
foreach($children as $child){
    $migx[] = $child->getTVValue(54);
}

print_r($migx);
