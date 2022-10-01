// КАРТА
const town1 = document.getElementById('town1'),
      town2 = document.getElementById('town2'),
      town3 = document.getElementById('town3'),
      town4 = document.getElementById('town4'),
      town5 = document.getElementById('town5');
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [56.635429, 43.410765],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 12
    });
    
    town1.addEventListener('click', function(){
        myMap.setCenter([56.635429, 43.410765], 12, {
            checkZoomRange: true
        });
    })
    town2.addEventListener('click', function(){
        myMap.setCenter([56.497261, 43.605494], 13, {
            checkZoomRange: true
        });
    })
    town3.addEventListener('click', function(){
        myMap.setCenter([56.247687, 43.467906], 12, {
            checkZoomRange: true
        });
    })
    town4.addEventListener('click', function(){
        myMap.setCenter([56.326383, 43.986953], 12, {
            checkZoomRange: true
        });
    })
    town5.addEventListener('click', function(){
        myMap.setCenter([56.356471, 44.051788], 13, {
            checkZoomRange: true
        });
    })

    // Создаем геообъект с типом геометрии "Точка".
    myGeoObject = new ymaps.GeoObject({
        // Описание геометрии.
        geometry: {
            type: "Point",
            coordinates: [55.8, 37.8]
        }});

    myMap.geoObjects
            .add(new ymaps.Placemark([56.632126, 43.409498], {
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }
            ))
            .add(new ymaps.Placemark([56.494796, 43.610126], {
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }
            ))
            .add(new ymaps.Placemark([56.255332, 43.466533], {
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }
            ))
            .add(new ymaps.Placemark([56.326193, 43.959563], {
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }
            ))
            .add(new ymaps.Placemark([56.359422, 44.052190], {
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }
            ));
    

}