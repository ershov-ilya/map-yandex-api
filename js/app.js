/**
 * Created by PhpStorm.
 * Author:   ershov-ilya
 * GitHub:   https://github.com/ershov-ilya/
 * About me: http://about.me/ershov.ilya (EN)
 * Website:  http://ershov.pw/ (RU)
 * Date: 12.02.2015
 * Time: 15:43
 */

function dump(arr,level) {
    var dumped_text = "";
    if(!level) level = 0;

    //The padding given at the beginning of the line.
    var level_padding = "";
    for(var j=0;j<level+1;j++) level_padding += "    ";

    if(typeof(arr) == 'object') { //Array/Hashes/Objects
        for(var item in arr) {
            var value = arr[item];

            if(typeof(value) == 'object') { //If it is an array,
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += dump(value,level+1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
    } else { //Stings/Chars/Numbers etc.
        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
    }
    return dumped_text;
}

function init() {
    var myMap = new ymaps.Map('yaMap1', {
        center: [54.957877, 61.184048],
        zoom: 3.8,
        behaviors: ['default', 'scrollZoom']
    });
    var myMultiGeocoder = new MultiGeocoder({ boundedBy: myMap.getBounds() });
    var dataArr = { '<a href ="portfolio/industry/construction-material-production/volsk-cement/">Реконструкция и модернизация цементного завода ОАО &quot;Вольскцемент&quot;</a>':'Саратовская область, г. Вольск, ул. Цементников, д. 1','<a href ="portfolio/commercial-estate/hotel-complexes/volgskaya-rivera/">Гостиница &quot;Волжская Ривьера&quot;</a>':'г. Углич, Успенская площадь, д. 8.','<a href ="portfolio/commercial-estate/hotel-complexes/hampton-by-hilton-volgograd/">Гостиница HAMPTON BY HILTON VOLGOGRAD</a>':'г. Волгоград , Центральный р-он, ул. им. Рокоссовского, вл. 51','<a href ="portfolio/commercial-estate/hotel-complexes/hampton-by-hilton-voronezh/">Гостиница HAMPTON BY HILTON VORONEZH</a>':'г. Воронеж, ул. Донбасская, д. 12 Б.','<a href ="portfolio/commercial-estate/entertainment-complexes/rc-russia/">Развлекательный центр &quot;Россия&quot;</a>':'г. Углич, ул. Ольги Берггольц, д. 9а.','<a href ="portfolio/commercial-estate/entertainment-complexes/rk-sozvezdie-razvlechenij/">Развлекательный комплекс &quot;Созвездие развлечений&quot;</a>':'г. Липецк','<a href ="portfolio/commercial-estate/entertainment-complexes/sayany-cinema/">Кинотеатр &quot;Саяны&quot;</a>':'г. Москва, ул. Саянская, дом 9.','<a href ="portfolio/commercial-estate/entertainment-complexes/k/t-ekran/">Кинотеатр &quot;Экран&quot;</a>':'г. Москва','<a href ="portfolio/residential-complexes/rosinka/">«Ангелово–Резиденц»</a>':'Московская область, Красногорский район, поселок Ангелово.','<a href ="portfolio/residential-complexes/peredelkino-blignee/">Жилой комплекс &quot;Переделкино Ближнее&quot;</a>':'Боровское шоссе, 8 км, деревня Рассказовка.','<a href ="portfolio/commercial-estate/office-and-commercial-centers/evolution-tower/">Evolution Tower в составе «Москва-Сити»</a>':'г. Москва, Краснопресненская наб., уч. №2-3','<a href ="portfolio/commercial-estate/office-and-commercial-centers/biznes-centr-domnikov/">Бизнес центр &quot;Домников&quot;</a>':'г. Москва, пр-т Академика Сахарова, д. 30.','<a href ="portfolio/commercial-estate/office-and-commercial-centers/mnogofunkczionalnyij-kompleks-vodnyi/">Многофункциональный комплекс &quot;Водный&quot;</a>':'г. Москва, Головинское шоссе, дом 5','<a href ="portfolio/commercial-estate/office-and-commercial-centers/mnogofunkczionalnyij-kompleks-lotos/">Многофункциональный комплекс &quot;Лотос&quot;</a>':'г. Москва, ул. Одесская, вл. 2.','<a href ="portfolio/commercial-estate/office-and-commercial-centers/ofis-rao-ees/">Офис «ФСК РАО ЕЭС»</a>':'г. Москва, Б.Николоворобинский переулок, д. 9/11 и Тессинский  переулок, вл. 4 (корп. 1-4,4/1,4).','<a href ="portfolio/telekompaniya-ntv/">Телевизионный комплекс для телекомпании &quot;НТВ&quot;</a>':'г. Москва, Новомосковская, владение 18-22.','<a href ="portfolio/commercial-estate/shopping-complexes/tk-mega-teplyi-stan/">&quot;МЕГА Тёплый Стан&quot;</a>':'Московская область, Ленинский район, Калужское шоссе, 21-й километр.','<a href ="portfolio/commercial-estate/shopping-complexes/avtocentr-siti/">Центр по продаже и обслуживанию автомобилей &quot;Автоцентр сити&quot;</a>':'Московская область, Ленинский район, 23 километр МКАД (внешняя сторона).','<a href ="portfolio/commercial-estate/shopping-complexes/real-hm/">Гипермаркет REAL</a>':'г. Омск.','<a href ="portfolio/commercial-estate/shopping-complexes/trk-okei/">Гипермаркет &quot;О’КЕЙ&quot;</a>':'г. Тюмень, ул. Широтная, д. 199.','<a href ="portfolio/commercial-estate/shopping-complexes/aviapark/">Торгово-выставочный комплекс &quot;Авиапарк&quot;</a>':'г. Москва, Хорошевское шоссе, вл. 38а.','<a href ="portfolio/industry/storage-facilities/belaya-dacha-terminal/">Складской комплекс «БЕЛАЯ ДАЧА ТЕРМИНАЛ»</a>':'Московская область, г. Котельники, 1 Покровский проезд, д. 5.','<a href ="portfolio/commercial-estate/office-and-commercial-centers/ofisnyij-czentr-centrocredit/">Центральное отделение банка &quot;Центрокредит&quot;</a>':'г. Москва','<a href ="portfolio/industry/agriculture-facilities/stroitelstvo-spirtovogo-zavoda/">Спиртовой завод &quot;Русский стандарт&quot;</a>':'г. Буинск.','<a href ="portfolio/industry/electronic-industry/svetovye-tehnologii/">Производственно-логистический комплекс &quot;Световые технологии&quot;</a>':'г. Рязань, Магистральная, д. 11а.','<a href ="portfolio/industry/wood-and-paper-industry/syktyvkar-tisu-grupp/">Завод &quot;Сыктывкар Тиссью Груп&quot;</a>':'Ярославская область, Ростовский район, р.п. Семибратово, ул. Красноборская, д. 9.','<a href ="portfolio/industry/metall-coal-industry/shahtoupravlenie-karagaylinskoye/">Шахтоуправление Карагайлинское</a>':'Кемеровская обл., г. Киселевск, пос. Карагайлинский.','<a href ="portfolio/industry/storage-facilities/industrial-and-warehouse-complex-cooperation/">Производственно-складской комплекс &quot;Сотрудничество&quot;</a>':'г. Москва, поселение Первомайское, деревня Ивановское','<a href ="portfolio/industry/avtodoroga-vneshekonombank/">Автодорога &quot;Кемерово-Хакассия&quot;</a>':'Республика Хакасия, Кемеровская область.','<a href ="portfolio/industry/metall-coal-industry/gok-po-dobyche-margancevyh-rud/">Усинский ГОК по добыче марганцевых руд</a>':'Кемеровская область, 60 км северо-восточнее города Междуреченск, по  берегам реки Усы.','<a href ="portfolio/industry/metall-coal-industry/eniseiskii-ferrosplavnyi-zavod/">Строительство Енисейского ферросплавного завода Внешэкономбанк</a>':'г. Красноярск.','<a href ="portfolio/industry/metall-coal-industry/russkaya-mednaya-kompaniya/">Михеевский ГОК</a>':'Челябинская область, п. Варна.','<a href ="portfolio/industry/construction-material-production/zavod-po-proizvodstvu-gb-izdelii/">Завод по производству железобетонных изделий</a>':'Московская область, Чеховский район, деревня Кузьмино-Фильчаково.','<a href ="portfolio/industry/storage-facilities/psk-riston/">Производственно-складской комплекс RISTON</a>':'Московская область, Ленинский район, дер. Горки, уч. 16/1.','<a href ="portfolio/industry/metall-coal-industry/tominsky-mining/">Томинский горно-обогатительный комбинат</a>':'Сосновский район Челябинской области, в 30 км к юго-востоку от города Челябинск.','<a href ="portfolio/industry/kompleks-mpz/">Пять комплексов по переработке смешанных твердых бытовых отходов</a>':'г.Санкт-Петербург','<a href ="portfolio/commercial-estate/entertainment-complexes/kinoteatr-bumerang/">Кинотеатр &quot;Бумеранг&quot;</a>':'г. Москва, Варшавское шоссе, д. 87Б.','<a href ="portfolio/residential-complexes/giloi-kompleks-fili-grad/">Жилой комплекс &quot;ФИЛИ ГРАД&quot;</a>':'г. Москва, район Филевский парк, Береговой проезд, вл.5.','<a href ="portfolio/commercial-estate/office-and-commercial-centers/osc-russkii-standart/">Офисно-складской центр &quot;Русский стандарт&quot;</a>':'г.Москва, ул.Новоорловская, д.5','<a href ="portfolio/commercial-estate/shopping-complexes/tgk-megellan/">Торгово-гостиничный комплекс &quot;Магеллан&quot;</a>':'г. Тюмень, ул. Максима Горького,д.42','<a href ="portfolio/commercial-estate/office-and-commercial-centers/kantri-park/">Административно-офисный комплекс &quot;Кантри Парк&quot;</a>':'Московская область, г. Химки, ул. Панфилова, д. 19, к. 1.','<a href ="portfolio/commercial-estate/hotel-complexes/hampton-by-hilton/">Гостиница HAMPTON BY HILTON Ulyanovsk </a>':'г. Ульяновск, Красноказарменный пер., д. 8' };
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
