import QtQuick 1.1
import "./restapi.js" as RestApi

Rectangle {
    width: 100
    height: 62
    Component.onCompleted:  {
        RestApi.Core.setup({url: "http://api-trunk.sabirov.dev/restapi", lang: 'ru'})
        RestApi.Core.setUserId("400001000130070790");
        RestApi.Core.setAppKey("5cdf3fe592a21d7d3833489005ff6facedda1c03");

        RestApi.Service.getServices(function(response) {
            console.log(response);
        });
    }
}
