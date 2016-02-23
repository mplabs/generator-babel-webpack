'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _lodash = require('lodash.camelcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.kebabcase');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.trim');

var _lodash6 = _interopRequireDefault(_lodash5);

var _child_process = require('child_process');

var _gitConfig = require('git-config');

var _gitConfig2 = _interopRequireDefault(_gitConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_Base) {
  (0, _inherits3.default)(GeneratorBabelWebpack, _Base);

  function GeneratorBabelWebpack() {
    (0, _classCallCheck3.default)(this, GeneratorBabelWebpack);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call.apply(_Base, [this].concat(args)));

    _this.pkg = require('../package.json');
    return _this;
  }

  GeneratorBabelWebpack.prototype.exec = function exec(cmd) {
    return new _promise2.default(function (resolve, reject) {
      (0, _child_process.exec)(cmd, function (error, stdout, stderr) {
        if (error) {
          return reject(error);
        }
        if (stderr) {
          return reject(stderr);
        }
        return resolve(stdout);
      });
    });
  };

  GeneratorBabelWebpack.prototype.prompting = function prompting() {
    var _this2 = this;

    var done = this.async();
    this.log((0, _yosay2.default)('Welcome to the ' + _chalk2.default.red('Babel Webpack Library') + ' generator!'));
    this.exec('npm whoami').then(function (username) {
      _this2.username = (0, _lodash6.default)(username || '');
      _this2._showPrompts(done);
    }).catch(function (error) {
      return console.error('Error getting npm user name: run `npm login`\n', error);
    });
  };

  GeneratorBabelWebpack.prototype._showPrompts = function _showPrompts(done) {
    var _this3 = this;

    var config = _gitConfig2.default.sync();
    config.user = config.user || {};
    var prompts = [{
      type: 'input',
      name: 'user',
      message: 'What is the Github username/organization for this project?',
      default: this.username,
      store: true
    }, {
      type: 'input',
      name: 'repo',
      message: 'What is the repository/project name?',
      default: (0, _lodash4.default)(this.appname)
    }, {
      type: 'input',
      name: 'description',
      message: 'What is a short description for this project?'
    }, {
      type: 'input',
      name: 'author',
      message: 'Who is the author of this project?',
      default: config.user.name + ' <' + config.user.email + '>',
      store: true
    }, {
      type: 'input',
      name: 'variable',
      message: 'What is the name of this project\'s main variable?',
      default: (0, _lodash2.default)(this.appname)
    }];

    this.prompt(prompts, function (props) {
      _this3.user = props.user;
      _this3.repo = props.repo;
      _this3.description = props.description;
      _this3.author = props.author;
      _this3.variable = props.variable;
      _this3.year = new Date().getFullYear();
      done();
    });
  };

  GeneratorBabelWebpack.prototype.writing = function writing() {
    this.template('babelrc', '.babelrc');
    this.template('bowerrc', '.bowerrc');
    this.template('eslintrc', '.eslintrc');
    this.template('eslintignore', '.eslintignore');
    this.template('editorconfig', '.editorconfig');
    this.template('gitignore', '.gitignore');
    this.template('travis.yml', '.travis.yml');
    this.template('istanbul.yml', '.istanbul.yml');
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('_karma.conf.js', 'karma.conf.js');
    this.template('_LICENSE', 'LICENSE');
    this.template('_README.md', 'README.md');
    this.template('_CHANGELOG.md', 'CHANGELOG.md');
    _mkdirp2.default.sync('src');
    this.template('src', 'src');
    _mkdirp2.default.sync('test');
    this.template('test/*.js', 'test');
    this.template('test/eslintrc', 'test/.eslintrc');
    this.template('test/_mocha.opts', 'test/mocha.opts');
    _mkdirp2.default.sync('webpack');
    this.template('webpack/_webpack.config.base.js', 'webpack/webpack.config.base.js');
    this.template('webpack/_webpack.config.development.js', 'webpack/webpack.config.development.js');
    this.template('webpack/_webpack.config.production.js', 'webpack/webpack.config.production.js');
  };

  GeneratorBabelWebpack.prototype.install = function install() {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  };

  return GeneratorBabelWebpack;
}(_yeomanGenerator.Base);
//# sourceMappingURL=index.js.map