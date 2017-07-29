import { addInjectable } from '@battr/battr-core';
import * as router from './router';

addInjectable('router', router);

export * from './view';
export { router };
