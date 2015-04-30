'use strict';

angular.module('order.orders', ['firebase'])

.controller('OrdersController', function ($scope, $firebaseObject, $timeout) {

  var ref = new Firebase('https://berkeleycafemenu.firebaseio.com/Orders');
  ref.once('value', function(orderSnapshot) {
    $scope.orders = orderSnapshot.val();
  });
  $timeout(function(){
    console.log($scope.orders)
  },1000)

  $scope.checkOrder = function(){
    $scope.customerOrder = [];
    var customerName = document.getElementById('nameLookUp').value;
    if (customerName.length > 1){
      for (var key in $scope.orders){
        if (key.slice(0, customerName.length) === customerName){
          $scope.customerOrder.push($scope.orders[key]);
        }
      }
    }
  }

})