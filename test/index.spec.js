import path from 'path';
import os from 'os';
import { assert, test as helpers } from 'yeoman-generator';

describe('generator-babel-webpack', function () {

  before(function (done) {
    this.timeout(20000);
    helpers.run(
      path.join(__dirname, '../generators/index.js'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

  it('should creates files', () => {
    assert.file([ 'package.json', '.eslintrc' ]);
  });

});
