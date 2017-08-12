import { component, events, findController, bindController, unbindController } from '@battr/battr-core';

component.define({
  selector: 'view',
  priority: 100,
  model: false,
  postBind: postBind
});

function postBind(element) {
  events
    .on('$routeChangeHandler', route => {
      unbindController(element);
      if (route.template) replaceHMTL(route.template);
      if (route.controller) bindController(element, route.controller, (route.locals || {}))();
    })
    .handlePrevious();

  function replaceHMTL(template) {
    element.empty();
    element.appendChild(document.createFromMarkup(template));
  }
}
