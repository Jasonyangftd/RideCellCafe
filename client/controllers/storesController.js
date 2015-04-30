'use strict';

angular.module('order.stores', ['firebase'])

.controller('StoresController', function($scope, $firebaseObject, $timeout){

  var ref = new Firebase('https://berkeleycafemenu.firebaseio.com/Orders');
  ref.once('value', function(orderSnapshot) {
    $scope.orders = orderSnapshot.val();
  });

  $timeout(function(){
    console.log($scope.orders)
  }, 1000)

  $scope.readyOrder = function(orderID){
    var orderRef = ref.child(orderID);
    var orderReadyRef = orderRef.child('ready');
    orderReadyRef.set('This order is ready for Pick-Up')
    $scope.orders[orderID].ready = 'This order is ready for Pick-Up';
  }  

  $scope.notReadyOrder = function(orderID){
    var orderRef = ref.child(orderID);
    var orderReadyRef = orderRef.child('ready');
    orderReadyRef.set('This order is not ready yet')
    $scope.orders[orderID].ready = 'This order is not ready yet';
  }  

  $scope.completeOrder = function(orderID){
    var r = confirm("Please Comfirm this Order is Completed! Once Click 'OK', this Order will be Removed From Database!")
    if (r == true) {
      delete $scope.orders[orderID];
      ref.set($scope.orders);
      alert('This Order Have Been Removed From Database!')
    } else {

    }
  }
})