var app = angular.module('plnkrApp', ['ngMaterial', 'edmundsApi']);
app
  .controller("DemoController",['edmundsService', function(edmundsService) {
    var vm = this;
    
    vm.form = {};
    vm.form.vin = '';
    vm.vinLookup = function() {
      if (vm.form.vin === undefined) {
        return;
      }
      if (vm.form.vin.length == 17) {
        var vin = vm.form.vin;
        edmundsService.get(vin).then(function(data) {
          vm.data = data;
          var vinInfo = data;
          vm.form = {
          	vinMake : vinInfo.make.name,
            vinModel : vinInfo.model.name,
	        vinYear : vinInfo.years[0].year,
          }          
        });
      }
    };
    
    vm.getMakes = function(year) {
      edmundsService.getMakes(year).then(function(data) {
        vm.makes = data.makes;
        vm.form.model = '';
      });
    };
    vm.getMakes();
    
    vm.getModels = function(make, year){
      edmundsService.getModels(make, year).then(function(data) {
        vm.models = data.models;
      });
    };
    
  }]);