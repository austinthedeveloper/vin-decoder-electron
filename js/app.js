var app = angular.module('plnkrApp', ['ngMaterial', 'edmundsApi']);
app
  .controller("VINController", require('./controllers/VinController.js'));