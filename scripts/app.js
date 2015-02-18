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
        domElementID: 'yaMapHere',
        url: '/api/map-yandex-api/',
        options:     {
            center: [61.000000, 61.184048],
            zoom: 3.8,
            behaviors: ['default', 'scrollZoom']
        }
    };

    function process() {
        // Инициализация карты
        var myMap = new ymaps.Map(config.domElementID, config.options);
        PUBLIC.fix();

        // Перебор каждой точки
        $.each(dataArr, function(item, value) {
            var name    = value['name'] || '';
            var address = value['address'] || '';
            var link    = value['link'] || '';
            var service = value['service'] || '';
            var img     = value['img'] || '';
            if(img) img = '/assets/img/'+img;
            // Формирование хедера балона
            var balloonContentHeader     = '<a href ="'+link+'" class="yandex-map-bubble-link">'+name+'</a>';

            // Формирование контента балона
            var balloonContentBody = '';
            if(img) {
                balloonContentBody += '<a href ="' + link + '">';
                balloonContentBody += '<img src="' + img + '" class="yandex-map-bubble-img force-gray">';
                balloonContentBody += '</a>';
            }
            balloonContentBody += '<div class="yandex-map-bubble-desc">';
            balloonContentBody += address;
            if(service)  balloonContentBody += '<br><small class="yandex-map-bubble-small">Оказанные услуги: '+service+'</small>';
            balloonContentBody += '</div>';


            var myGeocoder = ymaps.geocode(address,{ results : 1 });
            myGeocoder.then(
                function (res) {
                    res.geoObjects.each(function (geoObject) {
                        var data = geoObject.properties.getAll();
                        geoObject.properties.set('balloonContentHeader', balloonContentHeader );
                        geoObject.properties.set('balloonContentBody', balloonContentBody );
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

    var PUBLIC = {
        // Entry point
        init: function(){
            console.log('MAPCONTROLLER.init() start');
            var url = config.url;
            var params = [];
            if(config && config.id) params.push('id='+config.id);
            if(config && config.depth !== undefined) params.push('depth='+config.depth);
            if(params.length>0){
                url += '?' + params.join('&');
            }

            //console.log(url);

            $.getJSON(url, function( data ) {
                dataArr=data;
                //console.log(data);
                process();
            });
        },

        set: function(options){
            config = $.extend(config, options);
            //console.log("config:");
            //console.log(config);
        },

        fix: function(){
            $('.ymaps-copyrights-pane').remove();
        }
    };  // var PUBLIC end
    return PUBLIC;
})(); // MAPCONTROLLER end
