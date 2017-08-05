angular
  .module('myApp', [
    'ui.router'
  ])

  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
      .state('home', {
        url: '/',
        views: {
            "main": {
                //controller: 'MainCtrl',
                templateUrl: 'home/home.html'
            }
        }
      })
      .state('about', {
        url: '/about',
        views: {
            "main": {
                //controller: 'AboutCtrl',
                templateUrl: '/about/about.html'
            }
        }
      })
      .state('friend', {
        url: '/friend',
        views: {
            "main": {
                controller: 'FriendCtrl',
                templateUrl: '/friend/friend.html'
            }
        }
      });
  }])