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