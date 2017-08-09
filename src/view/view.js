import { component, events } from '@battr/battr-core';

component.define({
  selector: 'view [view]',
  priority: 100,
  model: false,
  controller: controller
});

function controller(element) {
}
