'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('babel-webpack-library:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.eslintrc'
    ]);
  });
});
