angular.module('order.directives', [])

  .directive('orderHome', function(){
    return{
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: '/client/views/home.html'
    }
  })
  .directive('orderStores', function(){
    return{
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: '/client/views/stores.html'
    }
  })

  .directive('orderOrders', function(){
    return{
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: '/client/views/orders.html'
    }
  })
  .directive('orderPlace', function(){
    return{
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: '/client/views/place.html'
    }
  })
  