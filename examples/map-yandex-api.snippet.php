<?php
/**
 * Created by PhpStorm.
 * User: ershov-ilya
 * Website: ershov.pw
 * GitHub : https://github.com/ershov-ilya
 * Date: 14.02.2015
 * Time: 15:30
 */

$id=$modx->resource->get('id');
$tv_control = $modx->resource->getTVValue(56);
if($tv_control < -1) return '';

$depth = $tv_control;
$modx->setPlaceholder('map-yandex-api.here','<div class="yaMap" id="yaMapHere"></div>');
$modx->setPlaceholder('map-yandex-api.scripts','
<script src="//api-maps.yandex.ru/2.0/?load=package.standard,package.geoObjects,package.clusters&lang=ru-RU" type="text/javascript"></script>
<script src="/api/map-yandex-api/scripts/app.js" type="text/javascript"></script>
<script type="text/javascript">
    MAPCONTROLLER.set({ id: '.$id.', depth: '.$depth.' });
    ymaps.ready(MAPCONTROLLER.init);
</script>
');
return '';
