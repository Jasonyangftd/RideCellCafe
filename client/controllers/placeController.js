'use strict';

angular.module('order.place', ['firebase'])

.controller('PlaceController', function($scope, $firebaseObject, $timeout){
  
  var ref = new Firebase('https://berkeleycafemenu.firebaseio.com/Orders');
  ref.once('value', function(orderSnapshot) {
    $scope.orders = orderSnapshot.val();
  });

  $timeout(function(){
    // console.log($scope.orders)
  },1000)

  $scope.panda = true;
  $scope.thai = true;
  $scope.burger = true;
  $scope.taco = true;

  $scope.itemStorage = {

    A1 : { name : 'Beef Taco', price : 2.49, store : 'Best Taco'},
    A2 : { name : 'Fish Taco', price : 2.99, store : 'Best Taco'},
    A3 : { name : 'Best Taco', price : 3.49, store : 'Best Taco'},
    A4 : { name : 'Shirmp Taco', price : 2.99, store : 'Best Taco'},

    B1 : { name : 'Beef Rice', price : 7.99, store : 'Kong Fu Panda'},
    B2 : { name : 'Fish Rice', price : 8.99, store : 'Kong Fu Panda'},
    B3 : { name : 'Chicken Rice', price : 6.99, store : 'Kong Fu Panda'},
    B4 : { name : 'Spicy Noodle', price : 7.99, store : 'Kong Fu Panda'},

    C1 : { name : 'Grill Chicken', price : 8.99, store : 'Lucky Thai'},
    C2 : { name : 'Lucky Noodle', price : 9.49, store : 'Lucky Thai'},
    C3 : { name : 'Shirmp Rice', price : 9.99, store : 'Lucky Thai'},
    C4 : { name : 'Thai Combo', price : 9.99, store : 'Lucky Thai'},

    D1 : { name : 'Amazing Burger', price : 6.49, store : 'RideCell Burger'},
    D2 : { name : 'Best Burger', price : 5.99, store : 'RideCell Burger'},
    D3 : { name : 'Awesome Burger', price : 6.99, store : 'RideCell Burger'},
    D4 : { name : 'Kings Burger', price : 7.99, store : 'RideCell Burger'}

  }

  $scope.items = {};
  $scope.tempStorage = {};
  $scope.total = 0;

  $scope.toggleMenu = function(storename){
    $scope[storename] = !$scope[storename];
  }
  
  $scope.addToOrder = function(itemID){
    var itemName = $scope.itemStorage[itemID]['name'];
    var itemPrice= $scope.itemStorage[itemID]['price'];
    if ($scope.tempStorage[itemName]){
      $scope.items[itemName + ++$scope.tempStorage[itemName]] = itemPrice;
    } else {
      $scope.items[itemName] = itemPrice;
      $scope.tempStorage[itemName] = 1;
    }

    $scope.total += itemPrice;
    $scope.total = Math.round($scope.total * 100) / 100;
  }

  $scope.getTime = function(){
    function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
    }

    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());

    return h + ":" + m;
  }

  $scope.checkTime= function(timeString){
    if (timeString.length !== 5){ 
      return false
    }
    var timeArray = timeString.split(':');
    if (timeArray.length !== 2 || timeArray[0].length !== timeArray[1].length){
      return false;
    }

    var currentTime = $scope.getTime();
    var currentTimeArray = currentTime.split(':');
    if (Number(currentTimeArray[0]) > Number(timeArray[0])){
      return false;
    } else if ( Number(currentTimeArray[0]) === Number(timeArray[0]) && Number(currentTimeArray[1]) > Number(timeArray[1]) ){
      return false;
    } else if ( Number(timeArray[0]) > 24 || Number(timeArray[1]) > 60){
      return false;
    }

    return true;
  }

  $scope.placeOrder = function(){
    var order = {};
    order.orderPlaceTime = $scope.getTime();

    order.pickUpTime = document.getElementById('pickUpTimeInput').value;
    if (!$scope.checkTime(order.pickUpTime)){
      alert('Please Enter Pick Up Time That no Earlier than Current Time in Corrent Format  ' + order.orderPlaceTime)
      return;
    }

    order.name = document.getElementById('nameInput').value;
    if (order.name === ''){
      alert('Please Enter Your Full Name')
      return;
    }

    order.items = $scope.items;
    order.total = $scope.total;
    if (order.total == 0){
      alert("You haven't selected any items yet");
      return;
    }
    
    var r = confirm("Please comfirm your order, click OK to place your order or cancel")
    if (r == true) {
      var orderID = order.name + order.orderPlaceTime;
      $scope.orders[orderID] = order;
      $scope.orders.ready = 'This order is not ready yet';
      ref.set($scope.orders);
      alert('Your Order Have Been Placed!')
    } else {

    }
  }

  $scope.removeItem = function(itemName, itemPrice){
    $scope.total -= itemPrice;
    $scope.total = Math.round($scope.total * 100) / 100;
    delete $scope.items[itemName];
  }

})


