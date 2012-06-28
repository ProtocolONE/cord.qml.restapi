import QtQuick 1.1
import "./restapi.js" as RestApi

Rectangle {
    width: 100
    height: 62
    Component.onCompleted:  {
        RestApi.Service.getServices(function(response) {
            console.log(response);
        });
    }
}
