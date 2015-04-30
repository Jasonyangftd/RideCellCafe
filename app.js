angular.module('order', [
  'ui.router',
  'order.directives',
  'order.orders',
  'order.place',
  'order.stores',
  'order.home'
  ])

// Configure roots for app
.config(function($stateProvider){
  $stateProvider
    .state('place', {
      url:'/place',
      template: '<order-place></order-place>',
      controller: 'PlaceController'
    })
    .state('orders', {
      url:'/orders',
      template: '<order-orders></order-orders>',
      controller: 'OrdersController'
    })
    .state('stores', {
      url:'/stores',
      template: '<order-stores></orders-stores>',
      controller: 'StoresController'
    })
    .state('home', {
      url:'',
      template: '<order-home></order-home>',
      controller: 'HomeController'
    })
})