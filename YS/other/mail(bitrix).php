<?php
    $name = $_POST['userName'];
    $phone = $_POST['userPhone'];
    // $email = $_POST['email'];


    // формируем URL в переменной $queryUrl
    $queryUrl = 'https://ys-system.bitrix24.ru/rest/1/5enhqnfw9v20l4b2/crm.lead.add.json';
    // формируем параметры для создания лида в переменной $queryData
    $queryData = http_build_query(array(
        'fields' => array(
    'TITLE' => 'Заказ c сайта ys-system.ru',
    'NAME' => $name,
    // 'EMAIL' => Array(
    //        "n0" => Array(
    //            "VALUE" => "$email",
    //            "VALUE_TYPE" => "WORK",
    //        ),
    //    ),
       'PHONE' => Array(
           "n0" => Array(
               "VALUE" => "$phone",
               "VALUE_TYPE" => "WORK",
           ),
       ),
  ),
        'params' => array("REGISTER_SONET_EVENT" => "Y")
    ));
    // обращаемся к Битрикс24 при помощи функции curl_exec
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_POST => 1,
        CURLOPT_HEADER => 0,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $queryUrl,
        CURLOPT_POSTFIELDS => $queryData,
    ));
    $result = curl_exec($curl);
    curl_close($curl);
    $result = json_decode($result, 1);
    if (array_key_exists('error', $result)) echo "Ошибка при сохранении лида: ".$result['error_description'].
    "<br/>";

?>