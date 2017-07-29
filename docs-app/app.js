document.addEventListener("DOMContentLoaded", function(event) {
  battrCoreComponents.init();
});

battrCoreComponents.controller('AppController', function (model, router) {
  router.useHash();
  router.start();

  router
    .root('/')
    .on('/', {
      template: '<span>one</span>',
      locals: {},
      controller: function () {

      }
    })
    .on('/:id', function (params) {
      return {
        template: '<span>one</span>'
      };
    })
    .notFound(function () {
      return {
        template: '<span>not found</span>'
      };
    });

  // router.navigate('/');
  // router.reload();
  // router.pause();
  // router.resume();
  // router.off('/')
});
