angular.module('firebase.config', [])
  .constant('FBURL', 'https://supportnet.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','google'])

  .constant('loginRedirectPath', '/login');
