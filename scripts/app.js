/**
 * Created by PhpStorm.
 * Author:   ershov-ilya
 * GitHub:   https://github.com/ershov-ilya/
 * About me: http://about.me/ershov.ilya (EN)
 * Website:  http://ershov.pw/ (RU)
 * Date: 12.02.2015
 * Time: 15:43
 */

var MAPCONTROLLER = (function(){
    // Private methods and data
    var dataArr={};

    var config = {
        domElementID: 'yaMap1',
        url: '/api/yandex-map/',
        options:     {
            center: [54.957877, 61.184048],
            zoom: 3.8,
            behaviors: ['default', 'scrollZoom']
        }
    };

    function process() {
        var myMap = new ymaps.Map(config.domElementID, config.options);
        var myMultiGeocoder = new MultiGeocoder({ boundedBy: myMap.getBounds() });
        var i = 0;
        $.each(dataArr, function(item, value) {
            var address = value;
            var ttl = item;

            // fixedby Pavel. Проблема: дубликаты адресов. Решено ограничением вывода найденных адресов в 1 единицу.

            //var myGeocoder = ymaps.geocode(address); тут геокодер находил несколько адресов,
            //которые прокручивал в res.geoObjects, потому было несколько меток на карте с одним и тем же адресом.

            var myGeocoder = ymaps.geocode(address,{ results : 1 });

            // endoffix;


            myGeocoder.then(
                function (res) {
                    res.geoObjects.each(function (geoObject) {
                        var data = geoObject.properties.getAll();
                        geoObject.properties.set('balloonContentHeader', ttl );
                        geoObject.properties.set('balloonContentBody', '<p>' + address + '</p>' );
                        geoObject.options.set('iconImageHref','/images/marker.png');
                    });
                    // Переменная с описанием двух видов иконок кластеров.
                    var clusterIcons = [
                        {
                            href: '/images/clu_small.png',
                            size: [40, 40],
                            // Отступ, чтобы центр картинки совпадал с центром кластера.
                            offset: [-20, -20]
                        },
                        {
                            href: '/images/clu.png',
                            size: [60, 60],
                            offset: [-30, -30]
                        }];
                    // При размере кластера до 100 будет использована картинка 'small.jpg'.
                    // При размере кластера больше 100 будет использована 'big.png'.
                    clusterNumbers = [10];
                    // Сделаем макет содержимого иконки кластера,
                    // в котором цифры будут раскрашены в белый цвет.
                    MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #e41e13; font-weight: bold;">$[properties.geoObjects.length]</div>');
                    var clusterer = new ymaps.Clusterer({
                        // Если опции для кластеров задаются через кластеризатор,
                        // необходимо указывать их с префиксами "cluster".
                        clusterIcons: clusterIcons,
                        clusterNumbers: clusterNumbers,
                        clusterIconContentLayout: MyIconContentLayout
                    });
                    res.geoObjects.each(function (geoObject) {
                        clusterer.add(geoObject);
                    });
                    myMap.geoObjects.add(clusterer);
                    //myMap.setBounds(myMap.geoObjects.getBounds());
                },
                function (err) {
                    alert(err);
                }
            );

        });
    }

    function MultiGeocoder(options) {
        this._options = options || {};
    }

    MultiGeocoder.prototype.geocode = function (requests, options) {
        var self = this,
            opts = ymaps.util.extend({}, self._options, options),
            size = requests.length,
            promise = new ymaps.util.Promise(),
            result = [],
            geoObjects = new ymaps.GeoObjectArray();

        requests.forEach(function (request, index) {
            ymaps.geocode(request, opts).then(
                function (response) {
                    var geoObject = response.geoObjects.get(0);
                    geoObject && (result[index] = geoObject);
                    --size || (result.forEach(geoObjects.add, geoObjects), promise.resolve({ geoObjects: geoObjects }));
                },
                function (err) {
                    promise.reject(err);
                }
            );
        });
        return promise;
    };

    var PUBLIC = {
        // Entry point
        init: function(){
            console.log('MAPCONTROLLER.init() start');
            var url = config.url;
            if(config && config.id) url+='?id='+config.id;

            $.getJSON(url, function( data ) {
                dataArr=data;
                //console.log(data);
                process();
            });
        },

        set: function(options){
            config = $.extend(config, options);
            console.log("config:");
            console.log(config);
        }
    };  // var PUBLIC end
    return PUBLIC;
})(); // MAPCONTROLLER end
