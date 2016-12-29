angular.module('webpush')
    .controller('SubscribersController', ['$scope', 'subscribersService', function ($scope, subscribersService) {
        $scope.pnSubscribers = [];
        $scope.selectedSubscriber = {};
        $scope.errorMessage = false;
        $scope.loading = false;

        $scope.getSubscribers = function () {
            $scope.loading = true;
            subscribersService.getSubscribers()
                .then(
                    function (response) {
                        // console.log("test response : "+JSON.stringify(response));
                        // console.log("test response.data : " + JSON.stringify(response.data));
                        $scope.pnSubscribers = response.data;
                        $scope.errorMessage = false;
                        $scope.loading = false;
                    }
                ).catch(function (data) {
                $scope.pnSubscribers = [];
                $scope.errorMessage = true;
                $scope.loading = false;
            });
        };

        $scope.sendPushNotification = function(pushServiceId){
            subscribersService.sendPush(pushServiceId)
                .then(function(response){
                    console.log("send push response : " + JSON.stringify(response));
                }
                ).catch(function(){
                console.log("send push error");
            });
        };

        $scope.setSelectedSubscriber = function(subscriber){
            $scope.selectedSubscriber = subscriber;
            console.log("selected Subscriber = " + JSON.stringify($scope.selectedSubscriber));
        };

    }])

;