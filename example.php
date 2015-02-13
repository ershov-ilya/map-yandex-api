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
?>
<!DOCTYPE html>
<html class="desktop portrait">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="css/style.css" type="text/css">
</head>

<body oncopy="return false">

<div class="yaMap" id="yaMap1"></div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="//api-maps.yandex.ru/2.0/?load=package.standard,package.geoObjects,package.clusters&lang=ru-RU" type="text/javascript"></script>
<script src="scripts/app.js" type="text/javascript"></script>

<script type="text/javascript">
    var options = {
//        url: 'index.php',
        id: 550
    };
    MAPCONTROLLER.set(options);
    ymaps.ready(MAPCONTROLLER.init);
</script>
</body>
</html>