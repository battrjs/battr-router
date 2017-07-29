var gulp = require('gulp');
require('@battr/battr-build/lib/default-config').names = {
  file: 'battr-core-components',
  module: 'battrCoreComponents',
  styles: 'battr-core-components'
};
var paths = require('@battr/battr-build/lib/default-config').paths;
// paths.styles.all = [
//   paths.src+'**/*.scss',
//   'node_modules/@battr/battr-core/src/**/*.scss'
// ];
require('@battr/battr-build');
gulp.task('default', ['start-debug']);
