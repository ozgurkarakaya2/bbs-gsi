angular.module('web-push-client')
    .controller('ClientController', ['$scope', '$window', '$localStorage', 'firebaseService', function ($scope, $window, $localStorage, firebaseService) {

        $scope.login = function (userName) {
            $localStorage.$reset();
            $localStorage.username = userName;
            $window.location.href = 'home.html';
        };

        $scope.getUserName = function () {
            return $localStorage.username;
        };

        $scope.removeAccount = function () {
            $scope.unsubscribe();
            document.getElementById('subscription').disabled = true;
            $localStorage.username = '';
        };
        var reg;
        var sub;
        var pm;

        $scope.checkLogin = function(){
            if(angular.isDefined($localStorage.username) && $localStorage.username){
                $window.location.href = 'home.html';
            }
        };

        $scope.checkSubscribed = function () {
            var result = false;
            if (angular.isDefined($localStorage.isSubscribed)) {
                result = $localStorage.isSubscribed.valueOf() == 'checked'.valueOf();
            }
            return result;
        };

        $scope.initializePushService = function () {
            document.getElementById('subscription').disabled = true;
            if ('serviceWorker' in navigator) {
                console.log('Service Worker is supported');
                navigator.serviceWorker.register('sw.js').then(function () {
                    return navigator.serviceWorker.ready;
                }).then(function (serviceWorkerRegistration) {
                    reg = serviceWorkerRegistration;
                    pm = reg.pushManager;
                    document.getElementById('subscription').disabled = false;
                    console.log('Service Worker is ready :^)', reg);
                }).catch(function (error) {
                    console.log('Service Worker Error :^(', error);
                });
            }
        };

        $scope.initiateSubscription = function(){
            if(angular.isDefined($localStorage.username) && $localStorage.username){
                $scope.subscribe();
            }
        };

        $scope.subscribe = function () {
            console.log("subscription started");
            reg.pushManager.subscribe({userVisibleOnly: true}).then(function (pushSubscription) {
                sub = pushSubscription;
                console.log('Subscribed! Endpoint:', sub.endpoint);
                $localStorage.isSubscribed = 'checked';
                var userName = $localStorage.username;
                firebaseService.registerSubscription(userName, sub.endpoint)
                    .then(
                        function (response) {
                            $localStorage.firebaseregistryid = response.data.name;
                            console.log("Firebase registrationid response : " + response.data.name);
                            console.log("Firebase Service Registration Success");
                        }
                    ).catch(function (error) {
                    console.log("Firebase Service Registration Error", error);
                })
            }).catch(function (error) {
                console.log('Error in subscription', error);
            });
        };

        $scope.unsubscribe = function () {
            console.log("unsubscription started ");
            pm.getSubscription()
                .then(function (response) {
                    subb = response;
                    console.log("response received : " + response);
                    subb.unsubscribe().then(function (event) {
                        console.log('Unsubscribed!', event);
                        $localStorage.isSubscribed = 'unchecked';
                        firebaseService.removeRegistry($localStorage.firebaseregistryid)
                            .then(
                                function (response) {
                                    $localStorage.firebaseregistryid = '0';
                                }
                            ).catch(function (error) {
                            console.log("Firebase Service Remove Registration Error", error);
                        })

                    }).catch(function (error) {
                        console.log('Error unsubscription', error);
                    });
                }).catch(function (error) {
                console.log("error " + error);
            });
        };
    }])

;