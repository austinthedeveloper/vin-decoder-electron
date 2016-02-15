angular.module('edmundsApi', []);
angular.module('edmundsApi')
  .factory('edmundsService',['$http', '$q', function($http, $q) {
    var key = 'hn664f735npsqazb36yeztpw',
      edmundUrl = 'https://api.edmunds.com/api/vehicle/v2/',
      mediaUrl = 'https://api.edmunds.com/api/media/v2/',
      type = '',
      params = {
        fmt: "json",
        api_key: key
      };

    return {
      get: function(vin) {
        type = 'vins';

        var delay = $q.defer();
        $http.get(edmundUrl + type + '/' + vin, {
            cache: true,
            params: params
          })
          .success(function(data) {
            delay.resolve(data);
          })
          .error(function(data) {
            delay.reject(data);
          });

        return delay.promise;
      },
      getShortVin: function(vin) {
        type = 'squishvins';
        var shortenedVin = shortenVin(vin);

        var delay = $q.defer();
        $http.get(edmundUrl + type + '/' + shortenedVin, {params: params})
          .success(function(data) {
            delay.resolve(data);
          });

        return delay.promise;
      },
      getPicture: function(make, model, year) {
        var delay = $q.defer();
        params.make = make || null;
        params.model = model || null;
        params.year = year || null;
        
        $http.get(mediaUrl + make + '/' + model + '/' + year + '/photos', {params: params})
          .success(function(data) {
            delay.resolve(data);
          });

        return delay.promise;
      },
      getMakes: function(year) {
        type = 'makes';
        params.year = year || null;

        var delay = $q.defer();
        $http.get(edmundUrl + type, {
            cache: true,
            params: params
          })
          .success(function(data) {
            delay.resolve(data);
          });

        return delay.promise;
      },
      getModels: function(make, year) {
        if (!make) {
          return;
        }
        type = 'models';
        params.year = year || null;

        var delay = $q.defer();
        $http.get(edmundUrl + make + '/' + type, {
            cache: true,
            params: params
          })
          .success(function(data) {
            delay.resolve(data);
          });

        return delay.promise;
      }
    };

    function shortenVin(vin) {
      var vinSquished = '';

      for (var i = 0; i < vin.length; i++) {
        if (i <= 10 && i !== 8) {
          vinSquished += vin.charAt(i);
        }
      }
      return vinSquished;
    }
  }]);