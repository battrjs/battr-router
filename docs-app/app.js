document.addEventListener("DOMContentLoaded", function(event) {
  battrCoreComponents.init();
});

battrCoreComponents.controller('AppController', function (model, router) {
  // router.start();

  router
    .add('/', {
      template: '<span>root ${name}</span>',
      locals: {},
      controller: function (model) {
        model.name = 'mode name';
      }
    })
    .add('/item', function (params) {
      return {
        template: '<span>item</span>'
      };
    })
    .add('/item/:id', function (params) {
      return {
        template: '<span>item with id</span>'
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
