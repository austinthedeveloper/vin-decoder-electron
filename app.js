(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Require the edmunds service
require('./edmunds');

var app = angular.module('plnkrApp', ['ngMaterial', 'edmundsApi']);
app
  .controller("VINController", require('./controllers/VinController.js'));
},{"./controllers/VinController.js":2,"./edmunds":3}],2:[function(require,module,exports){
'use strict';

module.exports = ['edmundsService', '$mdConstant', function(edmundsService, $mdConstant) {
    var vm = this;

    vm.vins = [];
    vm.res = [];

    vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, $mdConstant.KEY_CODE.SPACE];

    vm.checkVins = function(vinsArray) {
      if(vinsArray && vinsArray.length) {
        for (var i = 0; i < vinsArray.length; i++) { 
            vinLookup(vinsArray[i]);
        }
      }
      vm.vins = [];
    };

    function vinLookup(vin) {
      if (vin.length == 17) {
        edmundsService.get(vin).then(function(data) {
          var res = {
          	make : data.make.name,
            model : data.model.name,
	          year : data.years[0].year,
            vin: vin.toUpperCase()
          };
          vm.res.push(res);
        },function(err) {
          var res = {
            make : 'VIN not found',
            vin: vin.toUpperCase()
          };
          vm.res.push(res);
        });
      }
    }

    vm.getMakes = function(year) {
      edmundsService.getMakes(year).then(function(data) {
        vm.makes = data.makes;
        vm.form.model = '';
      });
    };
    // vm.getMakes();

    vm.getModels = function(make, year){
      edmundsService.getModels(make, year).then(function(data) {
        vm.models = data.models;
      });
    };

  }];
},{}],3:[function(require,module,exports){
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
},{}]},{},[1]);
