angular.module('webpush')
    .constant("firebaseURL", "https://poc-web-push.firebaseio.com")
    .service('subscribersService', ['$http','$location', 'firebaseURL', function ($http,$location, firebaseURL) {
        this.getSubscribers = function () {
            return $http.get(firebaseURL + "/subscribers.json");
        };

        var baseURL = $location.$$absUrl.split('#')[0];
        console.log("baseURL : " +baseURL );

        this.sendPush = function (pushServiceId){
            var config = {
                headers:
                {
                    'Content-Type': 'application/json'
                }};

            var data = {"pushServiceURL": pushServiceId};

            console.log("data : " + data);
            console.log("config : " + config);

            return $http.post(baseURL + 'messagepush/',data,config);
        };
    }])
;