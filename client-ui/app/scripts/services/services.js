angular.module('web-push-client')
    .constant("firebaseDomain","https://poc-web-push.firebaseio.com")
    .service('firebaseService',['$http','firebaseDomain',function($http,firebaseDomain){
        
        var organizations = ['Acme Corporation','Globex Corporation','Soylent Corp','Initech','Umbrella Corporation','Massive Dynamic'];
        var countries = ['UK','Ireland','Germany','France','Spain','Italy'];
        
        this.registerSubscription = function (userName,pushServiceId) {
            var random = Math.floor(Math.random() * 6);
            var organizationName = organizations[random];
            var organizationType = "Dealer";
            var countryIso = countries[random];
            var postData = {
                pushServiceId:pushServiceId,
                userName:userName,
                organizationName:organizationName,
                organizationType:organizationType,
                countryIso:countryIso
            };
            var firebaseAddRegistryURL = firebaseDomain + '/subscribers.json';
            return $http.post(firebaseAddRegistryURL,postData);
        };

        this.removeRegistry = function (registryId){
            var firebaseRemoveRegistryURL = firebaseDomain + '/subscribers/' + registryId + '.json';
            return $http.delete(firebaseRemoveRegistryURL);
        }
    }])


;
