document.addEventListener("DOMContentLoaded", function(event) {
  battrCoreComponents.init();
});

battrCoreComponents.controller('AppController', function (model, router) {
  // router.start();

  router
    .add('/', {
      template: '<span>one</span>',
      locals: {},
      controller: function () {
        console.log('root controller')
      }
    })
    .add('/item/:id', function (params) {
      console.log(':id', params.id)
      return {
        template: '<span>one</span>'
      };
    })
    .notFound(function () {
      router.navigate('/');
    })
    .resolve();

  // router.navigate('/');
  // router.reload();
  // router.pause();
  // router.resume();
  // router.off('/')
});
