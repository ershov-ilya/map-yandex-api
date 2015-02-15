<?php

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
    if(!empty($migx)) $data = array_merge(json_decode($migx), $data);
    return $data;
}

function getServicesArray($root_id, $field='longtitle'){
    global $modx;
    $root = $modx->getObject('modResource', $root_id);
    $children = $root->getMany('Children');
    $services=array();
    foreach ($children as $child) {
        $id = $child->get('id');
        $title = $child->get($field);
        $services[$id]=$title;
    }
    return $services;
}

function checkCache($cache_filename, $cache_age_limit)
{
    $CACHE=array();
    $CACHE['need_refresh']=false;
    $CACHE['content']='';
    if(is_file($cache_filename))
    {
        $filetime= filemtime($cache_filename);
        $curtime=time();
        $cache_file_age=$curtime-$filetime;
        //print $cache_file_age;
        if($cache_file_age>$cache_age_limit) $CACHE['need_refresh']=true;
    }
    else $CACHE['need_refresh']=true;

    if($CACHE['need_refresh']) return '';
    else
    {
        //print "Read from cache";
        // Read from cache
        $CACHE['content']=file_get_contents($cache_filename);
    }

    // Return decision or cacheContent
    return $CACHE;
}
